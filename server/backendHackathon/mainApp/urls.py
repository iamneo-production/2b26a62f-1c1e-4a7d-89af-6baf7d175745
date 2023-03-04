from . import views
from django.urls import path
from django.conf import settings
from django.urls import path, include
from django.conf.urls.static import static



urlpatterns=[
  path('',views.index),
  path('data', views.searchData, name='Data'),
]