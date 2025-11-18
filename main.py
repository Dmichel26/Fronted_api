from flask import Flask
from controllers.producto_controller import producto_bp
from controllers.user_controller import user_bp
from flask_jwt_extended import JWTManager
from flask_cors import CORS

app = Flask(__name__)

# JWT secret key (cambiar en producción)
app.config['JWT_SECRET_KEY'] = 'super-secret-change-me'

# Habilitar CORS para permitir llamadas desde el frontend
CORS(app)

# Inicializar JWT
jwt = JWTManager(app)

# Registrar blueprints
app.register_blueprint(producto_bp)
app.register_blueprint(user_bp)


if __name__ == "__main__":
    app.run(debug=True)
