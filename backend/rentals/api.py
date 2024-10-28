from . models import Car, Contact
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import CarListSerializer,ContactSerializer
from django.db import IntegrityError


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
def contact_form(request):
    try:
        username = request.data.get('username')
        email = request.data.get('email')
        message = request.data.get('message')

        contact_form = Contact.objects.create(username=username, email=email, message=message)
        return Response({'success': True,'message':'Contact form submitted successfully!'})
    except IntegrityError as e:

        return Response({'error':'data integrity issue: possibly duplicate entry or constraint violation'})
    
    except Exception as e:
        # General exception handler for other errors
        print(e)
        return Response({'success': False, 'error': 'An unexpected error occurred.'})

# @api_view(['POST'])