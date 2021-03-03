# Dev Treasure Box  
   
## Infrastructure  
Front End: Vue + ElementUI + Axios + Echarts  
Back End: Flask RESTful + Sqlite  
  
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
灯烛图-见EZInfo  
scatter3d-见SharingBike  
折线图-见EZInfo  
地图(World/China)  
  
- Media页面  
GetScreenShot  
GetMedia + Take Photo  
Video/Embed drag + drop  
Embed标签 pdf/excel/ppt  
Record audio+Speech Recognition  
  
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
  
## Run  
index.html  
workon env_develop or source ./activate  
cd backend > pip install -r requirements.txt  
python -m flask run  
  
## Frontend: Vue  
open liver server http://127.0.0.1:5500/frontend/index.html  
  
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
  