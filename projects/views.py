from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from drf_spectacular.utils import extend_schema

from .models import Project
from .serializers import (
    ProjectSerializer,
    AddMemberSerializer,
)
from .permissions import IsAdminRole

User = get_user_model()


@extend_schema(
    request=ProjectSerializer,
    responses=ProjectSerializer,
)
class ProjectCreateView(APIView):

    permission_classes = [IsAuthenticated, IsAdminRole]

    def post(self, request):

        serializer = ProjectSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save(created_by=request.user)

            return Response(
                {
                    "message": "Project created successfully",
                    "data": serializer.data,
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class ProjectListView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role == "ADMIN":

            projects = Project.objects.all()

        else:

            projects = request.user.projects.all()

        serializer = ProjectSerializer(projects, many=True)

        return Response(serializer.data)


@extend_schema(
    request=AddMemberSerializer,
)
class AddMemberView(APIView):

    permission_classes = [IsAuthenticated, IsAdminRole]

    def post(self, request, project_id):

        project = get_object_or_404(Project, id=project_id)

        serializer = AddMemberSerializer(data=request.data)

        if serializer.is_valid():

            user = User.objects.get(
                id=serializer.validated_data["user_id"]
            )

            project.members.add(user)

            return Response(
                {
                    "message": "Member added successfully"
                }
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )