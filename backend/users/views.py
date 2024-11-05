# from djoser.views import UserViewSet
# from rest_framework.response import Response
# from rest_framework import status
# from .serializers import UserAccountSerializer

# # Create your views here.

# class CustomUserViewSet(UserViewSet):
#     serializer_class = UserAccountSerializer

#     def create(self,request, *args, **kwargs):
#         try:
#             serializer = self.get_serializer(data = request.data)
#             serializer.is_valid(raise_exception = True)
#             user = serializer.save()

#             return Response(
#                 {'success':True,'message':'Your account is successfully created!','user':serializer.data},
#                 status=status.HTTP_201_CREATED
#             )
#         except Exception as e:
#             return Response(
#                 {'success': False,
#                  'message':'An error occurred!'
#                  }
#             )