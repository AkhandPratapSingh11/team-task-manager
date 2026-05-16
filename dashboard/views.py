from datetime import date

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from tasks.models import Task


class DashboardView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role == "ADMIN":

            tasks = Task.objects.all()

        else:

            tasks = Task.objects.filter(
                assigned_to=request.user
            )

        total_tasks = tasks.count()

        completed_tasks = tasks.filter(
            status="DONE"
        ).count()

        pending_tasks = tasks.filter(
            status="TODO"
        ).count()

        in_progress_tasks = tasks.filter(
            status="IN_PROGRESS"
        ).count()

        overdue_tasks = tasks.filter(
            due_date__lt=date.today()
        ).exclude(
            status="DONE"
        ).count()

        return Response(
            {
                "total_tasks": total_tasks,
                "completed_tasks": completed_tasks,
                "pending_tasks": pending_tasks,
                "in_progress_tasks": in_progress_tasks,
                "overdue_tasks": overdue_tasks,
            }
        )