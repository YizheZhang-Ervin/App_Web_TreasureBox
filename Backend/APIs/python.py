from flask_restful import Resource,reqparse
from flask import jsonify, request
import os

# parse parameters
parser = reqparse.RequestParser()
parser.add_argument('key', type=str)

# 问号传参
class jsonAPI2(Resource):
    # http://127.0.0.1:5000/api/?pkg=值
    # terminal python 单行
    # terminal python file (接收前端字符串"class Run:\n  def run():\n    ")
    def get(self):
        try:
            pkg = request.args.get("pkg","")
            # 单行代码
            jsonObj = {"result":eval(pkg),'function':2}

            # # 多行代码
            # # 写入文件
            # f = open(f'Coding/online_codes.py', 'w+')
            # f.write(key)
            # f.close()
            # # 重新导入文件中函数
            # import Coding.online_codes as oc
            # reload(oc)
            # # 返回运行结果
            # temp = oc.Run.run()
            # jsonObj = {"result":temp,'function':2}

            return jsonify(jsonObj)
        except Exception:
            return jsonify({"error":"error"})
    
    # http://127.0.0.1:5000/api/
    # 传{"key":"值"}
    # terminal linux
    def post(self):
        try:
            args = parser.parse_args()
            key = eval(args['key'])
            status = os.popen(key)
            jsonObj = {"result":status.read(),'function':2}
            return jsonify(jsonObj)
        except Exception:
            return jsonify({"error":"error"})