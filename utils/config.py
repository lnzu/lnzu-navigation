import yaml
from lnzupy import fileos

def __getConfig():
    return yaml.load(fileos.readFile('config.yaml'),Loader=yaml.SafeLoader)

def getUserName():
    return __getConfig()['user']['name']
    
def getUserPasswd():
    return __getConfig()['user']['passworld']
    
    
def getOnlineTime():
    return __getConfig()['user']['online_time']

def getSiteTitle():
    return __getConfig()['site']['title']
