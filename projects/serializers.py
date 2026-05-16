from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Project

User = get_user_model()


class ProjectSerializer(serializers.ModelSerializer):

    created_by = serializers.ReadOnlyField(source="created_by.username")

    class Meta:
        model = Project

        fields = [
            "id",
            "name",
            "description",
            "created_by",
            "members",
            "created_at",
        ]


class AddMemberSerializer(serializers.Serializer):

    user_id = serializers.IntegerField()

    def validate_user_id(self, value):

        if not User.objects.filter(id=value).exists():
            raise serializers.ValidationError("User does not exist")

        return value