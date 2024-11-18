# admin.py
from django.contrib import admin
from .models import Projet, Client, Categorie, Article

admin.site.register(Projet)
admin.site.register(Client)
admin.site.register(Categorie)
admin.site.register(Article)