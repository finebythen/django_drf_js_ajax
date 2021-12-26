from types import ModuleType
from django.db.models.base import Model
from rest_framework.serializers import ModelSerializer, RelatedField, CharField, SerializerMethodField
from .models import Car, Manufacturer


class ManufacturerSerializerGET(ModelSerializer):
    class Meta:
        model = Manufacturer
        exclude = [
            'created_user',
            'created_date',
            'updated_user',
            'updated_date',
        ]


class ManufacturerSerializerPOST(ModelSerializer):
    class Meta:
        model = Manufacturer
        exclude = [
            'id',
            'created_user',
            'created_date',
            'updated_user',
            'updated_date',
        ]


class CarSerializerGET(ModelSerializer):
    manufacturer__name = SerializerMethodField(help_text='Name of the Car Manufacturer')

    class Meta:
        model = Car
        fields = [
            'id',
            'name',
            'manufacturer',
            'manufacturer__name',
        ]

    def get_manufacturer__name(self, instance: Car):
        return instance.manufacturer.name


class CarSerializerPOST(ModelSerializer):
    class Meta:
        model = Car
        exclude = [
            'id',
            'created_user',
            'created_date',
            'updated_user',
            'updated_date',
        ]
