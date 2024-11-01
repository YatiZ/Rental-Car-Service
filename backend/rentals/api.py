from . models import Car, Contact, UserAccount, Renter
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .serializers import CarListSerializer,ContactSerializer, RenterSerializer
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
    
# @api_view(['PUT','PATCH'])
# def update_renter_info(request,id):
#     try:
#         account_name = UserAccount.objects.get(id=id)
#         renter_info = Renter.objects.get(account_name=account_name)

#         # Update the fields if they are provided in the request
#         renter_name = request.data.get('renter_name',renter_info.renter_name)
#         phonenumber = request.data.get('phonenumber',renter_info.phonenumber)
#         address = request.data.get('address',renter_info.address)
#         driver_license_number = request.data.get('driver_license_number',renter_info.driver_license_number)
#         license_expiration_date = request.data.get('license_expiration_date',renter_info.license_expiration_date)
#         license_photo = request.data.get('license_photo',renter_info.license_photo)

#         # Update the Renter object fields
#         renter_info.renter_name = renter_name
#         renter_info.phonenumber = phonenumber
#         renter_info.address = address
#         renter_info.driver_license_number = driver_license_number
#         renter_info.license_expiration_date = license_expiration_date
#         renter_info.license_photo = license_photo

#         renter_info.save()

#         return Response({'success':True, 'messsage':'Renter Info was successfully updated!'}, status=status.HTTP_200_OK)
#     except UserAccount.DoesNotExist:
#         return Response({'success':False,'error':'User account doesnt exist'}, status=status.HTTP_404_NOT_FOUND)
    
#     except Renter.DoesNotExist:
#         return Response({'success':False, 'error':'Renter doesnt exist'},status = status.HTTP_404_NOT_FOUND)
#     except Exception as e:
#         print(e)
#         return Response({'success': False,'error':'An error occurred!'}) 

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