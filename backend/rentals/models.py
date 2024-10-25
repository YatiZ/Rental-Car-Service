from django.conf import settings
from django.db import models
import uuid

# Create your models here.

    
class Car(models.Model):
    TRANSMISSION_CHOICES = [
       ('manual','Manual'),
       ('automatic','Automatic')
    ]
    GAS_TYPE = [
        ('gasoline','Gasoline'),
        ('diesel','Diesel'),
        ('electricity','Electricity'),
        ('natural gas','Natural Gas')
    ]
    STATUS = [
        ('available','Available'),
        ('renting','Renting'),
        ('maintenance','Maintenance')
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    brand = models.CharField(max_length=255)
    main_img = models.ImageField(upload_to='uploads/cars', default='backend/media/uploads/homes/dummy-home.jpg')
    brand_logo = models.ImageField(upload_to='uploads/cars/logo')
    description = models.TextField()
    model = models.CharField(max_length=255)
    year = models.IntegerField()
    transmission = models.CharField(choices=TRANSMISSION_CHOICES, max_length=10)
    color = models.CharField(max_length=255)
    passengers =models.IntegerField()
    suitcases = models.IntegerField()
    gas_type = models.CharField(choices=GAS_TYPE, max_length=100)
    price_per_day = models.FloatField()
    status = models.CharField(choices=STATUS, max_length=100, default='available')

    def __str__(self):
        return f"{self.brand} {self.status}"
    
class CarGallery(models.Model):
    image =models.ImageField(upload_to='uploads/cars') 
    car = models.ForeignKey(Car, related_name='image', on_delete=models.CASCADE)

class Contact(models.Model):
    username = models.CharField(max_length=255)
    email = models.EmailField()
    message = models.TextField()

    def __str__(self):
        return self.username