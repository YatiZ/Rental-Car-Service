from django.conf import settings
from django.db import models
import uuid

# Create your models here.
class Homes(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length= 255)
    main_img = models.ImageField(upload_to='uploads/homes', default='backend/media/uploads/homes/dummy-home.jpg')
    description = models.TextField()
    price_per_month = models.IntegerField()
    address = models.TextField()
    built_at = models.DateField(auto_now_add=False)

    bedrooms = models.PositiveIntegerField(default=1)
    bathrooms = models.PositiveIntegerField(default=1)
    living_areas = models.PositiveIntegerField()
    kitchen = models.BooleanField(default=True)
    laundry = models.BooleanField(default=False)

    heating = models.BooleanField(default=False)
    cooling = models.BooleanField(default=False)
    water_supply = models.BooleanField(default=True)
    internet_access = models.BooleanField(default=True)
    electricity = models.BooleanField(default=True)

    security_system = models.BooleanField(default=False)
    smoke_detector = models.BooleanField(default=False)

    yard = models.BooleanField(default=False)
    parking_space = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.title}"
    
    def image_url(self):
        return f'{settings.WEBSITE_URL}{self.image.url}'

class Image(models.Model):
    image = models.ImageField(upload_to='uploads/homes')
    homes = models.ForeignKey(Homes, related_name='images', on_delete=models.CASCADE)

    def __str__(self):
        return f"Image for {self.homes.title}"
