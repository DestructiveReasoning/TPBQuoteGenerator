import datetime

from django.http import HttpResponse
from django.http import JsonResponse
from django.shortcuts import render
from django.shortcuts import render_to_response
from django.template import Context, loader

from mysite.scripts.tpbquotes import get_quotes

from random import randint

quotes = []

def hello(request):
    return HttpResponse("Hello, Newman")

def clock(request):
    now = datetime.datetime.now()
    html = "<html><body><h3>Patek Philippe</h3><h4>Geneve</h4><h2>%s</h2></body></html>" % now
    return HttpResponse(html)

def respond_with_tpb_quote(request):
    global quotes
    if(len(quotes) == 0): 
        quotes = get_quotes("https://en.wikiquote.org/wiki/Trailer_Park_Boys")

    randy = randint(0, len(quotes))
    return JsonResponse({'quote': quotes[randy][0], 'author': quotes[randy][1]})
