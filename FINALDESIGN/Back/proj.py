import requests
from flask import Flask, jsonify, request, Response
import json
from scrape import *
from flask_cors import CORS

app = Flask(__name__)
CORS(app)



def scoring(url, text):
    headers = {
        "accept": "application/json",
        "Content-Type": "application/json",
    }
    payload = [{"content": text, "language": "EMPTY"}]

    response = requests.post(url, headers=headers, json=payload)

    if response.status_code == 200:
        # print(response.json())
        return response.json()
    else:
        print(f"Failed to send request. Status code: {response.status_code}")


def entities(url, text):
    headers = {
        "accept": "application/json",
        "Content-Type": "application/json",
    }
    payload = [{"content": text, "language": "EMPTY"}]

    response = requests.post(url, headers=headers, json=payload)

    if response.status_code == 200:
        # print(response.json())
        return response.json()
    else:
        print(f"Failed to send request. Status code: {response.status_code}")


def parse(url, url1):
    headers = {
        "accept": "application/json",
        "Content-Type": "application/json",
    }
    payload = [{"content": url1, "language": "EMPTY"}]
    
    response = requests.post(url, headers=headers, json=payload)

    if response.status_code == 200:
        # print(response.json())
        return response.json()
    else:
        print(f"Failed to send request. Status code: {response.status_code}")


#@app.route("/", methods=["GET"])
def statistics():
    url_general = [
        "https://zdg.md/",
        "https://noi.md/",
        "https://tv8.md/",
        "https://www.digi24.ro/",
        "https://theins.ru/",
    ]
    links = {}
    dict = {}
    for url in url_general:
        links[url] = find_all_a_elements(url)
        dict[url] = {"scoring": 0}
    word_count = {}

    for key, link in links.items():
        sum = 0
        for l in link:
            try:

                text = parse("http://localhost:9191/rest/process", l)
                scoring_dic = scoring("http://localhost:8989/rest/process", text[0]["text"])
                # print(scoring_dic)
                entity_dic = entities("http://localhost:9090/rest/process", text[0]["text"])
                # print(entity_dic)
                del entity_dic[0]["text"]
                sum += scoring_dic[0]["score"]
                for i in range(len(entity_dic[0]["entities"])):
                    if entity_dic[0]["entities"][i]["entity"] not in word_count.keys() and entity_dic[0]["entities"][i]["type"]=="PERSON":
                        word_count[entity_dic[0]["entities"][i]["entity"]] = entity_dic[0]["entities"][i]["count"]
                    elif entity_dic[0]["entities"][i]["type"]=="PERSON":
                        word_count[entity_dic[0]["entities"][i]["entity"]] += entity_dic[0]["entities"][i]["count"]
            except:
                pass

            dict[key]["scoring"] = sum / len(link)
    max_word_count = {}
    for _ in range(5):
        max = 0
        key = ""
        for k,v in word_count.items():
            if max < v:
                max = v
                key = k
        max_word_count[key] = max
        del word_count[key]

    dict["word_count"]  = max_word_count
    print(dict)
    with open("data.json", "w") as outfile:
        json.dump(dict, outfile)
      
    # return jsonify(dict)


@app.route("/search", methods=["POST"])
def search():
    print("Hello")
    data = request.json
    url = data.get("URL")
    links = find_all_a_elements(url)
    # print(links)
    dict = {"scoring": None}

    word_count = {}
    for link in links:
        sum = 0
        try:
            text = parse("http://localhost:9191/rest/process", link)
            scoring_dic = scoring("http://localhost:8989/rest/process", text[0]["text"])
            # print(scoring_dic)
            entity_dic = entities("http://localhost:9090/rest/process", text[0]["text"])
            # print(entity_dic)
            del entity_dic[0]["text"]
            sum += scoring_dic[0]["score"]
            for i in range(len(entity_dic[0]["entities"])):
                if entity_dic[0]["entities"][i]["entity"] not in word_count.keys() and entity_dic[0]["entities"][i]["type"]=="PERSON":
                    word_count[entity_dic[0]["entities"][i]["entity"]] = entity_dic[0]["entities"][i]["count"]
                elif entity_dic[0]["entities"][i]["type"]=="PERSON":
                    word_count[entity_dic[0]["entities"][i]["entity"]] += entity_dic[0]["entities"][i]["count"]
        except:
            pass
    
        dict["scoring"] = sum / len(link)
    max_word_count = {}
    for _ in range(5):
        max = 0
        key = ""
        for k,v in word_count.items():
            if max < v:
                max = v
                key = k
        max_word_count[key] = max
        try:
            del word_count[key]
        except:
            pass

    dict["word_count"]  = max_word_count
    print(dict)
    return dict

app.run(debug=True)
# statistics()