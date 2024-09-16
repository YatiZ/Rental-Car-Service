from .models import Homes
from django.http import JsonResponse
from rest_framework.decorators import api_view
from .serializers import HomesListSerializer

@api_view(['GET'])
def homes_list(request):
    homes = Homes.objects.all()
    serializer = HomesListSerializer(homes, many =True)

    return JsonResponse({
        'data':serializer.data
    })