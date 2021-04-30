from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from base.models import Product
from base.serializers import ProductSerializer


@api_view(['GET'])
def GetProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def GetProducts(request):
    items = Product.objects.all()
    serializer = ProductSerializer(items, many=True)

    return Response(serializer.data)
