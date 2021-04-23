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
            "selection_sort": "Selection Sort"
        },
    "selection_sort": sorting_algorithms.selection_sort
}

# Functions
def map_algo(name):
    print("Calling: ",name)


def encode_str(inp_string):
    string_bytes = inp_string.encode("ascii")
    base64_bytes = base64.b64encode(string_bytes)
    base64_string = base64_bytes.decode("ascii")
    return (base64_string)

def decode_str(inp_string):
    base64_bytes = inp_string.encode("ascii")
    string_bytes = base64.b64decode(base64_bytes)
    op_string = sample_string_bytes.decode("ascii")
    return(op_string)

# Create your views here.
def index(request):
    template_name = 'html_templates\index.html'
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
        print("Ramdom Array is -->", l_random_array)
        return JsonResponse({'array':l_random_array})