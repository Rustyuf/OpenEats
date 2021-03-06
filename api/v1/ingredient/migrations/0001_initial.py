# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-10-31 14:17
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('recipe', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ingredient',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=250, verbose_name='title')),
                ('quantity', models.FloatField(default=0, verbose_name='quantity')),
                ('measurement', models.CharField(blank=True, max_length=200, null=True, verbose_name='measurement')),
                ('recipe', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ingredients', to='recipe.Recipe', verbose_name='recipe')),
            ],
            options={
                'ordering': ['title'],
            },
        ),
    ]
