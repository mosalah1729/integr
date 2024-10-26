from django.shortcuts import render
# from .models import Article
from .models import Movie
# from .models import Movienow
# from .models import Movieup
from .models import Theatre
from .models import Showtime
from .models import Screen
# Create your views here.
from django.http import JsonResponse
from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import TemplateView
from django.http import JsonResponse
# from .models import Movieup
# from .models import Movienow
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import QueryDict
import json
from django.contrib.auth.models import User
from django.contrib import auth
from django.contrib.auth import login
from django.contrib import messages
from django.http import HttpResponseBadRequest
from django.db.models import Q
from datetime import datetime, timedelta
from pymongo import MongoClient
from articles.models import UserReview
from articles.models import Booking
import nltk
nltk.download('vader_lexicon')

from nltk.sentiment.vader import SentimentIntensityAnalyzer

from django.conf import settings
import razorpay
from django.http import JsonResponse
import itertools
import re
import pickle
# Connect to MongoDB

client = MongoClient('mongodb://localhost:27017/')
db = client['integr']
collection = db['articles_userreview']





payclient = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))



def predict(request):
    # amount = request.POST.get('amount')
    username= json.loads(request.body)['userName']
    print(username)
    # Load the criticker_model.pkl file
    with open('media/criticker_model.pkl', 'rb') as file:
        criticker = pickle.load(file)
    user_id = 1
    movie_id = 6
    user = criticker.users[user_id]
    psi = criticker.calculate_psi(user, movie_id)
    print(psi)
    if psi is not None:
        return HttpResponse(f"PSI for movie ID {movie_id} and user ID {user_id}: {psi}")
    else:
        return HttpResponse("No PSI value found for the given movie and user.")


    return JsonResponse(order)







def payment(request):
    # amount = request.POST.get('amount')
    price= json.loads(request.body)['price']

    currency = 'INR'
    print(price)
    # notes = {'user_id': request.user.id}  # Add any additional notes you want to pass to Razorpay
    notes = {'user_id': 'salah'}  # Add any additional notes you want to pass to Razorpay
    data = {
        'amount': int(price) * 100,  # Razorpay expects the amount in paise
        'currency': currency,
        'notes': notes,
    }
    print(data)
    order = payclient.order.create(data=data)
    print(order)
    xx='heyy'
    return JsonResponse(order)

def handle_payment_success(request):
    payload = request.body
    signature = request.headers.get('X-Razorpay-Signature')
    try:
        client.utility.verify_payment_signature(payload, signature)
        # Payment signature is valid, handle the payment success here
        # You can retrieve the order ID from the payload and update your database accordingly
        return JsonResponse({'status': 'success'})
    except razorpay.errors.SignatureVerificationError:
        # Payment signature is invalid, handle the error here
        return JsonResponse({'status': 'error'})

def addbooking(request):
    capacity=json.loads(request.body)['capacity']
    payment_id= json.loads(request.body)['pay']
    movieName= json.loads(request.body)['movieName']
    price= json.loads(request.body)['price']
    price=price/100
    # movieLang= json.loads(request.body)['movieLang']
    theater= json.loads(request.body)['theater']
    screen= json.loads(request.body)['screen']
    startTime= json.loads(request.body)['startTime']
    # selectedDate= json.loads(request.body)['selectedDate']
    selectedDate= '2023-05-01'
    # movieLoc= json.loads(request.body)['movieLoc']
    # showtime= json.loads(request.body)['showtime']
    start_time_str=selectedDate + ' ' + startTime

# Parse the combined string and create a datetime object
    start_time = datetime.strptime(start_time_str, '%Y-%m-%d %I:%M %p')
    print("cpasiti")
    print(capacity)
    # capacity=150
    # show = Showtime.objects.get(movie=movieName,screen=screen,theatre=theater,start_time=start_time)
    mov = Movie.objects.get(name=movieName)
    print("mov")
    print(mov)
    scr = Screen.objects.get(name=screen,capacity=capacity)
    print("scr")
    print(scr)
    thr = Theatre.objects.get(name=theater)
    print("thr")
    print(thr)
    print("strt")
    print(start_time)
    show = Showtime.objects.get(movie=mov, screen=scr, theatre=thr, start_time=start_time)
    print("show")
    print(show)
    
    print(mov)
    print(scr)
    print(thr)
    print(show)
    
    
    user_name= json.loads(request.body)['user']
    user = User.objects.get(username=user_name)
    
    order_id= json.loads(request.body)['order']
    seats= json.loads(request.body)['seats']
    data={
        'showtime': show,
        'user': user,
        'seats': seats,
        'payment_id': payment_id,
        'order_id': order_id,
        'amount':price
    }
    print(data)
    
    book = Booking.objects.create(**data)
    return HttpResponse('Booking added successfully')


def getseats(request):
    if request.method == 'POST':
        movieName= json.loads(request.body)['movieName']
        theater= json.loads(request.body)['theater']
        screen= json.loads(request.body)['screen']
        startTime= json.loads(request.body)['startTime']
        capacity= json.loads(request.body)['capacity']
        # selectedDate= json.loads(request.body)['selectedDate']
        selectedDate= '2023-05-01'
        # movieLoc= json.loads(request.body)['movieLoc']
        # showtime= json.loads(request.body)['showtime']
        start_time_str=selectedDate + ' ' + startTime

    # Parse the combined string and create a datetime object
        start_time = datetime.strptime(start_time_str, '%Y-%m-%d %I:%M %p')
        print(type(startTime))
        print(startTime)
        print(selectedDate)
        print(start_time)
        print(type(start_time))
        print(capacity)
        
        # show = Showtime.objects.get(movie=movieName,screen=screen,theatre=theater,start_time=start_time)
        mov = Movie.objects.get(name=movieName)
        scr = Screen.objects.get(name=screen,capacity=capacity)
        thr = Theatre.objects.get(name=theater)
        show = Showtime.objects.get(movie=mov, screen=scr, theatre=thr, start_time=start_time)
        book = Booking.objects.filter(showtime=show)  # Use filter instead of get for multiple objects
        # seats = []
        # for bo in book:
        #     seats.append(bo.seats)
        seats = []
        for bo in book:
           seat_codes = re.findall(r'\w+', bo.seats)
           seats.extend(seat_codes)
        print(seats)
        # print(seats)

       
        return JsonResponse({'seats': seats})
    else:
        return JsonResponse({'status': 'False', 'error': 'Invalid request method'})
  



# def showtime(request):
#     if request.method == 'POST':
#         print(request.POST)
        
#         # movie_name = request.POST.get('movieName')
#         # selected_date = request.POST.get('selectedDate')
#         # movie_loc = request.POST.get('movieLoc')
#         movie_name = 'jaws'
#         selected_date = '2023-05-01'
#         movie_loc = 'mananthavady'
#         print(selected_date)
#         print(movie_loc)
#         # Do something with the data
#         # ...

#         return JsonResponse({'status': 'success'})
#     else:
#         return JsonResponse({'status': 'error', 'message': 'Invalid request method'})




# original review sort
# def reviewsort(request):
#     if request.method == 'POST':
#         # movie_name = request.POST.get('movie_name')
#         movie_name= json.loads(request.body)['movieName']
#         print(movie_name)

#         try:
#             movie = Movie.objects.get(name=movie_name)
#             reviews = UserReview.objects.filter(movie=movie)
#             count=0
#             p=n=m=0
#             sum=0
#             average=0
#             review_list = []
#             for review in reviews:
#                 review_data = {
#                     'user': review.user.username,
#                     'score': review.score,
#                     'review': review.review
#                 }
#                 if(review.score<40):
#                     n=n+1
#                 elif(review.score>=40 and review.score<70 ):
#                     m=m+1
#                 else:
#                     p=p+1
#                 count=count+1
#                 sum=sum+review.score
#                 review_list.append(review_data)
#             if(count>0):
#                 average=sum/count
#                 average=round(average)
#             print(review_list)
#             return JsonResponse({'status': 'True', 'review': review_list, 'average': average, 'count': count, 'pos': p, 'mix': m, 'neg': n})
#         except Movie.DoesNotExist:
#             return JsonResponse({'status': 'False', 'error': 'Movie not found'})
#     else:
#         return JsonResponse({'status': 'False', 'error': 'Invalid request method'})

# review sortwith nlp
def reviewsort(request):
    if request.method == 'POST':
        # movie_name = request.POST.get('movie_name')
        movie_name= json.loads(request.body)['movieName']
        # print(movie_name)
        movie = Movie.objects.get(name=movie_name)
        reviews = UserReview.objects.filter(movie=movie)
        # reviews = MovieReview.objects.filter(movie_id=movie_id)
    # Initialize the sentiment analyzer
        sid = SentimentIntensityAnalyzer()
     # Initialize counters for positive and negative reviews
        positive_count = 0
        negative_count = 0
        mid_count=0
        review_list=[]
        count=0
        sum=0
    # Loop through each review and perform sentiment analysis
        for review in reviews:
        # Get the text of the review
         review_data = {
                    'user': review.user.username,
                    'score': review.score,
                    'review': review.review
                }
         review_list.append(review_data)
         count=count+1
         sum=sum+review.score
         text = review.review
        # Perform sentiment analysis on the review text
         scores = sid.polarity_scores(text)

        # Determine if the review is positive or negative based on the compound score
         if scores['compound'] >= 0.05:
            positive_count += 1
            # print('positive',scores['compound'],review.review)
         elif scores['compound'] <= -0.05:
            negative_count += 1
            # print('negative',scores['compound'],review.review)
         else:
            mid_count+=1
            # print('none',scores['compound'],review.review)
             

    # Render the results in a template
         context = {
            'positive_count': positive_count,
            'negative_count': negative_count,
         }
        # print(review_list)
        if(count>0):
                average=sum/count
                average=round(average)
        return JsonResponse({'status': 'True', 'review': review_list,
             'average': average,'count':count, 'pos': positive_count,
               'mix': mid_count, 'neg': negative_count})
        if Movie.DoesNotExist:
         return JsonResponse({'status': 'False', 'error': 'Movie not found'})
    else:
        return JsonResponse({'status': 'False', 'error': 'Invalid request method'})



def submit_review(request):
    if request.method == 'POST':
        movie_name= json.loads(request.body)['movieName']
        # user_name = json.loads(request.body)['userName']
        user_name = json.loads(request.body)['userName']
        # movie_name = request.POST.get('movieName')
        # user_name = request.POST.get('userName')
        review = json.loads(request.body)['review']
        score = json.loads(request.body)['score']
   

        
        # Save review data to database
        print(review)
        print(movie_name)
        print(user_name)
        print(score)
        

        movie = Movie.objects.get(name=movie_name)
        user = User.objects.get(username=user_name)

        review_data = {
            'movie': movie,
            'user': user,
            'score': score,
            'review': review
        }

        review = UserReview.objects.create(**review_data)

        return JsonResponse({'status': "True"})
    else:
        return JsonResponse({'status': "False", 'error': 'Invalid request method'})



def showtime(request):
    selected_date_str = '2023-05-01'
    # selected_date_str = json.loads(request.body)['selectedDate']
    movie_loc = json.loads(request.body)['movieLoc']
    movie_name = json.loads(request.body)['movieName']
    print(selected_date_str)

    selected_date = datetime.strptime(selected_date_str, '%Y-%m-%d').date()
    theaters = Theatre.objects.filter(location=movie_loc)
    start_time = datetime.combine(selected_date, datetime.min.time())
    print(start_time)
    print(type(start_time))
    end_time = start_time + timedelta(days=1)
    showtimes = Showtime.objects.filter(
        movie__name=movie_name,
        start_time__gte=start_time,
        start_time__lt=end_time,
        theatre__in=theaters
    ).select_related('theatre', 'screen')

    # Create a list of dictionaries containing the theater name and its showtimes
    theater_showtimes = []
    for theater in theaters:
        theater_showtimes_for_movie = showtimes.filter(theatre=theater)
        if theater_showtimes_for_movie.exists():
            theater_dict = {
                'name': theater.name,
                'showtimes': []
            }
            for showtime in theater_showtimes_for_movie:
                theater_dict['showtimes'].append({
                    'screen': showtime.screen.name,
                    'start_time': showtime.start_time.strftime('%Y-%m-%d %H:%M:%S'),
                    'end_time': showtime.end_time.strftime('%Y-%m-%d %H:%M:%S'),
                    'capacity':showtime.screen.capacity
                })
                
            theater_showtimes.append(theater_dict)
        
    print(theater_showtimes)
    # Return the theater showtimes as a JSON response
    return JsonResponse({'status': 'success', 'theater_showtimes': theater_showtimes})



# # this is mAIN this works
# def showtime(request):
#     # if request.method == 'POST':
#         # movie_name = 'jaws'
#         selected_date_str = '2023-04-30'
#         # movie_loc = 'mananthavady'
#         # selected_date_str = json.loads(request.body)['selectedDate']
#         movie_loc = json.loads(request.body)['movieLoc']
#         movie_name = json.loads(request.body)['movieName']
        
#         selected_date = datetime.strptime(selected_date_str, '%Y-%m-%d').date()
#         print(selected_date)
#         print(movie_loc)
#         print(movie_name)
#         theaters = Theatre.objects.filter(location=movie_loc)
#         # Get the showtimes for the given movie and date, and filter by theater
#         start_time = datetime.combine(selected_date, datetime.min.time())
#         end_time = start_time + timedelta(days=1)
#         showtimes = Showtime.objects.filter(
#             movie__name=movie_name,
#             start_time__gte=start_time,
#             start_time__lt=end_time,
#             theatre__in=theaters
#         )

#         # Create a list of dictionaries containing the theater name and its showtimes
#         theater_showtimes = []
#         for theater in theaters:
#             theater_dict = {
#                 'name': theater.name,
#                 'showtimes': []
#             }
#             for showtime in showtimes.filter(theatre=theater):
#                 theater_dict['showtimes'].append({
#                     'screen': showtime.screen.name,
#                     'start_time': showtime.start_time.strftime('%Y-%m-%d %H:%M:%S'),
#                     'end_time': showtime.end_time.strftime('%Y-%m-%d %H:%M:%S')
#                 })
#             theater_showtimes.append(theater_dict)
#         print(theater_showtimes)
#         # Return the theater showtimes as a JSON response
#         return JsonResponse({'status': 'success', 'theater_showtimes': theater_showtimes})
        
        
    # else:
    #     return JsonResponse({'status': 'error', 'message': 'Invalid request method'})





def my_view(request):
    my_text='Hello article myvieew'
    # mum=Movie.objects.filter(name='jaws').first()
    # if mum is not None:
    #     my_t = mum.genre
    #     print(mum.genre)
    # else:
    #     my_t = "Unknown"
    # # my_text = my_text + " " + my_t
    return JsonResponse({'text': my_text})


def posternow(request):
    print(request.body)  # Add this line to check the value of request.body
    location = json.loads(request.body)['movieLoc']
    print(location)
    theatres = Theatre.objects.filter(location=location)
    print(theatres)
    # nowshowing_movies = Movie.objects.filter(theatres__in=theatres, availability='nowshowing').distinct()
    nowshowing_movies = Movie.objects.filter(showtime__theatre__location=location, availability='nowshowing').distinct()
    print(nowshowing_movies)
    

    data = {}
    for i, movie in enumerate(nowshowing_movies):
        data[f"obj{i}"] = {
            "name": movie.name,
            "genre": movie.genre,
            "image": movie.image.url if movie.image else None,
            "desc": movie.description,
            "lang":movie.language,
            "dir":movie.director,
            "url":movie.url,
        }
        print(movie.name)
    return JsonResponse({'movie': data})


def posterup(request):
    print(request.body)  # Add this line to check the value of request.body
    location = json.loads(request.body)['movieLoc']
    print(location)
    theatres = Theatre.objects.filter(location=location)
    print(theatres)
    # nowshowing_movies = Movie.objects.filter(theatres__in=theatres, availability='nowshowing').distinct()
    nowshowing_movies = Movie.objects.filter(showtime__theatre__location=location, availability='upcoming').distinct()
    print(nowshowing_movies)
    

    data = {}
    for i, movie in enumerate(nowshowing_movies):
        data[f"obj{i}"] = {
            "name": movie.name,
            "genre": movie.genre,
            "image": movie.image.url if movie.image else None,
            "desc": movie.description,
            "lang":movie.language,
            "dir":movie.director,
            "url":movie.url,
        }
        print(movie.name)
    return JsonResponse({'movie': data})





# our first step in displaying poster 
# def posternow(request):
#     my_text='error'
#     location = request.GET.get('selectedOption')
#     print(location)
#     theatres=Theatre.objects.filter(location=location)
    
#     mov=Movie.objects.all()
#     for the in theatres:
#         naam=the.name
#         print(naam)
#     # mov = Movie.objects.filter(name='avatar').values('name', 'genre','desc','image').first()
#     # # mov=Movie.objects.filter(name='jaws').first()
#     # if mov is not None:
#     #     # my_t = mov.genre
#     #     # print(mov.genre)
#     #     my_t = mov['genre']
#     #     print(mov['genre'])
#     # else:
#     #     my_t = "Unknown"
#     #     print("none")
#     # my_text = my_text + " " + my_t
#     # print(my_text)
#     # data = {
#     #     obj1: {'name': mov.name,'age': mov.genre,'email': mov.desc,'image':mov.image.url if mov.image else None,'image': mov.image,},
#     #     obj1: { name: 'John', age: 25 },
#     # }
#     data = {
#     #    'obj1': { 'name': 'John', 'age': 25 },
#     #    'obj2': { 'name': 'Jane', 'age': 30 },
#     #    'obj3': { 'name': 'Jack', 'age': 35 },
#         }
#     i=0
#     for movie in mov:
#      name=movie.name
#      genre=movie.genre
#      image=movie.image.url     
#      desc=movie.description
#     #  director=movie.director
#     #  print(movie.name)
#     #  print(movie.genre)
#      data[f"obj{i}"] = {"name": name, "genre": genre, "image": image, "desc": desc}
#      i=i+1

    
#     return JsonResponse({'movie': data})
#     # return JsonResponse({'text': mov.genre})




# def gettext(request):
#     # mov=Movienow.objects.filter(name='jaws').first()
#     print(mov.image)
#     data = {
#         'name': mov.name,
#         'age': mov.genre,
#         'email': mov.desc,
#         'image':mov.image.url if mov.image else None,
#         # 'image': mov.image,
#     }
#     print(data['image'])

#     return JsonResponse(data)
    # my_text = data.age 
    # return JsonResponse({'text': my_text})

# def my_view(request):
#     print("kittiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
#     data = {
#         'name': 'John Doe2',
#         'age': 30,
#         'email': 'johndoe@example.com'
#     }
#     return JsonResponse(data)



# def article_list(request):
#     articles = Article.objects.all()
#     data = {
#         'articles': [
#             {
#                 'title': article.title,
#                 'author': article.author,
#                 'content': article.content,
#             }
#             for article in articles
#         ]
#     }
#     return JsonResponse(data)



def poster(request):
    my_text='Hello'
    # mum=Movie.objects.all()
    mum=Movie.objects.filter(name='jaws').first()
    if mum is not None:
        my_t = mum.genre
        print(mum.genre)
    else:
        my_t = "Unknown"
    # my_text = my_text + " " + my_t
    return JsonResponse({'text': mum})



# main content
# # Get the theaters that are located in the given area
#         theaters = Theatre.objects.filter(location=movie_loc)

#         # Get the showtimes for the given movie and date, and filter by theater
#         showtimes = Showtime.objects.filter(
#             movie__name=movie_name,
#             start_time__date=selected_date,
#             theatre__in=theaters
#         )

#         # Create a list of dictionaries containing the theater name and its showtimes
#         theater_showtimes = []
#         for theater in theaters:
#             theater_dict = {
#                 'name': theater.name,
#                 'showtimes': []
#             }
#             for showtime in showtimes.filter(theatre=theater):
#                 theater_dict['showtimes'].append({
#                     'screen': showtime.screen.name,
#                     'start_time': showtime.start_time.strftime('%Y-%m-%d %H:%M:%S'),
#                     'end_time': showtime.end_time.strftime('%Y-%m-%d %H:%M:%S')
#                 })
#             theater_showtimes.append(theater_dict)
#         # print(theater_showtimes)
#         # Return the theater showtimes as a JSON response
#         return JsonResponse({'status': 'success', 'theater_showtimes': theater_showtimes})