from django.urls import path, include
from . import views
from rest_framework import routers

urlpatterns = [
    path('', views.index),
    path('createRandomArray/', views.createRandomArray.as_view()),
    path('sort/',views.sort_array)
]
