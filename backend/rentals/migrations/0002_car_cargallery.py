# Generated by Django 5.1.1 on 2024-10-02 16:36

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("rentals", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Car",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("brand", models.CharField(max_length=255)),
                (
                    "main_img",
                    models.ImageField(
                        default="backend/media/uploads/homes/dummy-home.jpg",
                        upload_to="uploads/cars",
                    ),
                ),
                ("brand_logo", models.ImageField(upload_to="uploads/cars/logo")),
                ("description", models.TextField()),
                ("model", models.CharField(max_length=255)),
                ("year", models.IntegerField()),
                (
                    "transmission",
                    models.CharField(
                        choices=[("manual", "Manual"), ("automatic", "Automatic")],
                        max_length=10,
                    ),
                ),
                ("color", models.CharField(max_length=255)),
                ("passengers", models.IntegerField()),
                ("suitcases", models.IntegerField()),
                (
                    "gas_type",
                    models.CharField(
                        choices=[
                            ("gasoline", "Gasoline"),
                            ("diesel", "Diesel"),
                            ("electricity", "Electricity"),
                            ("natural gas", "Natural Gas"),
                        ],
                        max_length=100,
                    ),
                ),
                ("price_per_day", models.FloatField()),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("available", "Available"),
                            ("renting", "Renting"),
                            ("maintenance", "Maintenance"),
                        ],
                        max_length=100,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="CarGallery",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("image", models.ImageField(upload_to="uploads/cars")),
                (
                    "car",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="rentals.car"
                    ),
                ),
            ],
        ),
    ]
