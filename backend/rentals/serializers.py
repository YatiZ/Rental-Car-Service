from rest_framework import serializers
from users.serializers import UserAccountSerializer
from . models import CarGallery, Car, Contact, Renter, Reservation, Payment, Review, FAQ



class ImageCarGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = CarGallery
        fields =['image']

class CarListSerializer(serializers.ModelSerializer):
    image = ImageCarGallerySerializer(many=True)
    class Meta:
        model = Car
        fields = ['id','brand','main_img','brand_logo','description','model','year','transmission',
                  'color','passengers','suitcases','gas_type','price_per_day','status', 'image'
                  ]
class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'
    
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

class RenterSerializer(serializers.ModelSerializer):
    account_name = UserAccountSerializer(read_only = True, many=False)
    class Meta:
        model = Renter
        fields = '__all__'

class ReservationSerializer(serializers.ModelSerializer):
    renter = RenterSerializer(read_only = True, many = False)

    class Meta:
        model = Reservation
        fields = '__all__'

class HistorySerializer(serializers.ModelSerializer):
    renter = UserAccountSerializer(read_only = True, many=False)
    car = CarSerializer(read_only=True, many=False)
    class Meta:
        model = Reservation
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    # user = UserAccountSerializer(read_only=True, many=True)
    class Meta:
        model = Review
        fields = '__all__'

class FaqSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'