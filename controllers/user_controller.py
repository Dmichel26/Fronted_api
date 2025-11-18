"""
Controlador para el modelo User.
Define los endpoints REST y de autenticación para usuarios.
Puedes crear más controladores siguiendo este ejemplo.
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required
from repositories.user_repositories import UserRepository
from config.conexion import get_db_session
import logging

logger = logging.getLogger(__name__)

user_bp = Blueprint('user_bp', __name__, url_prefix='/users')


@user_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({"msg": "username y password son requeridos"}), 400

    session = get_db_session()
    try:
        logger.info(f'Registrando usuario: {username}')
        existing = UserRepository.get_by_username(username, session)
        if existing:
            logger.warning(f'Usuario ya existe: {username}')
            return jsonify({'msg': 'Usuario ya existe'}), 409
        user = UserRepository.create_user(username, password, session)
        logger.info(f'Usuario registrado: {user.username} (ID: {user.id})')
        return jsonify({'id': user.id, 'username': user.username}), 201
    except Exception as e:
        logger.exception("Error en registro de usuario")
        return jsonify({'msg': 'No se pudo completar el registro', 'detail': str(e)}), 500
    finally:
        session.close()


@user_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({"msg": "username y password son requeridos"}), 400

    session = get_db_session()
    try:
        logger.info(f'Intento de login para usuario: {username}')
        user = UserRepository.get_by_username(username, session)
        if user and user.password == password:
            access_token = create_access_token(identity=str(user.id))
            logger.info(f'Login exitoso para usuario: {username}')
            return jsonify({'access_token': access_token}), 200
        logger.warning(f'Login fallido para usuario: {username}')
        return jsonify({'msg': 'Credenciales inválidas'}), 401
    except Exception as e:
        logger.exception('Error durante login')
        return jsonify({'msg': 'Error interno', 'detail': str(e)}), 500
    finally:
        session.close()


@user_bp.route('/', methods=['GET'])
@jwt_required()
def get_users():
    try:
        logger.info('Consultando listado de usuarios')
        session = get_db_session()
        users = UserRepository.get_all(session)
        logger.info(f'{len(users)} usuarios encontrados')
        return jsonify([{'id': u.id, 'username': u.username} for u in users]), 200
    except Exception as e:
        logger.error(f'Error al consultar usuarios: {str(e)}')
        return jsonify({'error': 'No autenticado', 'msg': str(e)}), 401
    finally:
        try:
            session.close()
        except:
            pass
