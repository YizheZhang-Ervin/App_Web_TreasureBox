# Dev Treasure Box  
   
## Infrastructure  
Front End: Vue + ElementUI + Axios + Echarts  
Back End: Flask RESTful + Sqlite  
  
## Features  
### Frontend  
- index页面  
title Clock if page Visible(2 kinds of clock)  
Mouse Position  
get latitude and longitude  
Notification  
prevent contextmenu and f12    
CSS3 Animation  
  
- terminal页面  
html  
sql  
js  
python  
axios communication with backend  
  
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
  
- parameters页面  
Browser Parameters  
  
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
  