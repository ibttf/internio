# Generated by Django 4.1.11 on 2023-10-20 19:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("Scraper", "0018_joblistings_company_logo"),
    ]

    operations = [
        migrations.AlterField(
            model_name="joblistings",
            name="company_link",
            field=models.CharField(blank=True, default="", max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name="joblistings",
            name="company_logo",
            field=models.CharField(blank=True, default="", max_length=500, null=True),
        ),
    ]
