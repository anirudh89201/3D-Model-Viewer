import os
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})  # Restrict for production

UPLOAD_FOLDER = "D:/Uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {"stl", "obj"}
file_storage = {}

def is_allowed_extension(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/", methods=['GET'])
def hello():
    return "Hello, World!"

@app.route("/model", methods=['POST']) 
def add_model():
    if "file" not in request.files:
        return jsonify({"error": "File does not exist"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    if not is_allowed_extension(file.filename):
        return jsonify({"error": "File format not supported"}), 400

    try:
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
        file.save(file_path)
        file_storage[file.filename] = file_path
        return jsonify({"message": "Uploaded Successfully", "filename": file.filename}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/models/<filename>")
def get_model(filename):
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)

    if not os.path.exists(file_path):
        return jsonify({"error": "File not found"}), 404

    return send_file(file_path, mimetype="application/sla")  # Serve STL file inline

if __name__ == "__main__":
    app.run(debug=True)
