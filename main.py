from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task_name = db.Column(db.String(100))
    complete = db.Column(db.Boolean)
    input_date = db.Column(db.DateTime)
    due_date = db.Column(db.DateTime)


@app.route('/')
@app.route('/home')
def home_page():
    todo_list = Todo.query.all()
    return render_template('home.html', todo_list=todo_list)


@app.route('/add', methods=['POST'])
def add():
    # get("") should take in the name of the input field for the name
    task_name = request.form.get("task_name")
    due_date = request.form.get("date")
    db.session.add(Todo(task_name=task_name, complete=False, input_date=datetime.now()))
    db.session.commit()
    return redirect(url_for("home_page"))


@app.route("/delete/<int:todo_id>")
def delete(todo_id):
    todo = Todo.query.filter_by(id=todo_id).first()
    db.session.delete(todo)
    db.session.commit()
    return redirect(url_for("home_page"))


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        db.session.commit()
    app.run(debug=True)
