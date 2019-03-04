from flask import Flask, render_template, request, session, url_for, redirect
import data_manager
import hash
import session

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def main():
    if request.method == 'POST':
        url = 'https://swapi.co/api/planets'
        data = data_manager.get_api_data(url)
        username = session['username']
        return render_template('index.html', data=data, username=username)
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


@app.route('/registered', methods=['GET', 'POST'])
def registration():
    if request.method == 'POST':
        url = 'https://swapi.co/api/planets'
        data = data_manager.get_api_data(url)
        username = request.form['username']
        password = hash.hash_password(request.form['password'])
        new_user = {'username': username, 'password': password}
        data_manager.add_user(new_user)
        return render_template('registration.html', user=username, data=data)
    return redirect(url_for('main'))


if __name__ == '__main__':
    app.run(debug=True)
