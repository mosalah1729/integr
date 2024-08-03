from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import TemplateView
from django.http import JsonResponse
from .models import Movieup
from .models import Movienow
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import QueryDict
import json
from django.contrib.auth.models import User
from django.contrib import auth
from django.contrib.auth import login
from django.contrib import messages

# class ReactAppView(TemplateView):
#     template_name = 'index.html'

from django.shortcuts import render
from .models import Movienow

def movie_detail(request, pk):
    movie = Movienow.objects.get(pk=pk)
    context = {'mov': movie}
    return render(request, 'myapp/movie_detail.html', context)


def index(request):
    return render (request,'index.html')

def gettext(request):
    mov=Movienow.objects.filter(name='jaws').first()
    print(mov.image)
    data = {
        'name': mov.name,
        'age': mov.genre,
        'email': mov.desc,
        'image':mov.image.url if mov.image else None,
        # 'image': mov.image,
    }
    print(data['image'])

    return JsonResponse(data)
    # my_text = data.age 
    # return JsonResponse({'text': my_text})

def hello(request):
    my_text='Hello  saadha'
    # mov=Movie.objects.filter(name='jaws').first()
    print(my_text)
    # if mov is not None:
    #     my_t = mov.genre
    #     print(mov.genre)
    # else:
    #     my_t = "Unknown"
    # my_text = my_text + " " + my_t
    return JsonResponse({'text': my_text})

@csrf_exempt
# def my_api_endpoint(request):
#     if request.method == 'POST':
#         data = request.POST.get('myData')
#         print(request.POST) # Debugging line
#         query_params = QueryDict(request.body)
#         # data = query_params.get('myData')
#         # print(data)
#         # data= data + "nte ND"
#         # Do something with the data
#         response_data = {'status': 'ok'}
#         # return JsonResponse(response_data)
#         return JsonResponse({'status': f'Hi {data}!'})
#     else:
#         response_data = {'error': 'Invalid request method'}
#         return JsonResponse(response_data, status=405)
def my_api_endpoint(request):
    if request.method == 'POST':
        data = json.loads(request.body)['myData']
        # print(data) # Debugging line
        data= data + "nte ND"
        response_data = {'status': f' {data}!'}
        return JsonResponse(response_data)
    else:
        response_data = {'error': 'Invalid request method'}
        return JsonResponse(response_data, status=405)


def signup(request):
    if request.method == 'POST':
        email = json.loads(request.body)['email']
        password1 = json.loads(request.body)['pass1']
        password2 = json.loads(request.body)['pass2']
        if password1==password2:
            if User.objects.filter(username=email).exists():
                response_data = {'status': f' email already exists!'}
                return JsonResponse(response_data)
            else:
                user=User.objects.create_user(username=email,password=password1)
                user.save();
                print("user created")
                response_data = {'status': f' user created!'}
                return JsonResponse(response_data)
        else : 
            response_data = {'status': f' password not matching!'}
            return JsonResponse(response_data)
            #  return redirect('register')




        
    else:
        response_data = {'error': 'Invalid request method'}
        return JsonResponse(response_data, status=405)





# def signin(request):
#     if request.method == 'POST':
        # email = json.loads(request.body)['email']
        # password = json.loads(request.body)['pass']
#         print(email)
#         user=auth.authenticate(username=email,password=password)
#         print(user)
#         print(email)
#         if user is not None:
#             # login(request,user)
#             print(email)
#             auth.login(request,user)
#             response_data = {'status': f' user logged in!'}
#             return JsonResponse(response_data)
#         else:
#             response_data = {'status': f' invalid credential!'}
#             return JsonResponse(response_data)
#     else:
#         response_data = {'error': 'Invalid request method'}
#         return JsonResponse(response_data, status=405)

def signout(request):
    if request.method == 'POST':
        auth.logout(request)
        response_data = {'status': 'logged out', 'message': 'User logged out!'}
        return JsonResponse(response_data)
    else:
        response_data = {'status': 'error', 'message': 'Invalid request method!'}
        return JsonResponse(response_data, status=405)  

def signin(request):
    if request.method == 'POST':
        # email = request.POST.get('email')
        # password = request.POST.get('password')
        email = json.loads(request.body)['email']
        password = json.loads(request.body)['pass']
        user = auth.authenticate(username=email, password=password)
        print(user)
        print("user is created in django view")
        if user is not None:
            auth.login(request, user)
            response_data = {'status': email, 'message': 'User logged in!', 'user_email': email}
            return JsonResponse(response_data)
        else:
            response_data = {'status': 'Invalid credentials!', 'message': 'Invalid credentials!'}
            return JsonResponse(response_data)
    else:
        response_data = {'status': 'error', 'message': 'Invalid request method!'}
        return JsonResponse(response_data, status=405)
        
def posternow(request):
    my_text='Hello'
    mov=Movienow.objects.all()
    
    data = {
   
        }
    i=0
    for movie in mov:
     name=movie.name
     genre=movie.genre
     image=movie.image.url     
     desc=movie.desc
     print(movie.name)
  
     data[f"obj{i}"] = {"name": name, "genre": genre, "image": image, "desc": desc}
     i=i+1

    
    return JsonResponse({'movie': data})
    
       
def posterup(request):
    my_text='Hello'
    mov=Movieup.objects.all()
    # mov = Movie.objects.filter(name='avatar').values('name', 'genre','desc','image').first()
    # # mov=Movie.objects.filter(name='jaws').first()
    # if mov is not None:
    #     # my_t = mov.genre
    #     # print(mov.genre)
    #     my_t = mov['genre']
    #     print(mov['genre'])
    # else:
    #     my_t = "Unknown"
    #     print("none")
    # my_text = my_text + " " + my_t
    # print(my_text)
    # data = {
    #     obj1: {'name': mov.name,'age': mov.genre,'email': mov.desc,'image':mov.image.url if mov.image else None,'image': mov.image,},
    #     obj1: { name: 'John', age: 25 },
    # }
    data = {
    #    'obj1': { 'name': 'John', 'age': 25 },
    #    'obj2': { 'name': 'Jane', 'age': 30 },
    #    'obj3': { 'name': 'Jack', 'age': 35 },
        }
    i=0
    for movie in mov:
     name=movie.name
     genre=movie.genre
     print(movie.name)
     data[f"obj{i}"] = {"name": name, "genre": genre}
     i=i+1

    
    return JsonResponse({'movie': data})
    # return JsonResponse({'text': mov.genre})



        
    





