from flask import render_template
from app.main import bp

@bp.route('/index')
@bp.route('/')
def index():
    return render_template('index.html', title='Hypnotica')

