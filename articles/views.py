from django.shortcuts import render
from .models import Movie

from .models import Theatre
from .models import Showtime
from .models import Screen

from django.http import JsonResponse
from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import TemplateView
from django.http import JsonResponse

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
# import nltk
# nltk.download('vader_lexicon')

# from nltk.sentiment.vader import SentimentIntensityAnalyzer

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


# @csrf_exempt

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
    print("sthelam",movie_loc)

    selected_date = datetime.strptime(selected_date_str, '%Y-%m-%d').date()
    theaters = Theatre.objects.filter(location=movie_loc)
    print("thiyeter",theaters)
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





def my_view(request):
    my_text='it reaches backend '
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
    data = json.loads(request.body)['movieLoc']
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
        }
        print(movie.name)
    return JsonResponse({'movie': data})
   

    # # data=data+" aanneey"
    # return JsonResponse({'movie location  receive check': data})


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
        }
        print(movie.name)
    return JsonResponse({'movie': data})
    # my_text='it reaches posterup '
    # return JsonResponse({'text': my_text})




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


