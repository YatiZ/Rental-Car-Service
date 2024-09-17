from django.urls import path
from .import api

urlpatterns = [
    path('homes',api.homes_list, name='api_homes_list')
]
