from django.urls import path
from . import views


urlpatterns = [
    path('createconversation/', views.createConversation.as_view(), name='createconversation'),
]