import random
import base64
from django.shortcuts import render
from django.http import JsonResponse
from . import sorting_algorithms

# REST Framework functions
from rest_framework.views import APIView

sorting_algo_map = {
    "ui_array":
        {
            "selection_sort": "Selection Sort",
            "insertion_sort": "Insertion Sort",
            "bubble_sort": "Bubble Sort"
        },
    "selection_sort": sorting_algorithms.selection_sort,
    "insertion_sort": sorting_algorithms.insertion_sort,
    "bubble_sort": sorting_algorithms.bubble_sort
}

# Functions
def map_algo(name):
    print("Calling: ",name)


# Create your views here.
def index(request):
    template_name = 'html_templates/index.html'
    context_object = dict()
    context_object['ui_array'] = sorting_algo_map['ui_array']
    print(context_object)
    return render(request, template_name=template_name, context=context_object)

def sort_array(request):
    return_object = dict()
    algo_type=request.GET.get('sort')
    array= [int(a) for a in  request.GET.get('ary').split(',')]
    return_array = sorting_algo_map[algo_type](array)
    return_object['sorted_array'] = return_array

    return JsonResponse(return_object)
    

class createRandomArray(APIView):
    def get(self, request):
        #print("Request",request.data)
        l_array_length=int(request.query_params.get('array_length'))
        l_random_array = list()
        for _value in range(0,l_array_length):
            l_random_array.append(random.randint(0,99))
        #print("Ramdom Array is -->", l_random_array)
        return JsonResponse({'array':l_random_array})