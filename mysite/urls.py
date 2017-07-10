"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.contrib import admin

from mysite.views import hello
from mysite.views import clock
from mysite.views import greeting
from mysite.views import respond_with_random_quote
from mysite.views import respond_with_tpb_quote

import urllib
import urllib.request
import re

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^hello/$', hello),
    url(r'^clock/', clock),
    url(r'^greeting/$', greeting),
    url(r'newrandom/$', respond_with_random_quote),
    url(r'newtpb/$', respond_with_tpb_quote)
]