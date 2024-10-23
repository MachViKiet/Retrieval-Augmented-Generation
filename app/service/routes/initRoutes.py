from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from controllers.exampleController import authController


main = Blueprint("main", __name__)


@main.route("/", methods=["GET"])
@cross_origin()
def init():
    return jsonify({"text": "Server is running"})


@main.route("/auth", methods=["GET"])
@cross_origin()
def auth():
    auth = authController()
    return jsonify(auth)
