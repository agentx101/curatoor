from flask import current_app, g
import sqlalchemy as sa

def get_db():
    if 'db' not in g:
        g.db = sa.create_engine(current_app.config['DATABASE_URL'])
    return g.db


def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.dispose()


def init_app(app):
    app.teardown_appcontext(close_db)
