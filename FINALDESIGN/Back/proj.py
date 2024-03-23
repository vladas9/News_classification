import requests
from scrape import *
import json


def scoring(url,text):
    headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
    }
    payload = [
        {
            "content": text,
            "language": "EMPTY"
        }
    ]

    response = requests.post(url, headers=headers, json=payload)

    if response.status_code == 200:
        print(response.json())
    else:
        print(f"Failed to send request. Status code: {response.status_code}")
    return response.json()


def entities(url,text):
    headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
    }
    payload = [
        {
            "content": text,
            "language": "EMPTY"
        }
    ]

    response = requests.post(url, headers=headers, json=payload)

    if response.status_code == 200:
        print(response.json())
    else:
        print(f"Failed to send request. Status code: {response.status_code}")
    return response.json()


def parse(url,url1):
    headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
    }
    payload = [
        {
            "content": url1,
            "language": "EMPTY"
        }
    ]

    response = requests.post(url, headers=headers, json=payload)

    if response.status_code == 200:
        print(response.json())
    else:
        print(f"Failed to send request. Status code: {response.status_code}")
    return response.json()


url_general = "https://zdg.md"


links = find_all_a_elements(url_general)

dict={"scoring":[],"entity":[]}

for link in links:
    text = parse('http://localhost:9191/rest/process',link)
    scoring_dic = scoring('http://localhost:8989/rest/process',text[0]["text"])
    entity_dic = entities('http://localhost:9090/rest/process',text[0]["text"])
    del entity_dic[0]["text"]
    dict["scoring"].append(scoring_dic)
    dict["entity"].append(entity_dic)
print(dict)    

with open("../data.json", "w") as outfile:
    json.dump(dict,outfile)