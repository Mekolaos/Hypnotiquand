from flask import render_template
from app.main import bp

@bp.route('/index')
@bp.route('/')
def index():
    return render_template('index.html', title='Hypnotica')

@bp.route('/composer')
def composer():
    return render_template('composer.html', title='Hypnotica - Composer')

@bp.route('/schedule')
def schedule():
    return render_template('schedule.html', title='Hypnotica - Schedule')