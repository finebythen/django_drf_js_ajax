from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .functions import get_username
from .models import Car, Manufacturer
from .serializers import *


@api_view(['GET'])
def api_endpoints(request):
    endpoints = {
        'all endpoints': 'api/endpoints/',
        'get manufacturer list': 'api/list/manufacturer/',
        'get car list': 'api/list/car/',
        'get manufacturer detail': 'api/detail/manufacturer/<int:pk>/',
        'get car detail': 'api/detail/car/<int:pk>/',
        'create manufacturer': 'api/create/manufacturer/',
        'create car': 'api/create/car/',
        'delete manufacturer': 'api/delete/manufacturer/<int:pk>/',
        'delete car': 'api/delete/car/<int:pk>/',
        'update manufacturer': 'api/update/manufacturer/<int:pk>/',
    }
    return Response(endpoints)


@api_view(['GET'])
def api_list_manufacturer(request):
    qs = Manufacturer.objects.all()
    serializer = ManufacturerSerializerGET(qs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def api_list_car(request):
    qs = Car.objects.all()
    serializer = CarSerializerGET(qs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def api_detail_manufacturer(request, pk):
    qs = Manufacturer.objects.get(id=pk)
    serializer = ManufacturerSerializerGET(qs, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def api_detail_car(request, pk):
    qs = Car.objects.get(id=pk)
    serializer = CarSerializerGET(qs, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def api_create_manufacturer(request):
    user_name = get_username(request)
    serializer = ManufacturerSerializerPOST(data=request.data)
    if serializer.is_valid():
        serializer.save(created_user=user_name)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def api_create_car(request):
    user_name = get_username(request)
    serializer = CarSerializerPOST(data=request.data)
    if serializer.is_valid():
        serializer.save(created_user=user_name)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def api_update_manufacturer(request, pk):
    user_name = get_username(request)
    qs = Manufacturer.objects.get(id=pk)
    serializer = ManufacturerSerializerPOST(qs, data=request.data)
    if serializer.is_valid():
        serializer.save(updated_user=user_name)
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def api_update_car(request, pk):
    user_name = get_username(request)
    qs = Car.objects.get(id=pk)
    serializer = CarSerializerPOST(qs, data=request.data)
    if serializer.is_valid():
        serializer.save(updated_user=user_name)
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def api_delete_manufacturer(request, pk):
    qs = Manufacturer.objects.get(id=pk)
    qs.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['DELETE'])
def api_delete_car(request, pk):
    qs = Car.objects.get(id=pk)
    qs.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
