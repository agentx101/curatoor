import os
import sqlalchemy as sa

from . import create_app
from .db import get_db


app = create_app()


@app.cli.command("init-db")
def init_db():
    eng = get_db()
    with eng.connect() as conn:
        conn.execute(sa.text('''CREATE TABLE IF NOT EXISTS users (
            id serial PRIMARY KEY,
            address VARCHAR(50) NOT NULL UNIQUE
        )
        '''))
        conn.execute(sa.text('''CREATE TABLE IF NOT EXISTS collections (
            id serial PRIMARY KEY,
            address VARCHAR(50) NOT NULL UNIQUE,
            user_id INT NOT NULL,
            image_url Varchar(255),
            name Varchar(255),
            description Text
        )
        '''))
