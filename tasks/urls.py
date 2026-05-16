from django.urls import path

from .views import (
    TaskCreateView,
    TaskListView,
    TaskStatusUpdateView,
    OverdueTaskView,
)

urlpatterns = [

    path(
        "",
        TaskListView.as_view()
    ),

    path(
        "create/",
        TaskCreateView.as_view()
    ),

    path(
        "<int:task_id>/update-status/",
        TaskStatusUpdateView.as_view()
    ),

    path(
        "overdue/",
        OverdueTaskView.as_view()
    ),
]