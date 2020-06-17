import requests
from string import Template

for i in range(1, 732):
    url = 'https://superheroapi.com/api/3521494294562439/'
    url = url + str(i) + "/image"
    r = requests.get(url)
    print(r.json())
    with open('heroimages.json', 'a') as myfile:
        myfile.write(str(r.json()))
        myfile.write(',\n')
