from django.db import models
from django.conf import settings

from projects.models import Project


class Task(models.Model):

    STATUS_CHOICES = (
        ("TODO", "Todo"),
        ("IN_PROGRESS", "In Progress"),
        ("DONE", "Done"),
    )

    title = models.CharField(max_length=255)

    description = models.TextField(blank=True)

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="tasks"
    )

    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name="assigned_tasks"
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="TODO"
    )

    due_date = models.DateField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title