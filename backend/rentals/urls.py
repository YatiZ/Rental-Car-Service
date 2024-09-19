from django.urls import path
from .import api
from . import views

urlpatterns = [
    path('api/homes',api.homes_list, name='api_homes_list'),
    path('api/homes/<uuid:id>/',views.home_detail, name='home_detail'),
]
