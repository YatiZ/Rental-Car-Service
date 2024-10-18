from django.shortcuts import render
from django.http import JsonResponse
from .models import Car
from django.shortcuts import get_object_or_404
# Create your views here.

# def home_detail(request, id):
#     home = get_object_or_404(Homes, id = id)
#     home_data = {
#         'id': str(home.id),
#         'title': home.title,
#         'price_per_month': home.price_per_month,
#         'address': home.address,
#         'main_img': home.main_img.url,
#         'images': [img.image.url for img in home.images.all()],
#         # Add other fields as needed
#     }
#     return JsonResponse(home_data)

