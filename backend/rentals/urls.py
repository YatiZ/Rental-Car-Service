from django.urls import path
from .import api
from . views import CarListView

urlpatterns = [
    path('api/cars', api.car_list, name='api_car_list'),
    path('api/carList',CarListView.as_view(), name='car-list'),
    path('api/cars/<uuid:id>/',api.car_detail, name='api_car-detail'),
]
