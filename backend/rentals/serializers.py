from rest_framework import serializers

from . models import Homes, Image, CarGallery, Car

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['image']

class HomesListSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only = True)
    class Meta:
        model = Homes
        fields = ['id', 'title', 'main_img', 'description', 'price_per_month', 'address', 
                  'built_at', 'bedrooms', 'bathrooms', 'living_areas', 'kitchen', 'laundry', 
                  'heating', 'cooling', 'water_supply', 'internet_access', 'electricity', 
                  'security_system', 'smoke_detector', 'yard', 'parking_space', 'images']

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
        