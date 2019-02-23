import data_connection
import requests
import json


def get_api_data():
    api_wars_data = requests.get('https://swapi.co/api/planets').json()
    return api_wars_data

def get_previous_data():
    previous_data = requests.get('https://swapi.co/api/planets').json


@data_connection.connection_handler
def get(cursor):
    cursor.execute("""
                    SELECT * FROM 
                    """)
    result = cursor.fetchall()
    return result

