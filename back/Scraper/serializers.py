from rest_framework import serializers
from .models import JobListings

class JobListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobListings
        fields = '__all__'