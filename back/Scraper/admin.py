from django.contrib import admin
from .models import JobListings

@admin.register(JobListings)
class JobListingAdmin(admin.ModelAdmin):
    list_display = ['title', 'description']
    search_fields = ['title']
    list_filter = ['title']