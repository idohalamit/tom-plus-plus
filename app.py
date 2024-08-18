from json import load, dump

from flask import Flask, request, Response
from flask_vite import Vite

app = Flask(__name__)
vite = Vite(app)

@app.route("/leaderboard", methods=["GET", "PUT"])
def leaderboard() -> Response:
    if request.method == "GET":
        return 
