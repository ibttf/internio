from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings


class Category(models.Model):
    name = models.CharField(max_length=100)

class Emails(models.Model):
    email = models.EmailField(unique=True) 

    def __str__(self):
        return self.email
    
class JobListings(models.Model):
    title = models.CharField(max_length=500, default='')
    company = models.CharField(max_length=500, default='')
    company_link = models.CharField(max_length=500, default='', blank=True, null=True)
    company_logo = models.CharField(max_length=500, default='', blank=True, null=True)
    locations = ArrayField(models.CharField(max_length=1000, blank=True), blank=True, null=True, default=list)
    apply_link = models.URLField(max_length=500, default='',blank=True, null=True)
    sponsorship=models.BooleanField(default=False)
    closed=models.BooleanField(default=False)
    date = models.CharField(max_length=500, default='')
    categories = ArrayField(models.CharField(max_length=100), blank=True, default=list)

    def __str__(self):
        return self.title
    

@receiver(post_save, sender=JobListings)
def send_email_on_creation(sender, instance, created, **kwargs):
    if created:  # Only trigger when a new JobListing is created
        email_subject = f"New Job Listing Created: {instance.company} - {instance.title}"
        email_message = f"Job Title: {instance.title}, Company: {instance.company}"

        # Retrieve all email addresses from the Emails model
        recipient_list = [email_obj.email for email_obj in Emails.objects.all()]

        # Send the email
        send_mail(
            subject=email_subject,
            message=email_message,
            from_email="noreplyinternio@email.com",
            recipient_list=recipient_list,
            fail_silently=False,
        )