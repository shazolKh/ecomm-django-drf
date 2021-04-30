from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path('', views.GetProducts, name='products'),
    path('<str:pk>/', views.GetProduct, name='product'),
]
