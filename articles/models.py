from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


# # class Article(models.Model):
# #     id = models.BigAutoField(primary_key=True)
# #     title = models.CharField(max_length=255)
# #     author = models.CharField(max_length=255)
# #     content = models.TextField()

# #     def __str__(self):
# #         return self.title
# class Movie(models.Model):
#     id= models.AutoField(auto_created=True, primary_key=True, serialize=True, verbose_name='ID')
#     name=models.CharField(max_length=50)
#     genre=models.CharField(max_length=50)
#     desc=models.TextField()
#     image=models.ImageField(upload_to='movie',null=True)
    
# class Movienow(models.Model):
#     id= models.AutoField(auto_created=True, primary_key=True, serialize=True, verbose_name='ID')
#     name=models.CharField(max_length=50)
#     genre=models.CharField(max_length=50)
#     desc=models.TextField()
#     image=models.ImageField(upload_to='movie',null=True)
#     director=models.CharField(max_length=50)
#     runtime=models.CharField(max_length=50)
#     lang=models.CharField(max_length=50)


# class Movieup(models.Model):
#     id= models.AutoField(auto_created=True, primary_key=True, serialize=True, verbose_name='ID')
#     name=models.CharField(max_length=50)
#     genre=models.CharField(max_length=50)
#     desc=models.TextField()
#     image=models.ImageField(upload_to='movie',null=True)
#     director=models.CharField(max_length=50)
#     runtime=models.CharField(max_length=50)
#     lang=models.CharField(max_length=50)
# class Theatres(models.Model):
#     id= models.AutoField(auto_created=True, primary_key=True, serialize=True, verbose_name='ID')
#     name=models.CharField(max_length=50)
#     place=models.CharField(max_length=50)
# class Screen(models.Model):
#     id= models.AutoField(auto_created=True, primary_key=True, serialize=True, verbose_name='ID')
#     name=models.CharField(max_length=50)
#     movie=models.CharField(max_length=50)
#     sound=models.CharField(max_length=50)
#     theatre=models.CharField(max_length=50)


class Movie(models.Model):
    AVAILABILITY_CHOICES = [
        ('nowshowing', 'Now Showing'),
        ('upcoming', 'Upcoming'),
        ('none', 'None'),
    ]

    LANGUAGE_CHOICES = [
        ('english', 'English'),
        ('malayalam', 'Malayalam'),
        
        
        
    ]

    name = models.CharField(max_length=255)
    genre = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='movies/')
    availability = models.CharField(max_length=20, choices=AVAILABILITY_CHOICES, default='none')
    language = models.CharField(max_length=20, choices=LANGUAGE_CHOICES, default='english')
    director = models.CharField(max_length=255,null=True)
    # url=models.CharField(max_length=255,null=True)

    def __str__(self):
        return self.name

    

class Theatre(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    screens = models.ManyToManyField('Screen')
    def __str__(self):
        return self.name

class Screen(models.Model):
    name = models.CharField(max_length=255)
    capacity = models.IntegerField()
    sound = models.CharField(max_length=255, null=True)

    def __str__(self):
        return f"{self.name} - {self.capacity} - {self.sound}"


class Showtime(models.Model):
    # id = models.AutoField(primary_key=True)
    screen = models.ForeignKey(Screen, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    theatre = models.ForeignKey(Theatre, on_delete=models.CASCADE)
    start_time = models.DateTimeField(default=timezone.now)
    end_time = models.DateTimeField()

    def __str__(self):
        return f"{self.screen} - {self.theatre} - {self.movie}  ({self.start_time.strftime('%Y-%m-%d %H:%M:%S')})"

class Booking(models.Model):
    showtime = models.ForeignKey(Showtime, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True)
    seats = models.TextField(null=True)
    payment_id = models.TextField(null=True)
    order_id = models.TextField(null=True)
    amount = models.IntegerField(null=True)

    

    def __str__(self):
        return f"{self.payment_id} - {self.showtime} - {self.user} - {self.seats} "
    
class UserReview(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField()
    review = models.TextField()
    def __str__(self):
        return f"{self.user} - {self.movie} - {self.score} "
