from datetime import datetime, timedelta
import random
from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task_name = db.Column(db.String(100))
    complete = db.Column(db.Boolean)
    due_date = db.Column(db.DateTime)
    input_date = db.Column(db.DateTime)
    amPM = db.Column(db.String(10))


@app.route('/')
@app.route('/home')
def home_page():
    todo_list = Todo.query.all()
    for todo in todo_list:
        todo.due_date = lie(todo.input_date, todo.due_date)
    todo_list.sort(key=getTodoOrder)
    return render_template('home.html', todo_list=todo_list)


def getTodoOrder(todo):
    return todo.due_date - datetime.now()


@app.route('/add', methods=['POST'])
def add():
    # get("") should take in the name of the input field for the name
    task_name = request.form.get("task_name")
    try:
        due_hour = 0
        if request.form.get("modal-input-dropdown") == "PM":
            due_hour = 12
        due_hour += int(request.form.get("Hour"))
        due_date = datetime(month=int(request.form.get("Month")),day=int(request.form.get("Day")),year=int(request.form.get("Year")),hour=due_hour,minute=int(request.form.get("Minute")))
        db.session.add(Todo(task_name=task_name, complete=False, input_date=datetime.now(), due_date=due_date, amPM=request.form.get("modal-input-dropdown")))
        db.session.commit()
        return redirect(url_for("home_page"))
    except:
        return redirect(url_for("home_page"))


@app.route('/cancel', methods=['POST'])
def cancel_to_home():
    todo_list = Todo.query.all()
    return redirect(url_for("home_page"))


@app.route("/delete/<int:todo_id>")
def delete(todo_id):
    todo = Todo.query.filter_by(id=todo_id).first()
    db.session.delete(todo)
    db.session.commit()
    return redirect(url_for("home_page"))


windows = [365, 180, 60, 28, 21, 14, 7, 2]


def lie(inputDate, dueDate):
    delta = dueDate - inputDate
    max_window = None

    for i in windows:
        if delta.days > i:
            max_window = i
            break

    if max_window is None:
        return dueDate

    random.seed(inputDate.day * dueDate.day)
    day_shift = (random.randrange(70, 85) / 100.0) * max_window
    return_value = dueDate - timedelta(days=day_shift)
    return datetime(return_value.year, return_value.month, return_value.day, dueDate.hour,
                    dueDate.minute, dueDate.second, dueDate.microsecond)


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        db.session.commit()
    app.run(debug=True)
