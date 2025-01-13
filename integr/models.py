from django.db import models

class Article(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    content = models.TextField()

    def __str__(self):
        return self.title
class Movienow(models.Model):
    id= models.AutoField(auto_created=True, primary_key=True, serialize=True, verbose_name='ID')
    genre=models.CharField(max_length=50)
    desc=models.TextField()
    image=models.ImageField(upload_to='movie',null=True)
    name=models.CharField(max_length=50)
class Movieup(models.Model):
    id= models.AutoField(auto_created=True, primary_key=True, serialize=True, verbose_name='ID')
    genre=models.CharField(max_length=50)
    desc=models.TextField()
    image=models.ImageField(upload_to='movie',null=True)
    name=models.CharField(max_length=50)
class Theatres(models.Model):
    id= models.AutoField(auto_created=True, primary_key=True, serialize=True, verbose_name='ID')
    name=models.CharField(max_length=50)
    place=models.CharField(max_length=50)
class Screen(models.Model):
    id= models.AutoField(auto_created=True, primary_key=True, serialize=True, verbose_name='ID')
    movie=models.CharField(max_length=50)
    name=models.CharField(max_length=50)
    sound=models.CharField(max_length=50)