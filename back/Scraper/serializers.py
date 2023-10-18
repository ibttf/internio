from rest_framework import serializers
from .models import JobListings

class JobListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobListings
        fields = ('title', 'company', 'company_link','date','location', 'apply_link', 'sponsorship', 'closed', 'categories')