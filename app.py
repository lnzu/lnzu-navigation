import sys,os

sys.path.append('./utils/')
sys.path.append('./utils/lnzupy/')

from utils.lnzupy import fileos
from utils import datas
from utils import config
from utils import dbhelper

from flask import Flask
from flask import make_response
from flask import request
from flask import render_template
import yaml
import re

app=Flask(__name__)

@app.route('/',methods=['GET', 'POST'])
def index():
    ck = request.cookies
    title=config.getSiteTitle()
    sites = datas.getAllSiteFormat()
    
    #处理get请求
    if request.method == 'GET':
        
        if 'cookie' in ck:
            if ck['cookie']==datas.getLocalCookie():
                return render_template('index.html',title=title,sites=sites)
            else:
                return render_template('login.html',title=title)
        else:
            return render_template('login.html',title=title)
    
    #处理post请求      
    elif request.method == 'POST':
        user = request.form.get('user')
        password = request.form.get('password')
        loginout = request.form.get('login_out')
        
        #这是登出处理    
        if loginout == 'True':
            
            if ck['cookie']==datas.getLocalCookie():
                resp = make_response(render_template('login.html',title=title))
                datas.setLocalCookie()
                resp.set_cookie('cookie','none',0)
                
                return resp
            else:
                return "请勿攻击ok?"
        #这是登陆处理
        else:
            #用户名和密码都正确时响应登陆
            if user==config.getUserName() and password==config.getUserPasswd():
                
                resp = make_response(render_template('index.html',title=title,sites=sites))
                datas.setLocalCookie()
                resp.set_cookie('cookie',datas.getLocalCookie(),config.getOnlineTime())
                
                return resp
            #否则返回密码或用户名错误
            else:
                return render_template('login.html',erro='密码或用户名错误',title=title)
            



@app.route('/delete',methods=['GET','POST'])
def deleteSite():
    if request.method == 'POST':
        id = request.form.get('id')
        
        dbhelper.delData(int(id))
        
        return '删除成功'

                
@app.route('/add',methods=['GET','POST'])
def add():
    if request.method == 'POST':
        title = request.form.get('title')
        link = request.form.get('link')
        icon = request.form.get('icon')
        dbhelper.insertData(title,link,icon)
        return '添加成功'
        


@app.route('/update',methods=['GET','POST'])
def update():
    if request.method == 'POST':
        id = request.form.get('id')
        title = request.form.get('title')
        link = request.form.get('link')
        icon = request.form.get('icon')
        
        dbhelper.upData(id,title,link,icon)
        return '更新成功'

                                                                        
#过滤器返回icon类型
def getIconType(icon):
    if re.match(r'<svg',icon):
        return 'svg'
    elif re.match(r'(http|https):\/\/.*\.(img|png|jpeg)',icon):
        return 'img'
    elif re.match(r'\/static\/',icon):
        return 'img'
    else:
        return 'text'

app.add_template_filter(getIconType,'getType')

#dbhelper.delTable()
#print(dbhelper.querAll())

if __name__ =='__main__':
    pass
    app.run('127.0.0.1',5000)
