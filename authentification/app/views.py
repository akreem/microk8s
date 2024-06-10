from django.shortcuts import redirect, render
from rest_framework import generics ,status , permissions , serializers
from django.contrib.auth.models import User
from .serializers import UserSerializer, SingUpSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
import uuid
from django.contrib.auth.hashers import make_password
from django.contrib.sessions.models import Session
import jwt
from django.conf import settings
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.views import APIView
from django.core.cache import cache
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from django.shortcuts import redirect




@api_view(['POST'])
def register(request):
    data = request.data
    user = SingUpSerializer(data = data)

    if user.is_valid():
        if not User.objects.filter(username=data['username']).exists():
            user = User.objects.create(
                first_name = data['first_name'],
                last_name = data['last_name'], 
                username = data['username'] , 
                password = make_password(data['password']),
            )
            return Response(
                {'details':'Your account registered susccessfully!' },
                    status=status.HTTP_201_CREATED
                    )
        else:
            return Response(
                {'eroor':'This email already exists!' },
                    status=status.HTTP_400_BAD_REQUEST
                    )
    else:
        return Response(user.errors)


def generate_access_token(user):
    payload = {
        'user_id': user.id,
        'username': user.username,
        # Ajoutez d'autres données pertinentes à votre access token si nécessaire
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')






class DetailUser(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        # Vérifier la présence et la validité du token d'accès dans la session
        access_token = request.session.get('access_token')
        if access_token:
            try:
                # Vérifier la validité du token
                payload = jwt.decode(access_token, settings.SECRET_KEY, algorithms=['HS256'])
                # Si le token est valide, autoriser l'accès au service des produits
                return super().get(request, *args, **kwargs)
            except jwt.exceptions.InvalidTokenError:
                # Si le token est invalide, renvoyer une erreur d'authentification
                return Response({'error': 'Invalid access token'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            # Si le token n'est pas présent, renvoyer une erreur d'authentification
            return Response({'error': 'No access token found'}, status=status.HTTP_401_UNAUTHORIZED)

def getusers(request):
    users = User.objects.all()
    return HttpResponse(users)


def getuser(request,pk):
    user = User.objects.get(pk=pk)
    return JsonResponse({'username':user.username})


class LoginView(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        refresh = RefreshToken.for_user(user)
        
        # Handle cart migration
        session_id = self.request.session.session_key
        if session_id:
            # Call the cart service to migrate the cart
            headers = {
                'Authorization': f'Bearer {str(refresh.access_token)}',
                'Content-Type': 'application/json'
            }
            cart_migration_url = 'http://20.199.21.250:8002/api/cart/migrate/'
            try:
                requests.post(cart_migration_url, headers=headers, json={'session_id': session_id})
            except requests.exceptions.RequestException as e:
                print(f"Error migrating cart: {e}")

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })


class LogoutView(APIView):
    def post(self, request):
        try:
            access_token = request.data["access"]
            token = AccessToken(access_token)
            cache.set(f"blacklisted_{access_token}", "true", timeout=settings.TOKEN_BLACKLIST_CACHE_TIMEOUT)
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class TokenBlacklistCheck(APIView):
    def post(self, request):
        token = request.data.get("token")
        is_blacklisted = cache.get(f"blacklisted_{token}")
        if is_blacklisted:
            return Response({"detail": "Token is blacklisted"}, status=status.HTTP_200_OK)
        return Response({"detail": "Token is valid"}, status=status.HTTP_200_OK)