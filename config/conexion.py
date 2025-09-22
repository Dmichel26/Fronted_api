import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.producto_model import Base

#configura el logger para mostrar mensajes a partir de nivel INFO en adelante.
logging.basicConfig(level=logging.INFO)

# Ruta de la base de datos SQLite
SQLITE_URI = "sqlite:///mi_tienda.db"

# Crear motor de conexión a SQLite
engine = create_engine(SQLITE_URI, echo=True)

# Crear la clase Session para abrir sesiones con la BD
Session = sessionmaker(bind=engine)

# Crear todas las tablas definidas en los modelos
Base.metadata.create_all(engine)

def get_db_session():
    """
    Retorna una nueva sesión de base de datos para ser utilizada en los servicios o controladores.
    """
    return Session()
