from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from rest_framework import status
import json
from json import JSONEncoder
from django.shortcuts import render




def index(request):
    return render(request, 'index.html')

  
   
@api_view(['POST'])
def searchData(request):
    if request.method == 'POST' :
        print(request.data['data'])
        return Response({"data": 'from backend'}, status=status.HTTP_200_OK)
    else : 
        pass