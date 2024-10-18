from . models import Car
from django.http import JsonResponse
from rest_framework.decorators import api_view
from .serializers import CarListSerializer


@api_view(['GET'])
def car_list(request):
    cars = Car.objects.all()
    serializer = CarListSerializer(cars, many=True)

    return JsonResponse({'data':serializer.data})

@api_view(['GET'])
def car_detail(request, id):
    car = Car.objects.get(id=id)
    serializer = CarListSerializer(car)
    return JsonResponse(serializer.data)
