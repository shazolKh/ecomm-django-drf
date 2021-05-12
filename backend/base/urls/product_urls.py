from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path('', views.GetProducts, name='products'),
    path('create/', views.createProduct, name='create-product'),
    path('upload/', views.UploadImage, name='image-upload'),
    path('<str:pk>/', views.GetProduct, name='product'),

    path('delete/<str:pk>/', views.DeleteProduct, name='delete-product'),
    path('update/<str:pk>/', views.UpdateProduct, name='update-product'),

]
