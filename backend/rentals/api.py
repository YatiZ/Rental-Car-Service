from datetime import datetime
from . models import Car, Contact, UserAccount, Renter, Reservation, Review, Favorite
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .serializers import CarListSerializer,ContactSerializer, RenterSerializer, ReservationSerializer, ReviewSerializer, UserAccountSerializer, HistorySerializer
from django.db import IntegrityError
from django.utils import timezone
from django.shortcuts import get_object_or_404

@api_view(['GET'])
def get_user(request):
    user = UserAccount.objects.all()
    serializer = UserAccountSerializer(user, many=True)
    return Response({'user':serializer.data})

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
    account_name = UserAccount.objects.get(id=id)
    renter = Renter.objects.filter(account_name = account_name).first()

    serializer = RenterSerializer(renter)
    return Response(serializer.data)

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
@authentication_classes([])
@permission_classes([])
def reservation(request, id):
    try:
        car_info = Car.objects.get(id=id)
        car_info.status = 'Renting'
        car_info.save()
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')

       # Convert to datetime objects and make timezone-aware
        start_date_dt = timezone.make_aware(timezone.datetime.fromisoformat(start_date))
        end_date_dt = timezone.make_aware(timezone.datetime.fromisoformat(end_date))

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
        
        
        renter_id = request.data.get('renter_id')
        renter = UserAccount.objects.get(id = renter_id)

        if total_price is None:
            return Response({'success': False, 'message': 'Total price cannot be null!'}, status=status.HTTP_400_BAD_REQUEST)
        if pickup_location is None:
            return Response({'success':False, 'message':'Please, Pick Up Location must be filled!'},status=status.HTTP_400_BAD_REQUEST)
        if dropoff_location is None:
            return Response({'success':False, 'message':'Please, Drop Off Location must be filled!'},status=status.HTTP_400_BAD_REQUEST)

        # Convert total_price to float if necessary, or check its value
        try:
            total_price = float(total_price)
        except ValueError:
            return Response({'success': False, 'message': 'Invalid total price'}, status=status.HTTP_400_BAD_REQUEST)
        result = Reservation.objects.create(
            renter = renter,
            car = car_info,
            start_date = start_date,
            end_date = end_date,
            total_date = total_date,
            total_price = total_price,
            pickup_location = pickup_location,
            dropoff_location = dropoff_location
        )
        print("result:",result)
        return Response({'success':True,'message':'Booking set up successfully!'},status=status.HTTP_201_CREATED)
    except UserAccount.DoesNotExist:
        return Response({'success': False, 'message':'User account does not exist'},status= status.HTTP_404_NOT_FOUND)
    except Car.DoesNotExist:
        return Response({'success':False,'message':'Car does not exist!'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(e)
        return Response({'success':False,'message':'An error occurred!'})

@api_view(['GET'])
def get_reservation(request, id):
    try:
        car_info = Car.objects.get(id=id)
        reservations = car_info.car.all() #car from reservation model's car attribute's related_name 
        print(reservations)
        reservation_data= [{
            'renter':reservation.renter.id,
            'start_date':reservation.start_date,
            'end_date': reservation.end_date,
            'total_date' : reservation.total_date,
            'total_price': reservation.total_price,
            'pickup_location': reservation.pickup_location,
            'dropoff_location': reservation.dropoff_location

        } for reservation in reservations]
        return Response({'success':True, 'reservation_data': reservation_data})

    except UserAccount.DoesNotExist:
        return Response({'success': False, 'message':'User account does not exist'},status= status.HTTP_404_NOT_FOUND)
    except Car.DoesNotExist:
        return Response({'success':False,'message':'Car does not exist!'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(e)
    return Response({'success':False,'message':'An error occurred!'})


@api_view(['GET'])
def get_rented_history_by_user(request, user_id):
    history = Reservation.objects.filter(renter = user_id)
    if not history:
        return Response({
            'success':False,
            'message':"No rented history"
        })
    
    serialized_history = HistorySerializer(history, many= True)
    return Response({'success':True, 'message':'Here is your history','history': serialized_history.data})

# review sessions
@api_view(['POST'])
def create_review(request,id):
    try:
        user = UserAccount.objects.get(id = id)
        car_id = request.data.get('car_id')
        if not car_id:
            return Response(
                {'success': False, 'error': 'Car ID is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        car = Car.objects.get(id = car_id)
        
        rating = request.data.get('rating')
        
        comments = request.data.get('comments')
        image = request.data.get('image')

        Review.objects.create(
            user = user,
            car = car,
            image = image,
            rating = rating,
            comments = comments,
        )
        return Response({'success':True,'message':'review is uploaded successfully'},status=status.HTTP_201_CREATED)
    except UserAccount.DoesNotExist:
        return Response({
            'success':False,
            'error':'Need to create account first'
        },status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response(
            {'success': False, 'error': 'An unexpected error occurred'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

@api_view(['GET'])
def get_review(request):
    reviews = Review.objects.all()
    serialized_reviews = ReviewSerializer(reviews, many=True)
    return Response({'success':True,'reviews':serialized_reviews.data})

@api_view(['GET'])
def filtered_review_by_car(request,id):
    car_id = Car.objects.get(id = id)
    filtered_reviews = Review.objects.filter(car=car_id).select_related('user')
    review_data = []
    for review in filtered_reviews:
        avatar_url = (
            request.build_absolute_uri(review.user.avatar.url)
            if review.user.avatar
            else 'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar.png'
        )
        review_data.append({
            'id': review.id,
            'rating': review.rating,
            'comments':review.comments,
            'user': {
                'name':review.user.name,
                'email':review.user.email,
                'avatar': avatar_url,
            },
            'review_date':review.review_date,
        })
    return Response({'success':True,'reviews':review_data})


# all favorite sessions
@api_view(['POST'])
def favorited_car(request, id):
    car_id = get_object_or_404(Car, id=id)
    userId = request.data.get('userId')
    if not userId:
        return Response({'success':False,'message':'No user account'}, status=status.HTTP_400_BAD_REQUEST)
    user = get_object_or_404(UserAccount, id=userId)
    isFavorite = request.data.get('isFavorite')

    if isFavorite not in [True, False, 'true','false', 'True','False']:
        return Response({'success':False, 'message': 'Invalid isFavorite value'}),
    
    isFavorite = isFavorite in [True, 'true','True']

    existing_favorite = Favorite.objects.filter(car=car_id, user= user).first()
    if existing_favorite:
        existing_favorite.delete()
        return Response({'success':False,'message':'false fav', 'isFavorite': None})

    favorited = Favorite.objects.create(
        user = user,
        car = car_id,
        isFavorite = isFavorite
    )
    return Response({'success':True, 'message':'Successfully added!', 'favorited':{
        'id': favorited.id,
        'car': favorited.car.id,
        'user':favorited.user.id,
        'isFavorite': favorited.isFavorite
    }})

@api_view(['GET'])
def get_favorite(request,car_id, user_id):
    get_favorite = Favorite.objects.filter(car=car_id, user=user_id).first()

    if get_favorite is None:
        return Response({
            "success": False,
            "message": "Favorite record not found"
        })
    return Response({
            "success": True,
            "message": "You got fav data",
            "get_favorite": {
                "id": get_favorite.id,
                "car": {
                    "id":get_favorite.car.id,
                    "brand":get_favorite.car.brand
                },
                "user": get_favorite.user.id,
                "isFavorite": get_favorite.isFavorite
            }
        }, status=200)

@api_view(['GET'])
def favorite_list(request, user_id):
    favorite_list = Favorite.objects.filter(user = user_id) #give query set
    #query set none give always false, so use not-exist()
    if not favorite_list.exists():
        return Response({
            "success": False,
            "message": "There is no favorite lists"
        })
    
    favorite_cars = []
    for fav_car in favorite_list:
        favorite_cars.append({
            "id":fav_car.car.id,
            "brand": fav_car.car.brand,
            "main_img":fav_car.car.main_img.url,
            "model":fav_car.car.model,
            "price_per_day":fav_car.car.price_per_day,
            "brand_logo":fav_car.car.brand_logo.url
        })

    return Response ({
        "success": True,
        "message":"Your Favorite lists",
        "favorite_cars": favorite_cars
    })

@api_view(['GET'])
def remove_favorite(request,car_id, user_id):
    favorite_list = Favorite.objects.filter(car = car_id, user = user_id).first()
    if not favorite_list:
        return Response({
            "success": False,
            "message": "Car not found in your favorite list."
        }, status=status.HTTP_404_NOT_FOUND)
    
    favorite_list.delete()
    return Response({
        "success":True,
        "message":"removed car in your favorite lists!"
    })

