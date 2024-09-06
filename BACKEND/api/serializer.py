from rest_framework import serializers
from .models import Donor, BloodGroup, RequestBlood


class BloodGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = BloodGroup
        fields = "__all__"


class RequestBloodSerializer(serializers.ModelSerializer):
    class Meta:
        model = RequestBlood
        fields = [
            "id",
            "name",
            "email",
            "phone",
            "state",
            "city",
            "address",
            "blood_group",
            "date",
        ]


class DonorSerializer(serializers.ModelSerializer):

    blood_group = serializers.PrimaryKeyRelatedField(queryset=BloodGroup.objects.all())

    class Meta:
        model = Donor
        fields = [
            "id",  # Add id field
            "name",
            "email",
            "password",
            "phone",
            "state",
            "city",
            "address",
            "blood_group",
            "gender",
            "image",
            "ready_to_donate",
        ]

    def create(self, validated_data):
        user = Donor.objects.create(**validated_data)
        return user

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["id"] = instance.id
        return representation


class DonorLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
