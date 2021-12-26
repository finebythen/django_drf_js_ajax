from django.urls import path
from . import api, views


urlpatterns = [
    path('', views.main, name='main'),

    # api
    path('api/endpoints/', api.api_endpoints, name='api-endpoints'),
    path('api/list/manufacturer/', api.api_list_manufacturer, name='api-list-manufacturer'),
    path('api/list/car/', api.api_list_car, name='api-list-car'),
    path('api/detail/manufacturer/<int:pk>/', api.api_detail_manufacturer, name='api-detail-manufacturer'),
    path('api/detail/car/<int:pk>/', api.api_detail_car, name='api-detail-car'),
    path('api/create/manufacturer/', api.api_create_manufacturer, name='api-create-manufacturer'),
    path('api/create/car/', api.api_create_car, name='api-create-car'),
    path('api/update/manufacturer/<int:pk>/', api.api_update_manufacturer, name='api-update-manufacturer'),
    path('api/update/car/<int:pk>/', api.api_update_car, name='api-update-car'),
    path('api/delete/manufacturer/<int:pk>/', api.api_delete_manufacturer, name='api-delete-manufacturer'),
    path('api/delete/car/<int:pk>/', api.api_delete_car, name='api-delete-car'),
]
