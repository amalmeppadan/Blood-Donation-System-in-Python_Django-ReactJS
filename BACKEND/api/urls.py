from django.urls import path
from .views import *

urlpatterns = [
    path("donors/", DonorListView.as_view(), name="all_donor"),
    path("donor/register/", RegisterDonorView.as_view(), name="register_donor"),
    path("donor/login/", LoginDonorView.as_view(), name="login_donor"),
    path("donor/<int:id>/", DonorDetailView.as_view(), name="donor-detail"),
    path("blood-groups/", BloodGroupListView.as_view(), name="blood-group-list"),
    path("donor-count/<str:blood_group_name>/", DonorCountByBloodGroupView.as_view()),
    path("donors/<str:blood_group_name>/", DonorDetailsByBloodGroupView.as_view()),
    path(
        "request/blood/create",
        RequestBloodCreateView.as_view(),
        name="request_create_blood",
    ),
    path("request/donors-list/", RequestBloodListView.as_view()),
    path(
        "request-blood/delete/<int:id>/",
        RequestBloodDeleteView.as_view(),
        name="delete-request",
    ),
]
