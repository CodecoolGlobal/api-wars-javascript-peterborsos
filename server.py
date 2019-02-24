from flask import Flask, render_template, url_for, request, redirect
import data_manager

app = Flask(__name__)


@app.route('/')
def main():
    url = 'https://swapi.co/api/planets'
    data = data_manager.get_api_data(url)
    # tried to implement modal data with multiple api calls trough python but too slow..
    """
    planets = data['results']
    residents_list = []
    for planet in planets:
        for resident in planet['residents']:
            residents_list.append(data_manager.get_api_data(resident))
    """
    return render_template('index.html', data=data)


url = 'https://swapi.co/api/planets'
data = data_manager.get_api_data(url)
print(data)


if __name__ == '__main__':
    app.run(debug=True)
