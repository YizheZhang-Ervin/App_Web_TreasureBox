import sys
sys.path.append("Backend/")

from flask import Flask, jsonify, render_template, request
from flask_restful import Api,Resource,reqparse
from flask_cors import CORS
from flask import g
import sqlite3
from contextlib import closing

from APIs import python,image,audio

# Initialize Flask
app = Flask(__name__,static_folder='../Frontend',template_folder='../Frontend',static_url_path="")
api = Api(app)

# Cross Domain
cors = CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# parse parameters
parser = reqparse.RequestParser()
parser.add_argument('key', type=str)

# database
DATABASE = 'Backend/DB/testDB.db'
# 初始化模式: 只需使用一次
def init_db():
    with closing(connect_db()) as db:
        with app.open_resource('Backend/DB/schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()
    # with app.app_context():
    #     db = connect_db()
    #     with app.open_resource('schema.sql', mode='r') as f:
    #         db.cursor().executescript(f.read())
    #     db.commit()

# 连接库
def connect_db():
    return sqlite3.connect(DATABASE)

@app.before_request
def before_request():
    g.db = connect_db()

@app.teardown_request
def teardown_request(exception):
    if hasattr(g, 'db'):
        g.db.close()

# 插入
def insert(id,testvalue):
    sql = "insert into test values (?, ?)"
    conn = g.db
    cursor = conn.cursor()
    try:
        cursor.execute(sql, (id,testvalue))
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise TypeError("insert error:{}".format(e))

# 查询
def query_db(query, args=(), one=False):
    cur = g.db.execute(query, args)
    rv = [dict((cur.description[idx][0], value)
               for idx, value in enumerate(row)) for row in cur.fetchall()]
    return (rv[0] if rv else None) if one else rv
# 多个结果使用
# for user in query_db('select * from users'):
# 单个结果使用
# user = query_db('select * from users where username = ?',[the_username], one=True)

# Basic Route
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        return render_template('index.html')
    elif request.method == 'POST':
        key = request.args.get('key', '')
        return render_template('index.html', data=key)

# RESTful API Route
# 路由传参
class jsonAPI(Resource):
    # http://127.0.0.1:5000/api/值
    # terminal sql
    def get(self,key):
        # try:
        rst = query_db('select * from test')
        # 取第一行
        rst2 = [rst[0]["id"],rst[0]["testvalue"]]
        jsonObj = {"result":rst2,'function':1}
        return jsonify(jsonObj)
        # except Exception:
        #     return jsonify({"error":"error"})
    
    # http://127.0.0.1:5000/api/值
    # 传{"key":"值"}
    # def post(self,key):
    #     try:
    #         args = parser.parse_args()
    #         key = eval(args['key'])
    #         jsonObj = {"result":key,'function':1}
    #         return jsonify(jsonObj)
    #     except Exception:
    #         return jsonify({"error":"error"})

api.add_resource(jsonAPI, '/api/<key>')

api.add_resource(python.jsonAPI2, '/api/')

api.add_resource(audio.AudioAPI, '/api/audio/')

api.add_resource(image.ImageAPI, '/api/image/')


