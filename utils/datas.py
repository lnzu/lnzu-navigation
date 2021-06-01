from lnzupy import fileos
import config
import time
import base64
import os
import re
import random
import json
import dbhelper

    
def __getRadomCookie(user,passworld):
    n = str(int(time.time()))
    ra = random.randint(10000,1000000)
    n=user+str(ra)+passworld+n
    n= base64.b64encode(str(n).encode('utf-8'))
    n= base64.b64encode(str(n).encode('utf-8'))
    n= base64.b64encode(str(n).encode('utf-8'))
    
    return re.findall(r"b'(.*)'",str(n))[0]


def setLocalCookie():
    cookie=__getRadomCookie(config.getUserName(),config.getUserPasswd())
    
    online = config.getOnlineTime()
    
    dic = {
        "expires": int(time.time())+int(online),
        "cookie": cookie
    }
    
    fileos.writeFile(str(dic),'cookie.txt')
    
def getLocalCookie():
    str = fileos.readFile('cookie.txt')
    str = re.sub(r"'",'"',str)
    return json.loads(str)['cookie']
    

def getAllSiteFormat():
    site = {}
    sites = []
    s_site = dbhelper.querAll()
    
    for i in s_site:
        site['id']=i[0]
        site['title']=i[1]
        site['link']=i[2]
        site['icon']=i[3]
        
        sites.append(site)
        
        site = {}
        
    return sites
