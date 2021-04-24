from django.http import JsonResponse
from .products import products
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product
from .serializers import ProductSerializer


# Create your views here.

@api_view(['GET'])
def GetRoute(request):
    return Response('Hello')


@api_view(['GET'])
def GetProducts(request):
    items = Product.objects.all()
    serializer = ProductSerializer(items, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def GetProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)
