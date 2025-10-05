from repositories.uni_repositories import UniRepository
from sqlalchemy.orm import Session

class UniService:
    def __init__(self, db_session: Session):
        self.repository = UniRepository(db_session)

    def listar_uni(self):
        return self.repository.get_all_uni()
    
    def obtener_uni(self, uni_id: int):
        return self.repository.get_uni_by_id(uni_id)

    def crear_uni(self, nombre: str, codigo: str, carrera: str):
        return self.repository.create_uni(nombre, codigo, carrera)

    def actualizar_uni(self, uni_id: int, nombre: str = None, codigo: str = None, carrera: str = None):
        return self.repository.update_uni(uni_id, nombre, codigo, carrera)

    def eliminar_uni(self, uni_id: int):
        return self.repository.delete_uni(uni_id)


