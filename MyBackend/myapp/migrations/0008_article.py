# Generated by Django 5.0.3 on 2024-11-06 17:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0007_categorie_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(help_text="Nom de l'article", max_length=100)),
                ('description', models.TextField(blank=True, help_text="Description de l'article")),
                ('prix', models.DecimalField(decimal_places=2, help_text="Prix de l'article en Dirham", max_digits=10)),
                ('image', models.ImageField(blank=True, help_text="Image de l'article", null=True, upload_to='articles/')),
            ],
        ),
    ]