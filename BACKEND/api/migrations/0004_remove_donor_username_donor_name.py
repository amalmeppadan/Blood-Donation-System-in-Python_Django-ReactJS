# Generated by Django 5.1.1 on 2024-09-04 08:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_donor_donor_donor_email_donor_password_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='donor',
            name='username',
        ),
        migrations.AddField(
            model_name='donor',
            name='name',
            field=models.CharField(default='default_donorname', max_length=250),
        ),
    ]
