# Generated by Django 4.1.11 on 2023-10-17 02:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("Scraper", "0006_remove_joblistings_categories_joblistings_categories"),
    ]

    operations = [
        migrations.RenameField(
            model_name="joblistings",
            old_name="link",
            new_name="apply_link",
        ),
    ]
