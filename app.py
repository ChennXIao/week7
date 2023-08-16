from flask import Flask, jsonify
from flask import request
from flask import redirect
from flask import json
from flask import render_template
from flask import session
from flask import url_for
import mysql.connector 
from secret import secret 
import requests


secret_key = secret.get('key')
cnt = mysql.connector.connect(
    user='root', 
    password=secret_key,
    host='127.0.0.1',
    database='website', 
)

cur = cnt.cursor(dictionary=True,buffered=True)

app = Flask(
        __name__,
        static_folder="static",
        static_url_path="/") 

app.secret_key = "wrerw"

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/signup',methods=["POST"])
def ver():

    name = request.form.get("name", "")
    account = request.form.get("account", "")
    password = request.form.get("password", "")
    signup = ("SELECT * FROM member WHERE username = %s;")
    cur.execute(signup, (account,))
    newmember = cur.fetchone()

    if newmember!=None:
        return redirect("/error?message=帳號已被註冊")
    else:
        data = (name,account,password)
        add_data = ("INSERT INTO member(name,username,password)VALUES(%s,%s,%s);")
        cur.execute(add_data,data)
        cnt.commit()
        return render_template("index.html")


# @app.route('/signin',methods=["POST"])
# def mem():
#     account = request.form.get("account", "")
#     password = request.form.get("password", "")

#     session["account"] = account
#     session["password"] = password

#     return redirect(url_for('member'))


@app.route("/api/member")
def api_member():
    
    username_api = request.args.get("username", "")
    api_member = ("SELECT * FROM member WHERE username= %s LIMIT 1;")
    cur.execute(api_member,(username_api,))
    member = cur.fetchone()
    response= {"data":{}}

    if member:
        session["name"] = member["name"] 
        for k, v in member.items():
            response["data"][k]=v
    else:
        response["data"] = None
        
    return jsonify(response)



@app.route("/api/member", methods = ["PATCH"])
def update_member():
    
    changed_name = request.json.get('name')

    if changed_name:
        api_Name = ("UPDATE member SET name = %s WHERE username = %s;")
        cur.execute(api_Name,(changed_name,session["account"]))
        cnt.commit()
        response = {"ok": True}
    else:
        response = {"error": True}

    return jsonify(response)


@app.route("/member")
def member():

    if "account" in session:
        account = session["account"] 
        get_name = ("SELECT name FROM member WHERE username= %s LIMIT 1;")
        cur.execute(get_name,(account,))
        member = cur.fetchone()
        name = member["name"]
        return render_template("member.html", user=name)
    else:
        return redirect(url_for('index'))



@app.route('/signin',methods=["POST"])
def mem():

    account = request.form.get("account", "")
    password = request.form.get("password", "")
    signin = ("SELECT name, username, password, id FROM member WHERE username= %s and password = %s LIMIT 1;")
    cur.execute(signin,(account,password))
    member = cur.fetchone()

    if member !=None:
        session["id"] = member["id"]
        session["name"] = member["name"]
        session["account"] = member["username"]
        session["password"] = member["password"]
        print(session)
        return redirect(url_for('member'))
    else:
        return redirect("/error?message=請輸入正確的帳號密碼")



@app.route("/error")
def error():
    message = request.args.get("message", "")
    return render_template("error.html", message=message)

@app.route("/signout")
def out():
    session.clear()
    return redirect(url_for('index'))
app.debug = True
app.run()


# @app.route('/signin',methods=["POST"])
# def mem():
#     account = request.form.get("account", "")
#     password = request.form.get("password", "")
#     signin = ("SELECT name, username, password, id FROM member WHERE username= %s and password = %s LIMIT 1;")
#     cur.execute(signin,(account,password))
#     member = cur.fetchone()
    
#     if member !=None:
        
#         session["id"] = member["id"]
#         session["name"] = member["name"]
#         session["account"] = member["username"]
#         session["password"] = member["password"]
#         print(session)
#         url_mem = f"/api/member?username={session['name']}" 

#         return redirect(url_mem)
#     else:
#         return redirect("/error?message=請輸入正確的帳號密碼")



# @app.route("/member")
# def member():
#     cur.execute("SELECT name, member_id,content FROM member INNER JOIN message ON member.id = message.member_id ORDER BY message.time DESC;")
#     data = cur.fetchall()

#     if "name" in session:
#         name = session["name"]
#         print(name)
#         return render_template("member.html", user=name,text=data)
#     else:
#         return redirect(url_for('index'))

# @app.route("/createMessage",methods=["POST"])
# def message():

#     id = session["id"]  
#     text = request.form.get("text","")

#     message = (id,text)
#     add_message = ("INSERT INTO message(member_id,content)VALUES(%s,%s);")
#     cur.execute(add_message,message)
#     cnt.commit()
#     return redirect(url_for('member'))

# @app.route("/deleteMessage",methods=["POST"])
# def me():
#     id = session["id"] 
#     del_message = (("DELETE FROM message WHERE member_id ='{}';").format(id))
#     cur.execute(del_message)
#     print("delete")
#     cnt.commit()
#     return redirect(url_for('member'))

# @app.route('/deleteMessage', methods=['POST'])
# def delete_message():
#     if request.is_json:
#         data = json.loads(request.data.decode('utf-8'))
#         message_id = data.get('message_id')

#         # Delete the message from the database
#         # Your code to connect to MySQL and delete the message

#         response_data = {'success': True}
#         return jsonify(response_data)
#     else:
#         print(request.is_json)
#         # Return a response indicating that the content type is not supported
#         response_data = {'error': 'Unsupported Media Type'}
#         return jsonify(response_data), 415  # 415 is the HTTP status code for Unsupported Media Type
    
# @app.route('/deleteMessage/<int:message_id>', methods=['GET', 'POST'])
# def delete_message(message_id):
#     try:
#         del_message = "DELETE FROM message WHERE member_id = %s"
#         cur.execute(del_message, (message_id,))
#         print("delete")
#         cnt.commit()

#         response = {'success': True}
#     except Exception as e:
#         cnt.rollback()
#         response = {'success': False, 'error': str(e)}
    
#     return jsonify(response)


