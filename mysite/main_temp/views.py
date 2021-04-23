import random
from django.shortcuts import render
from django.http import JsonResponse

# REST Framework functions
from rest_framework.views import APIView

# Create your views here.
def index(request):
    return render(request, 'html_templates\index.html')

class createRandomArray(APIView):
    def get(self, request):
        #print("Request",request.data)
        l_array_length=int(request.query_params.get('array_length'))
        l_random_array = list()
        for _value in range(0,l_array_length):
            l_random_array.append(random.randint(0,99))
        print("Ramdom Array is -->", l_random_array)
        return JsonResponse({'array':l_random_array})