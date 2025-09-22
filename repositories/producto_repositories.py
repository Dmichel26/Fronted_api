from models.producto_model import Producto
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError


class ProductoRepository:
    def __init__(self, db_session: Session):
        self.db = db_session

    # Obtener todos los productos
    def get_all(self):
        return self.db.query(Producto).all()

    # Obtener producto por ID
    def get_by_id(self, producto_id: int):
        return self.db.query(Producto).filter(Producto.id == producto_id).first()

    # Crear producto con validación de código único
    def create(self, codigo: str, producto: str, precio: float):
        existente = self.db.query(Producto).filter_by(codigo=codigo).first()
        if existente:
            raise ValueError(f"Ya existe un producto con el código '{codigo}'")

        nuevo_producto = Producto(codigo=codigo, producto=producto, precio=precio)
        self.db.add(nuevo_producto)
        try:                #Ese bloque garantiza que si el commit falla por una violación de integridad,
                            #no se rompa tu aplicación y la base de datos se mantenga limpia, devolviendo un error manejable.
            self.db.commit()
            self.db.refresh(nuevo_producto)
            return nuevo_producto
        except IntegrityError:
            self.db.rollback()
            raise ValueError(f"No se pudo crear el producto. El código '{codigo}' ya existe.")

    # Actualizar producto (validación si se cambia el código)
    def update(self, producto_id: int, codigo: str = None, producto: str = None, precio: float = None):
        prod = self.get_by_id(producto_id)
        if not prod:
            return None

        if codigo:
            existente = self.db.query(Producto).filter(
                Producto.codigo == codigo,
                Producto.id != producto_id  # excluye el actual
            ).first()
            if existente:
                raise ValueError(f"El código '{codigo}' ya está en uso por otro producto")
            prod.codigo = codigo

        if producto:
            prod.producto = producto
        if precio is not None:
            prod.precio = precio

        try:
            self.db.commit()
            self.db.refresh(prod)
            return prod
        except IntegrityError:
            self.db.rollback()
            raise ValueError("Error al actualizar el producto")

    # Eliminar producto
    def delete(self, producto_id: int):
        prod = self.get_by_id(producto_id)
        if prod:
            self.db.delete(prod)
            self.db.commit()
        return prod
