# Generated by Django 5.1.1 on 2025-01-18 17:06

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("rentals", "0014_faq"),
    ]

    operations = [
        migrations.RenameField(
            model_name="faq",
            old_name="answers",
            new_name="answer",
        ),
        migrations.RenameField(
            model_name="faq",
            old_name="questions",
            new_name="question",
        ),
    ]
