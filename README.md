# Dev Treasure Box  
   
_____
  
## Infrastructure  
Front End: Vue + ElementUI + Axios + Echarts  
Back End: Flask RESTful + Sqlite  
Deployment: uWSGI + Nginx  
   
_____
  
## Features  
### Frontend  
- index页面  
title Clock if page Visible(2 kinds of clock)  
Mouse Position + Current Element    
get latitude and longitude  
Notification  
prevent contextmenu and f12    
CSS3 Animation  
  
- terminal页面  
html  
sql  
js  
python  
linux  
axios communication with backend sqlite  
  
- Visualization页面  
灯烛图-见InfoBlog    
scatter3d-见SharingBike  
折线图-见InfoBlog    
地图(World/China)  
  
- Media页面  
GetScreenShot  
GetMedia + Take Photo  
Video/Embed drag + drop  
Embed标签 pdf/excel/ppt  
Record audio  
Speech Recognition(SpeechToWords)  
Translator  
Face Recognition  
WordsToSpeech  
  
- parameters页面  
Browser Parameters  
  
- FrontEnd Storage  
基本: cookie / session  
离线存储: Application Cache / cache Storage  
本地存储: local Storage / session Storage / web Storage Cache  
库存储: web SQL / indexed DB
其他: 浏览器缓存  
    强缓存(200):Expires & cache-control  
    协商缓存(304): Last-Modified & If-Modified-Since & Etag & If-None-Match  
  
- Advanced功能  
web Workers  
webSocket  
文件处理相关  
   
_____
  
## Frontend: Vue  
if not use backend: open liver server http://127.0.0.1:5500/frontend/index.html  
   
_____
  
## Backend: Flask 
### Libs
pip install Flask_RESTful  
pip install Flask_Cors  
pip install Flask  
  
### Backend Management
python -m flask run  
  
### Dependency List
Virtual Env libs: pip freeze > requirements.txt  
Dependency libs: pipreqs ./  
pip install -r requirements.txt  
   
_____
  
## Developing Run  
index.html  
workon env_develop or source ./activate  
cd backend > pip install -r requirements.txt  
python -m flask run  
   
_____
  
## Deployment Run 
### Linux虚拟环境
- home/ervin/.bashrc中
export WORKON_HOME=$HOME/Envs  
source /home/ervin/.local/bin/virtualenvwrapper.sh  
  
- 安装  
pip install virtualenv virtualenvwrapper  
export WORKON_HOME=~/Envs  #设置环境变量  
mkdir -p $WORKON_HOME #创建虚拟环境管理目录  
find / -name virtualenvwrapper.sh #找到virtualenvwrapper.sh的路径  
source 路径 #激活virtualenvwrapper.sh  
  
- 创建  
mkvirtualenv envXX # 创建虚拟环境  
mkvirtualenv -p python3.4 envXX  # 创建指定解释器的虚拟环境  
workon envXX # 启动虚拟环境 
deactivate # 退出虚拟环境  
rmvirtualenv envXX # 删除虚拟环境  

### uWSGI  
flaskapp.ini放在和app.py同级目录即可  
    
- 安装  
pip install uWSGI  
  
- 用配置文件启动  
uwsgi --ini /home/ervin/flaskweb/flaskapp.ini  
  
- 用命令启动    
uwsgi --http 0.0.0.0:8080 --wsgi-file app.py --callable app --master  
  
### Nginx    
放入/etc/nginx/sites-enabled/flaskapp.conf  
sudo touch flaskapp.conf    
sudo chmod 666 flaskapp.conf   
  
- 安装  
sudo apt-get install nginx  
  
- 启动  
service nginx restart  
  
- 测试  
nginx -t  
  
- 关闭nginx  
nginx  -s quit #网上的关闭命令通常不好用，网站还能上去，我使用的是杀死master进程的方式  
ps -ef | grep nginx   #查看nginx所有的进程，查看master 的进程pid   
kill -quit pid    #杀死master进程的pid，nginx被完全关闭，再次输入网站url ，发现网站已经被关闭  
  