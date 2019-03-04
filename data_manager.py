from data_connection import connection_handler
import requests
from datetime import datetime
import json


def get_api_data(url):
    api_wars_data = requests.get(url).json()
    return api_wars_data


@connection_handler
def get(cursor):
    cursor.execute("""
                    SELECT * FROM 
                    """)
    result = cursor.fetchall()
    return result


@connection_handler
def add_user(cursor, new_user):
    new_user['reg_date'] = str(datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
    cursor.execute("""
                    INSERT INTO users (username, password, reg_date)
                    VALUES (%(username)s, %(password)s, %(reg_date)s); 
                    """, new_user)
