# Generated by Django 4.1.11 on 2023-10-17 01:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("Scraper", "0003_alter_joblistings_company_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="joblistings",
            name="closed",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="joblistings",
            name="sponsorship",
            field=models.BooleanField(default=False),
        ),
    ]
