import requests
from bs4 import BeautifulSoup


def find_all_a_elements(url):
    response = requests.get(url)
    urls = []
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, "html.parser")
        a_elements = soup.find_all("a")
        for a in a_elements:
            href = a.get("href")
            if href and "https" not in href and len(href) > 20 and len(urls)<10:
                urls.append(f"{url}{href}")
    else:
        print(f"Failed to fetch URL: {url}")
    return urls


# Example usage
#url = "https://zdg.md"
#print(find_all_a_elements(url))
