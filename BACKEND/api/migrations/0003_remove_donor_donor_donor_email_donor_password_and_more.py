# Generated by Django 5.1.1 on 2024-09-04 07:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_remove_donor_date_of_birth_alter_donor_state'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='donor',
            name='donor',
        ),
        migrations.AddField(
            model_name='donor',
            name='email',
            field=models.EmailField(default='default@example.com', max_length=250),
        ),
        migrations.AddField(
            model_name='donor',
            name='password',
            field=models.CharField(default='default password', max_length=250),
        ),
        migrations.AddField(
            model_name='donor',
            name='username',
            field=models.CharField(default='default_username', max_length=250),
        ),
    ]
