import sqlite3

con = sqlite3.connect('site.db',check_same_thread=False)
cur = con.cursor()


table_name = 'site'

'''
id
title
link
icon
'''


def __init__():
    sql = '''create table if not exists %s(
        id integer primary key autoincrement,
        title text,
        link text,
        icon text
    ) 
    '''%(table_name)
    cur.execute(sql)    

__init__()

def insertData(title,link,icon):
    sql = f'''insert into {table_name}(title,link,icon) values("{title}","{link}",'{icon}')'''
    cur.execute(sql)
    con.commit()

def querAll():
    sql = f'select * from {table_name}'
    cur.execute(sql)
    data = cur.fetchall()
    return data
    
def delData(id):
    sql = f'delete from {table_name} where id={id}'
    cur.execute(sql)
    cur.execute(f'update sqlite_sequence set seq=0 where name="{table_name}"') 
    con.commit()

def upData(id,title,link,icon):
    sql = f'''update {table_name} set title="{title}",link="{link}",icon='{icon}' where id={id}'''
    cur.execute(sql)
    con.commit()
    
def delTable():
    sql = f'drop table {table_name}'
    cur.execute(sql)
    con.commit()
    __init__()
    

