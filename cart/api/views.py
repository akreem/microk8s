from django.http import HttpResponse
import requests
from django.contrib.auth.models import User
from .models import CartItems, Cart
from .serializers import CartItemSerializer, CartSerializer

from django_redis import get_redis_connection
from rest_framework import generics, status, views
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view,permission_classes
from rest_framework.views import APIView

import requests
from django.conf import settings

def test(request):
    return HttpResponse('fine')

class CartView(APIView):

    def get_cart_key(self, user_id):
        return f"cart_{user_id}"

    def post(self, request, product_id,user_id):
        cart_key = self.get_cart_key(user_id)
        redis_conn = get_redis_connection("default")

        # Get the quantity from the request data
        quantity = request.data.get('quantity', 1)

        try:
            quantity = int(quantity)
            if quantity < 1:
                return Response({'error': 'Quantity must be a positive integer'}, status=status.HTTP_400_BAD_REQUEST)
        except ValueError:
            return Response({'error': 'Invalid quantity value'}, status=status.HTTP_400_BAD_REQUEST)


        # Increment the quantity of the product in the user's cart
        redis_conn.hincrby(cart_key, product_id, quantity)

        return Response(status=status.HTTP_201_CREATED)
    
    def get(self, request,user_id):
        cart_key = self.get_cart_key(user_id)
        redis_conn = get_redis_connection("default")
        cart_items = redis_conn.hgetall(cart_key)
        cart = {int(k.decode('utf-8')): int(v.decode('utf-8')) for k, v in cart_items.items()}

        detailed_cart = []
        for product_id, quantity in cart.items():
            product_response = requests.get(f"{settings.PRODUCT_SERVICE_URL}{product_id}/")
            if product_response.status_code == 200:
                product_data = product_response.json()
                product_data['quantity'] = quantity
                detailed_cart.append(product_data)
            else:
                detailed_cart.append({'product_id': product_id, 'quantity': quantity, 'error': 'Product details not found'})

        return Response(detailed_cart)

    def delete(self, request, product_id=None, user_id=None):
        cart_key = self.get_cart_key(user_id)
        redis_conn = get_redis_connection("default")
        
        if product_id:
            # Remove the specific product from the user's cart
            redis_conn.hdel(cart_key, product_id)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            # Clear the entire cart for the user
            redis_conn.delete(cart_key)
            return Response(status=status.HTTP_204_NO_CONTENT)

