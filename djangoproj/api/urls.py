from django.urls import path


# api/urls.py

from django.urls import path
from .views import UserRegistrationView, UserLoginView, FlashcardGenerationView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('flashcards/', FlashcardGenerationView.as_view(), name='flashcards'),
]
