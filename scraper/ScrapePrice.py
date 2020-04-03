import numpy as np
import pandas as pd
from bs4 import BeautifulSoup
import requests
import re
import json

amazon_url = 'https://www.amazon.com/s?k='

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
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0',
    })
    page = requests.get(URL, headers=headers)
    if page.status_code == 200:
        return page
    else:
        return None

def scrape_price(page):
    soup = BeautifulSoup(page.content)
    prices = []
    for p in soup.findAll('span', {"class": "a-size-medium a-color-price header-price"}):
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
        book_page = get_page(top_link)
        price = scrape_price(book_page)
        return price

if __name__ == "__main__": 
    s = ScrapePrice()
    print(s.get_price("Artificial Intelligence A Modern Approach"))
    