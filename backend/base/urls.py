from django.urls import path
from . import views

urlpatterns = [
    path('', views.GetRoute, name='route'),
    path('products/', views.GetProducts, name='products'),
    path('products/<str:pk>/', views.GetProduct, name='product'),
]
