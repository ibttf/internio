from rest_framework import serializers
from .models import JobListings
from .models import Emails
class JobListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobListings
        fields = ('title', 'company', 'company_link','company_logo','date','locations', 'apply_link', 'sponsorship', 'closed', 'categories')


class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Emails
        fields = '__all__'