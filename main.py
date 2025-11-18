from flask import Flask, send_from_directory, redirect
from controllers.producto_controller import producto_bp
from controllers.user_controller import user_bp
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import os

# Importar modelos para que SQLAlchemy los registre
from models.producto_model import Base as ProductoBase, Producto
from models.user_model import User
from config.conexion import engine

# Crear todas las tablas
ProductoBase.metadata.create_all(engine)
User.metadata.create_all(engine)

app = Flask(__name__, static_folder='frontend', static_url_path='')

# JWT secret key (cambiar en producción)
app.config['JWT_SECRET_KEY'] = 'super-secret-change-me'

# Habilitar CORS para permitir llamadas desde el frontend
CORS(app)

# Inicializar JWT
jwt = JWTManager(app)

# Registrar blueprints
app.register_blueprint(producto_bp)
app.register_blueprint(user_bp)


# Rutas para servir frontend
@app.route('/')
def index():
    """Redirige al login"""
    return redirect('/index.html')


@app.route('/<path:filename>')
def serve_static(filename):
    """Sirve archivos estáticos del frontend"""
    frontend_path = os.path.join(os.path.dirname(__file__), 'frontend')
    return send_from_directory(frontend_path, filename)


if __name__ == "__main__":
    print("\n" + "="*70)
    print("🚀 API DANA - Servidor iniciado")
    print("="*70)
    print("📡 API disponible en:       http://127.0.0.1:5000/api")
    print("🌐 Frontend disponible en:  http://127.0.0.1:5000")
    print("📚 Documentación:           http://127.0.0.1:5000/api/docs")
    print("="*70 + "\n")
    app.run(debug=False)
