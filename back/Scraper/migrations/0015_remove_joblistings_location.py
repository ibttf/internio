# Generated by Django 4.1.11 on 2023-10-20 02:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("Scraper", "0014_joblistings_date"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="joblistings",
            name="location",
        ),
    ]
