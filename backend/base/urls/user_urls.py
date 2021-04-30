from django.urls import path
from base.views import user_views as views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', views.GetUserProfile, name='user_profile'),
    path('', views.GetUsers, name='users'),
    path('register/', views.registerUser, name='register'),
]
