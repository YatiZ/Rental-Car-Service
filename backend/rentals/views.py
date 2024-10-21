from .serializers import CarListSerializer
from .models import Car
from rest_framework import generics
from django.http import JsonResponse

class CarListView(generics.ListAPIView):
    queryset = Car.objects.all()
    serializer_class = CarListSerializer



