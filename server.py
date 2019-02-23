from flask import Flask, render_template, url_for, request, redirect
import data_manager

app = Flask(__name__)


@app.route('/')
def main():
    data = data_manager.get_api_data()
    return render_template('index.html', data=data)


data = data_manager.get_api_data()
print(data)


if __name__ == '__main__':
    app.run(debug=True)
