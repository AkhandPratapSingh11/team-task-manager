from django.db import models
from accounts.models import User

# Create your models here.
class Project(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="created_projects"
    )

    members = models.ManyToManyField(User, related_name="projects")

    created_at = models.DateTimeField(auto_now_add=True)