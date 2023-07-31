from django.db import models

# Create your models here.
from django.db import models

class User(models.Model):
    id = models.UUIDField(primary_key=True, max_length=36)
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    photo = models.ImageField(upload_to='photos/')
    
    def __str__(self):
        return self.id