from django.urls import path
from base.views import user_views as views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', views.GetUserProfile, name='user_profile'),
    path('', views.GetUsers, name='users'),
    path('register/', views.registerUser, name='register'),
    path('profile/update/', views.UpdateUserProfile, name='update-profile'),

    path('<str:pk>/', views.getUserById, name='user'),

    path('update/<str:pk>/', views.UpdateUser, name='user-update'),
    path('delete/<str:pk>/', views.deleteUser, name='user-delete'),
]