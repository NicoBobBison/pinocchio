from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task_name = db.Column(db.String(100))
    complete = db.Column(db.Boolean)


@app.route('/')
@app.route('/home')
def home_page():
    todo_list = Todo.query.all()
    return render_template('home.html', todo_list=todo_list)


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        db.session.add(Todo(task_name="Do the dishes", complete=False))
        db.session.commit()
    app.run(debug=True)
