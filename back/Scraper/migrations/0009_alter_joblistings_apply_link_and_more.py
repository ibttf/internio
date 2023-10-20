# Generated by Django 4.1.11 on 2023-10-17 02:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("Scraper", "0008_joblistings_company_link"),
    ]

    operations = [
        migrations.AlterField(
            model_name="joblistings",
            name="apply_link",
            field=models.URLField(blank=True, default="", null=True),
        ),
        migrations.AlterField(
            model_name="joblistings",
            name="company_link",
            field=models.URLField(blank=True, default="", null=True),
        ),
    ]