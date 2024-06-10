from django.shortcuts import render
from django.conf import settings
# Create your views here.

def main(request):
    context = {
        'auth_service': settings.AUTHENTICATION_MICROSERVICE_URL,
        'products_service': settings.PRODUCTS_MICROSERVICE_URL,
        'cart_service': settings.CART_MICROSERVICE_URL
    } 

    return render(request, 'index.html', context)

def item(request,slug):
    context = {
        'auth_service': settings.AUTHENTICATION_MICROSERVICE_URL,
        'products_service': settings.PRODUCTS_MICROSERVICE_URL,
        'cart_service': settings.CART_MICROSERVICE_URL,
        'slug': slug
    }

    return render(request, 'product.html', context)

def cart(request):
    context = {
        'auth_service': settings.AUTHENTICATION_MICROSERVICE_URL,
        'products_service': settings.PRODUCTS_MICROSERVICE_URL,
        'cart_service': settings.CART_MICROSERVICE_URL,
        'orders_service': settings.CHEKOUT_MICROSERVICE_URL
    }
    return render(request, 'cart.html', context)

def orders(request):
    context = {
        'auth_service': settings.AUTHENTICATION_MICROSERVICE_URL,
        'products_service': settings.PRODUCTS_MICROSERVICE_URL,
        'cart_service': settings.CART_MICROSERVICE_URL,
        'orders_service': settings.CHEKOUT_MICROSERVICE_URL
    }
    return render(request, 'orders.html', context)

