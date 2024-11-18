# myapp/urls.py
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjetViewSet, register_client, articles_par_categorie, create_article
from . import views

# Crée un routeur et enregistre le ViewSet pour le modèle Projet
router = DefaultRouter()
router.register(r'projets', ProjetViewSet, basename='projet')


urlpatterns = [
    path('api/', include(router.urls)),
    path('api/register/', register_client, name='register_client'),
    path('api/login/', views.login_client, name='login_client'),
    path('api/categories/', views.get_categories, name='get_categories'),
    path('categorie/<int:categorie_id>/', articles_par_categorie, name='articles_par_categorie'),
    # path('api/articles/categorie/<int:categorie_id>/', articles_par_categorie, name='articles_par_categorie'),
    path('api/articles/categorie/<int:id>/', articles_par_categorie, name='articles_par_categorie'),
    path('api/articles/create/', create_article, name='create_article'),
    path('api/categories/create/', views.create_categorie, name='create_categorie'),
    path('api/articles/delete/<int:article_id>/', views.delete_article, name='delete_article'),
    path('api/categories/<int:id>/delete/', views.delete_categorie_view, name='delete_categorie'),
    path('api/articles/<int:id>/', views.get_article, name='get_article'),
    path('api/articles/update/<int:id>/', views.update_article, name='update_article'),
]
