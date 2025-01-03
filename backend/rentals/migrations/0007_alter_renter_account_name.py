# Generated by Django 5.1.1 on 2024-10-30 15:49

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("rentals", "0006_alter_renter_license_photo"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name="renter",
            name="account_name",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="renter",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
