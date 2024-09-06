from rest_framework import generics
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import *
from .serializer import *


class DonorListView(generics.ListAPIView):
    queryset = Donor.objects.all()  # Fetch all donor records
    serializer_class = DonorSerializer


class DonorDetailView(generics.RetrieveAPIView):
    queryset = Donor.objects.all()  # Fetch all donor records
    serializer_class = DonorSerializer  # Use the serializer to format the data
    lookup_field = "id"  # Define which field to use for lookup; default is 'pk'


class BloodGroupListView(generics.ListAPIView):
    queryset = BloodGroup.objects.all()
    serializer_class = BloodGroupSerializer


class RegisterDonorView(generics.CreateAPIView):
    queryset = Donor.objects.all()
    serializer_class = DonorSerializer
    permission_classes = [AllowAny]


class RequestBloodListView(generics.ListAPIView):
    queryset = RequestBlood.objects.all()
    serializer_class = RequestBloodSerializer
    permission_classes = [AllowAny]


class RequestBloodCreateView(generics.CreateAPIView):
    queryset = RequestBlood.objects.all()
    serializer_class = RequestBloodSerializer
    permission_classes = [AllowAny]


class RequestBloodDeleteView(generics.DestroyAPIView):
    queryset = RequestBlood.objects.all()
    permission_classes = [AllowAny]
    lookup_field = "id"  # Assuming you delete based on 'id'


class LoginDonorView(generics.GenericAPIView):
    serializer_class = DonorLoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid()
        email = serializer.validated_data["email"]
        password = serializer.validated_data["password"]

        try:
            donor = Donor.objects.get(email=email)
            if donor.password != password:
                raise Exception("Invalid password")
        except Donor.DoesNotExist:
            raise Exception("Donor not found")

        refresh = RefreshToken.for_user(donor)
        return Response(
            {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "id": donor.id,
            }
        )


# for Home page


class DonorCountByBloodGroupView(generics.ListAPIView):
    def get(self, request, blood_group_name, *args, **kwargs):
        try:
            # Get the blood group object
            blood_group = BloodGroup.objects.get(name=blood_group_name)
            # Filter donors by blood group and count them
            donor_count = Donor.objects.filter(blood_group=blood_group).count()
            return Response(
                {"blood_group": blood_group_name, "total_donors": donor_count}
            )
        except BloodGroup.DoesNotExist:
            return Response({"error": "Blood group not found"}, status=404)


# donor details with blood group


class DonorDetailsByBloodGroupView(generics.ListAPIView):
    serializer_class = DonorSerializer

    def get_queryset(self):
        blood_group_name = self.kwargs["blood_group_name"]
        try:
            blood_group = BloodGroup.objects.get(name=blood_group_name)
            return Donor.objects.filter(blood_group=blood_group)
        except BloodGroup.DoesNotExist:
            return Donor.objects.none()

    def get(self, request, blood_group_name, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
