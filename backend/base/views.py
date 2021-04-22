from django.http import JsonResponse
from .products import products
from rest_framework.decorators import api_view
from rest_framework.response import Response


# Create your views here.

@api_view(['GET'])
def GetRoute(request):
    return Response('Hello')


@api_view(['GET'])
def GetProducts(request):
    return Response(products)


@api_view(['GET'])
def GetProduct(request, pk):
    product = None
    for i in products:
        if i['_id'] == pk:
            product = i
            break
    return Response(product)
