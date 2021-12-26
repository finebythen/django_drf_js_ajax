from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.
class Manufacturer(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False, unique=True)
    founding_year = models.IntegerField(default=1900, validators=[MinValueValidator(1900), MaxValueValidator(2021)])
    created_user = models.CharField(max_length=100, null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_user = models.CharField(max_length=100, null=True, blank=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self) -> str:
        return self.name


class Car(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False)
    manufacturer = models.ForeignKey(Manufacturer, null=False, blank=False, on_delete=models.CASCADE)
    created_user = models.CharField(max_length=100, null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_user = models.CharField(max_length=100, null=True, blank=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['manufacturer', 'name']
        constraints = [
            models.UniqueConstraint(fields=['manufacturer', 'name'], name='unique_model_type')
        ]

    def __str__(self) -> str:
        return f'{self.name} (Hersteller: {self.manufacturer})'
