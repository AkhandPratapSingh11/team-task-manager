from datetime import date

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from django.shortcuts import get_object_or_404

from drf_spectacular.utils import extend_schema

from .models import Task
from .serializers import TaskSerializer
from .permissions import IsAdminRole


@extend_schema(
    request=TaskSerializer,
    responses=TaskSerializer,
)
class TaskCreateView(APIView):

    permission_classes = [IsAuthenticated, IsAdminRole]

    def post(self, request):

        serializer = TaskSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save()

            return Response(
                {
                    "message": "Task created successfully",
                    "data": serializer.data,
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class TaskListView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role == "ADMIN":

            tasks = Task.objects.all()

        else:

            tasks = Task.objects.filter(
                assigned_to=request.user
            )

        serializer = TaskSerializer(tasks, many=True)

        return Response(serializer.data)


class TaskStatusUpdateView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, task_id):

        task = get_object_or_404(Task, id=task_id)

        if (
            request.user.role != "ADMIN"
            and task.assigned_to != request.user
        ):

            return Response(
                {
                    "detail": "You do not have permission"
                },
                status=status.HTTP_403_FORBIDDEN
            )

        new_status = request.data.get("status")

        valid_statuses = [
            "TODO",
            "IN_PROGRESS",
            "DONE"
        ]

        if new_status not in valid_statuses:

            return Response(
                {
                    "error": "Invalid status"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        task.status = new_status
        task.save()

        serializer = TaskSerializer(task)

        return Response(
            {
                "message": "Task status updated",
                "data": serializer.data,
            }
        )


class OverdueTaskView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        overdue_tasks = Task.objects.filter(
            due_date__lt=date.today()
        ).exclude(status="DONE")

        serializer = TaskSerializer(
            overdue_tasks,
            many=True
        )

        return Response(serializer.data)