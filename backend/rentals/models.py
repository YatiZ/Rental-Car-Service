from django.conf import settings
from django.db import models
from users.models import UserAccount
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
    id = models.UUIDField(primary_key=True,default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=255)
    email = models.EmailField()
    message = models.TextField()

    def __str__(self):
        return self.username
    
class Renter(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4, editable=False)
    account_name = models.OneToOneField(UserAccount, related_name='renter', on_delete=models.CASCADE)
    renter_name = models.CharField(max_length=255)
    phonenumber = models.CharField(max_length=255)
    address = models.TextField()
    driver_license_number = models.CharField(max_length=255)
    license_expiration_date = models.DateField()
    license_photo = models.ImageField(upload_to='uploads/license')

    def __str__(self):
            return f"{self.account_name} - {self.renter_name}"

class Reservation(models.Model):
     id = models.UUIDField(primary_key=True,default=uuid.uuid4, editable=False)
     renter = models.ForeignKey(UserAccount, related_name='renter_info',on_delete= models.CASCADE)
     car = models.ForeignKey(Car,related_name='car',on_delete=models.CASCADE)
     start_date = models.DateTimeField()
     end_date = models.DateTimeField()
     total_date =models.IntegerField(default=1)
     total_price = models.FloatField()
     pickup_location = models.TextField()
     dropoff_location = models.TextField()

     def __str__(self):
          return f"{self.renter} - {self.car}"

class Payment(models.Model):
    METHOD = [
         ('credit_card','credit_card'),
         ('debit','debit'),
         ('cash','cash')
    ]
    STAUTS = [
         ('completed','completed'),
         ('pending','pending')
    ]
    id = models.UUIDField(primary_key=True,default=uuid.uuid4, editable=False)
    reservation = models.ForeignKey(Reservation, related_name='reservation', on_delete=models.CASCADE)
    amount = models.FloatField()
    payment_method = models.CharField(choices=METHOD, default='credit_card',max_length=100)
    payment_date = models.DateTimeField()
    status = models.CharField(choices=STAUTS, default='pending',max_length=100)

class Review(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4, editable=False)
    user = models.ForeignKey(UserAccount,on_delete=models.CASCADE, related_name='user')
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    image = models.FileField(upload_to='uploads/reviews', null=True, blank=True)
    rating = models.IntegerField()
    comments = models.TextField()
    review_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
         return f"{self.user} - {self.car}"
    

