from rest_framework import serializers

from .models import Task


class TaskSerializer(serializers.ModelSerializer):

    assigned_to_username = serializers.ReadOnlyField(
        source="assigned_to.username"
    )

    class Meta:
        model = Task

        fields = [
            "id",
            "title",
            "description",
            "project",
            "assigned_to",
            "assigned_to_username",
            "status",
            "due_date",
            "created_at",
        ]