from flask import (
    Blueprint, request, render_template, request
)
import sqlalchemy as sa
from sqlalchemy.orm import Session

from .db import get_db

bp = Blueprint('users', __name__, url_prefix='/users/')


@bp.route('/', methods=['GET', 'POST'])
def list():
    eng = get_db()
    with eng.connect() as con:
        if request.method == 'POST':
            address = request.json.get('address')
            result = con.execute(
                sa.text(
                    '''
                    INSERT INTO users (address)
                    VALUES (:address)
                    ON CONFLICT (address) DO NOTHING
                    '''
                ),
                {"address": address}
            )
            return '', 204

        else:
            address = request.args.get('address', None)
            print(address)
            if (address):
                result = con.execute(sa.text("SELECT id, address FROM users WHERE address= :add"), {"add": address})
            else:
                result = con.execute(sa.text("SELECT id, address FROM users"))
            rv = []

            for row in result:
                rv.append({
                    "id": row.id,
                    "address": row.address,
                })
            return rv, 200


@bp.route('/<int:id>/collections', methods=['GET', 'POST'])
def get_or_create_user_collections(id):
    eng = get_db()
    with eng.connect() as con:
        if request.method == 'POST':
            result = con.execute(
                sa.text(
                    '''
                    INSERT INTO collections (address, user_id, image_url, description, name)
                    VALUES (:address, :user_id, :image_url, :description, :name)"
                    '''
                ),
                {
                    "address": request.json.get("address"),
                    "user_id": id,
                    "image_url": request.json.get("image_url"),
                    "name": request.json.get("name"),
                    "description": request.json.get("description"),
                }
            )
            return '', 204

        else:
            result = con.execute(
                sa.text(
                    '''
                    SELECT id, address, user_id, image_url, description, name
                    FROM collections
                    WHERE user_id = :user_id
                    '''
                ),
                {"user_id": id}
            )
            rv = []
            for row in result:
                rv.append({
                    "id": row.id,
                    "user_id": row.user_id,
                    "address": row.address,
                    "image_url": row.image_url,
                    "description": row.description,
                    "name": row.name,
                })
            return rv, 200



@bp.route('/<int:id>/recommendations', methods=['GET'])
def recos(id):
    eng = get_db()
    with eng.connect() as con:
        result = con.execute(
            sa.text(
                '''
                SELECT id, address, user_id, image_url, description, name
                FROM collections
                ORDER BY random()
                LIMIT 100
                '''
            )
        )
        rv = []
        for row in result:
            rv.append({
                "id": row.id,
                "user_id": row.user_id,
                "address": row.address,
                "image_url": row.image_url,
                "description": row.description,
                "name": row.name,
            })
    return rv, 200
