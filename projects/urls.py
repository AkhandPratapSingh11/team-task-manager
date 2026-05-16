from django.urls import path

from .views import (
    ProjectCreateView,
    ProjectListView,
    AddMemberView,
)

urlpatterns = [

    path(
        "",
        ProjectListView.as_view()
    ),

    path(
        "create/",
        ProjectCreateView.as_view()
    ),

    path(
        "<int:project_id>/add-member/",
        AddMemberView.as_view()
    ),
]