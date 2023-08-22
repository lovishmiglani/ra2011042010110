from flask import Flask, request, jsonify
import requests
import asyncio
from urllib.parse import urlparse

app = Flask(_name_)


async def fetch_numbers(url):
    try:
        response = requests.get(url, timeout=0.5)
        response.raise_for_status()
        numbers = response.json().get("numbers", [])
        return numbers
    except (requests.exceptions.RequestException, ValueError):
        return []


async def collect_numbers(urls):
    tasks = [fetch_numbers(url) for url in urls]
    numbers_lists = await asyncio.gather(*tasks)
    all_numbers = [num for sublist in numbers_lists for num in sublist]
    unique_numbers = list(set(all_numbers))
    return sorted(unique_numbers)


@app.route('/numbers', methods=['GET'])
def get_numbers():
    urls = request.args.getlist('http://localhost:port/numbers?url=http://20.244.56.144/numbers/primes&url=http://20.244.56.144/numbers/fibo& url=http://20.244.56.144/numbers/odd')

    # Filter out invalid URLs
    valid_urls = [url for url in urls if urlparse(url).scheme in ['http', 'https']]

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    numbers = loop.run_until_complete(collect_numbers(valid_urls))

    return jsonify({"numbers": numbers})


if _name_ == '_main_':
    app.run(port=8008)
