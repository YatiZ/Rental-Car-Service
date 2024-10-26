from . models import Car, Contact
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

@api_view(['POST'])
def contact_form(request, id):
    try:
        username = request.POST.get('username')
        email = request.POST.get('email')
        message = request.POST.get('message')

        contact_form = Contact.objects.create(username, email, message)
        return JsonResponse(contact_form)
    except Exception as e:
        print(e)

        return JsonResponse({'success':False})
