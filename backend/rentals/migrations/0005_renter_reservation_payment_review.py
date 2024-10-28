# Generated by Django 5.1.1 on 2024-10-28 16:39

import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("rentals", "0004_alter_contact_id"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Renter",
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
                ("renter_name", models.CharField(max_length=255)),
                ("phonenumber", models.CharField(max_length=255)),
                ("address", models.TextField()),
                ("driver_license_number", models.CharField(max_length=255)),
                ("license_expiration_date", models.DateField()),
                ("license_photo", models.ImageField(upload_to="")),
                (
                    "account_name",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="username",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Reservation",
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
                ("start_date", models.DateTimeField()),
                ("end_date", models.DateTimeField()),
                ("total_price", models.FloatField()),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("confirmed", "Confirmed"),
                            ("completed", "Completed"),
                            ("canceled", "Canceled"),
                        ],
                        default="confirmed",
                        max_length=100,
                    ),
                ),
                ("pickup_location", models.TextField()),
                ("dropoff_location", models.TextField()),
                (
                    "car",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="car",
                        to="rentals.car",
                    ),
                ),
                (
                    "renter",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="renter_info",
                        to="rentals.renter",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Payment",
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
                ("amount", models.FloatField()),
                (
                    "payment_method",
                    models.CharField(
                        choices=[
                            ("credit_card", "credit_card"),
                            ("debit", "debit"),
                            ("cash", "cash"),
                        ],
                        default="credit_card",
                        max_length=100,
                    ),
                ),
                ("payment_date", models.DateTimeField()),
                (
                    "status",
                    models.CharField(
                        choices=[("completed", "completed"), ("pending", "pending")],
                        default="pending",
                        max_length=100,
                    ),
                ),
                (
                    "reservation",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="reservation",
                        to="rentals.reservation",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Review",
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
                ("rating", models.IntegerField()),
                ("comments", models.TextField()),
                ("review_date", models.DateTimeField()),
                (
                    "car",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="rentals.car"
                    ),
                ),
                (
                    "customer",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="rentals.renter"
                    ),
                ),
            ],
        ),
    ]