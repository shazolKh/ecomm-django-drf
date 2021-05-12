from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
import os
from rest_framework.permissions import IsAdminUser

from base.models import Product
from base.serializers import ProductSerializer


def Delete_image(a):
    image_path = a.image.path
    if image_path:
        if os.path.exists(image_path):
            os.remove(image_path)


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


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def DeleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    if product.image != '/placeholder.png':
        Delete_image(product)
    return Response('Product Deleted')


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand='simple Brand',
        countInStock=0,
        category='sample category',
        description=''
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def UpdateProduct(request, pk):
    data = request.data

    product = Product.objects.get(_id=pk)
    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    product.save()
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def UploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)
    Delete_image(product)
    product.image = request.FILES.get('image')
    product.save()

    return Response(product.image.url)
