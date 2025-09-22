from flask import Flask
from controllers.producto_controller import producto_bp

app = Flask(__name__)
app.register_blueprint(producto_bp)

if __name__ == "__main__":
    app.run(debug=True)
