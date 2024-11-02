from . models import Car, Contact, UserAccount, Renter, Reservation
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .serializers import CarListSerializer,ContactSerializer, RenterSerializer
from django.db import IntegrityError
from django.utils import timezone


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

@api_view(['POST'])
# @authentication_classes([])
# @permission_classes([])
def renter_info(request,id):
    try:
        account_name = UserAccount.objects.get(id=id)

        if Renter.objects.filter(account_name = account_name).exists():
            return Response({'success':False,'message':'Renter Info already exists for this account.','renter_exists':'renter_exists'},status=400)
        
        renter_name = request.data.get('renter_name')
        phonenumber = request.data.get('phonenumber')
        address = request.data.get('address')
        driver_license_number = request.data.get('driver_license_number')
        license_expiration_date = request.data.get('license_expiration_date')
        license_photo = request.data.get('license_photo')

        Renter.objects.create(
            account_name= account_name,
            renter_name = renter_name,
            phonenumber = phonenumber,
            address = address,
            driver_license_number = driver_license_number,
            license_expiration_date = license_expiration_date,
            license_photo = license_photo
        )

        return Response({'success': True,'message':'Your Info was submitted successfully!'})
    except Exception as e:
        print(e)
        return Response({'success': False, 'error': 'An unexpected error occurred.'})
    
@api_view(['GET'])
def renter_info_display(request,id):
    renter = Renter.objects.get(id=id)
    serializer = RenterSerializer(renter)
    return JsonResponse(serializer.data)

@api_view(['GET'])
def renter_info_check(request, id):
    try:
        account_name = UserAccount.objects.get(id=id)
        renter_exists = Renter.objects.filter(account_name = account_name).exists()

        return Response({'success': True, 'renter_exists': renter_exists})
    
    except UserAccount.DoesNotExist:
        return Response({
            'success': False,
            'error': 'User account does not exist.'
        }, status=404)
    except Exception as e:
        return Response({
            'success': False,
            'error': 'An unexpected error occurred.'
        }, status=500)
    

@api_view(['GET','PATCH'])
# @permission_classes([IsAuthenticated])
def update_renter_info(request,id):
    try:
        account_name = UserAccount.objects.get(id=id)
        renter = Renter.objects.filter(account_name=account_name).first()

        # Check if the renter data exists
        if not renter:
            return Response({'error': 'Renter info not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        if request.method == 'GET':
            serializer = RenterSerializer(renter)
            return Response(serializer.data)
        
        elif request.method == 'PATCH':
            # Combine request.data and request.FILES for the serializer
            data = request.data.copy()
            if 'license_photo' in request.FILES:
                data['license_photo'] = request.FILES['license_photo']

            serializer = RenterSerializer(renter, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'success': True, 'message': 'Renter info updated successfully!'}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except UserAccount.DoesNotExist:
        return Response({'error': 'User account not found.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(f"Error updating renter info: {e}")
        return Response({'error': 'An unexpected error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['POST'])
def reservation(request, id):
    try:

        # renter = UserAccount.objects.get(id = renter_id)
        car_info = Car.objects.get(id=id)
        car_info.status = 'Renting'
        car_info.save()
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')

        #converting date into obj
        start_date_dt = timezone.datetime.fromisoformat(start_date)
        end_date_dt = timezone.datetime.fromisoformat(end_date)

        #check existing booking info
        existing_reservation = Reservation.objects.filter(
            car = car_info,
            start_date = start_date_dt,
            end_date = end_date_dt
        ).exists()

        if existing_reservation:
            return Response({'success':False,'message':'This car is unavailable for the selected dates'}, status= status.HTTP_400_BAD_REQUEST)


        total_date = request.data.get('total_date')
        total_price = request.data.get('total_price')
        pickup_location = request.data.get('pickup_location')
        dropoff_location = request.data.get('dropoff_location')
        
        # if request.user.is_authenticated:
        #     renter = request.user
        # else:
        #     email = request.data.get('email')
        #     renter, created = UserAccount.objects.get_or_create(email=email)

        renter_id = request.data.get('renter_id')
        renter = UserAccount.objects.get(id = renter_id)

        Reservation.objects.create(
            renter = renter,
            car = car_info,
            start_date = start_date,
            end_date = end_date,
            total_date = total_date,
            total_price = total_price,
            pickup_location = pickup_location,
            dropoff_location = dropoff_location
        )
        return Response({'success':True,'message':'Booking set up successfully!'},status=status.HTTP_201_CREATED)
    except UserAccount.DoesNotExist:
        return Response({'success': False, 'message':'User account does not exist'},status= status.HTTP_404_NOT_FOUND)
    except Car.DoesNotExist:
        return Response({'success':False,'message':'Car does not exist!'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(e)
    return Response({'success':False,'message':'An error occurred!'})