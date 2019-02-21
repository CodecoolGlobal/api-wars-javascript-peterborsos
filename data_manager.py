import data_connection


@data_connection.connection_handler
def get(cursor):
    cursor.execute("""
                    SELECT * FROM 
                    """)
    result = cursor.fetchall()
    return result
