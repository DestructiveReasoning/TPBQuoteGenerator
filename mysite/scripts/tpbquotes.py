import urllib
import urllib.request
import re

def get_quotes_html(url):
    f = urllib.request.urlopen(url)
    return f.read().decode('utf-8')

def get_quotes_list_html(html):
    return re.findall('<dd><b>[a-zA-Z!?., ]+</b>: [a-zA-Z0-9!?., ]+</dd>', html)

author_retriever = re.compile('<dd><b>([a-zA-Z!?., ]+)</b>')
quote_retriever = re.compile('<dd><b>[a-zA-Z!?., ]+</b>: ([a-zA-Z0-9!?., ]+)</dd>')

def get_quotes(url):
    html = get_quotes_html(url)
    quote_list = get_quotes_list_html(html)
    quotes = []
    for i in range(0, len(quote_list)):
        quotes.append((quote_retriever.findall(quote_list[i])[0], author_retriever.findall(quote_list[i])[0]))
    return quotes

quotes = get_quotes("https://en.wikiquote.org/wiki/Trailer_Park_Boys")
print ("\"" + str(quotes[6][0]) + "\" - " + str(quotes[6][1]))
