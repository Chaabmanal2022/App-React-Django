# models.py
from django.db import models
from django.utils import timezone


class Projet(models.Model):
    nom = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.nom


class Client(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.email


class Categorie(models.Model):
    nom = models.CharField(max_length=100)
    image = models.ImageField(upload_to='categories/', null=True, blank=True)
    description = models.TextField()

    def __str__(self):
        return self.nom

    def delete_categorie(self):
        self.delete()

class Article(models.Model):
    nom = models.CharField(max_length=100, help_text="Nom de l'article")
    description = models.TextField(blank=True, help_text="Description de l'article")
    prix = models.DecimalField(max_digits=10, decimal_places=2, help_text="Prix de l'article en Dirham")
    image = models.ImageField(upload_to='articles/', blank=True, null=True, help_text="Image de l'article")
    categorie = models.ForeignKey(
        Categorie,
        on_delete=models.CASCADE,
        null=False,
        blank=False,
        default=1  # replace 1 with the default category ID or an appropriate default value
    )

    def __str__(self):
        return f"{self.nom} - {self.prix} DH"
