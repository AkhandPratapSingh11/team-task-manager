from django.db import models
from accounts.models import User
from projects.models import Project

# Create your models here.
class Task(models.Model):

    STATUS_CHOICES = (
        ("TODO", "Todo"),
        ("IN_PROGRESS", "In Progress"),
        ("DONE", "Done"),
    )

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    assigned_to = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="TODO"
    )

    due_date = models.DateField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)