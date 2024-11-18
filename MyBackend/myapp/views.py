from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from .models import Projet, Client, Categorie, Article
from .serializers import ProjetSerializer, CategorieSerializer, ArticleSerializer
from django.http import JsonResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.hashers import make_password, check_password
from rest_framework import status
# Create your views here.


def index(request):
    return HttpResponse("Hello, Manal !")


class ProjetViewSet(viewsets.ModelViewSet):
    queryset = Projet.objects.all()
    serializer_class = ProjetSerializer


@csrf_exempt
def register_client(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        # Hasher le mot de passe avant de le stocker
        hashed_password = make_password(password)
        client = Client.objects.create(email=email, password=hashed_password)

        return JsonResponse({'message': 'Client enregistré avec succès!'}, status=201)

    return JsonResponse({'error': 'Méthode non autorisée'}, status=400)


@csrf_exempt
def login_client(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        # Vérification des informations de connexion
        try:
            client = Client.objects.get(email=email)
            if check_password(password, client.password):
                return JsonResponse({'message': 'Connexion réussie!'}, status=200)
            else:
                return JsonResponse({'error': 'Mot de passe incorrect'}, status=400)
        except Client.DoesNotExist:
            return JsonResponse({'error': 'Email non trouvé'}, status=404)

    return JsonResponse({'error': 'Méthode non autorisée'}, status=400)


@api_view(['GET'])
def get_categories(request):
    categories = Categorie.objects.all()
    serializer = CategorieSerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def articles_par_categorie(request, id):
    try:
        articles = Article.objects.filter(categorie__id=id)  # Filtre les articles par la catégorie
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data)
    except Article.DoesNotExist:
        return Response({"error": "Articles non trouvés pour cette catégorie"}, status=404)


@api_view(['POST'])
def create_article(request):
    serializer = ArticleSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def create_categorie(request):
    serializer = CategorieSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_article(request, article_id):
    try:
        article = Article.objects.get(id=article_id)
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Article.DoesNotExist:
        return Response({"error": "Article non trouvé"}, status=status.HTTP_404_NOT_FOUND)


@csrf_exempt
def delete_categorie_view(request, id):
    if request.method == "DELETE":
        categorie = get_object_or_404(Categorie, id=id)
        categorie.delete_categorie()
        return JsonResponse({"message": "Catégorie supprimée avec succès"}, status=200)
    return JsonResponse({"error": "Méthode non autorisée"}, status=405)


def get_article(request, id):
    try:
        article = Article.objects.get(pk=id)
        serializer = ArticleSerializer(article)
        return JsonResponse(serializer.data, safe=False)
    except Article.DoesNotExist:
        return HttpResponseNotFound("Article introuvable.")


@csrf_exempt
def update_article(request, id):
    if request.method == "PATCH":
        # Vérification si la requête est en JSON
        if request.content_type != 'application/json':
            return JsonResponse({"error": "Le format des données doit être JSON."}, status=400)

        try:
            # Charger les données JSON envoyées dans la requête
            data = json.loads(request.body)

            # Essayons de trouver l'article à mettre à jour
            article = Article.objects.get(id=id)

            # Mise à jour des champs (exemple : titre et description)
            if 'title' in data:
                article.title = data['title']
            if 'description' in data:
                article.description = data['description']
            if 'image' in data:
                # Gérer l'upload de l'image (si nécessaire)
                article.image = data['image']

            article.save()  # Sauvegarder les changements
            return JsonResponse({"message": "Article mis à jour avec succès."}, status=200)

        except Article.DoesNotExist:
            return JsonResponse({"error": "Article non trouvé."}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Erreur dans les données envoyées."}, status=400)
        except Exception as e:
            return JsonResponse({"error": f"Erreur serveur : {str(e)}"}, status=500)

