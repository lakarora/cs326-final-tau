import numpy as np
from bs4 import BeautifulSoup
import requests
import re
import json
import random
from flask import Flask
from flask import jsonify
import time

amazon_url = 'https://www.amazon.com/s?k='
user_agents = ['Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
               'MMozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0',
               'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393'
]

def get_top_link(page):
    soup = BeautifulSoup(page.content)
    html = str(soup.text)
    links = []
    for link in soup.findAll('a', {"class": "a-link-normal a-text-normal"}):
        links.append(link.get('href'))
    link = 'https://www.amazon.com' +links[1]

    return link

def get_page(URL):
    headers = requests.utils.default_headers()
    headers.update({
        'User-Agent': user_agents[random.randint(0,2)],
        'Referer': 'https://www.google.com/'
    })
    page = requests.get(URL, headers=headers)
    if page.status_code == 200:
        return page
    else:
        return None

def scrape_price(page):
    soup = BeautifulSoup(page.content)
    prices = []
    for p in soup.findAll('span', {"class": ["a-size-medium a-color-price header-price",'a-size-medium a-color-price offer-price a-text-normal']}):
        prices.append(p)
    price = re.findall("[0-9]+.[0-9]+", str(prices[0]))
    return float(price[0])

class ScrapePrice:
    def get_price(self, title):
        query = title.replace(' ', '+')
        URL = amazon_url + query +'&page=1'
        page = get_page(URL)
        top_link = get_top_link(page)
        print(top_link)
        time.sleep(.1)
        book_page = get_page(top_link)
        price = scrape_price(book_page)
        return price

app = Flask(__name__)

@app.route("/price/<param>")
def get_price(param):
    s = ScrapePrice()
    print(param)
    return jsonify(amazon_price=s.get_price(str(param))) 

if __name__ == '__main__':
    app.run()
