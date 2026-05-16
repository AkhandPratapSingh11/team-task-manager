from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import SignupView, ProfileView


urlpatterns = [

    path("signup/", SignupView.as_view()),

    path("login/", TokenObtainPairView.as_view()),

    path("refresh/", TokenRefreshView.as_view()),

    path("profile/", ProfileView.as_view()),
]