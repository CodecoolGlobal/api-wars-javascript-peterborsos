import data_connection
import requests
import json


def get_api_data(url):
    api_wars_data = requests.get(url).json()
    return api_wars_data



@data_connection.connection_handler
def get(cursor):
    cursor.execute("""
                    SELECT * FROM 
                    """)
    result = cursor.fetchall()
    return result

