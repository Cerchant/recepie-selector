from sqlalchemy.orm import sessionmaker
from .Base import Base
from sqlalchemy import create_engine
from backend.src.settings import settings

# dont ask why
from .Buisnes import *
from .User import *

engine = create_engine(
    settings.database_url,
    connect_args={'check_same_thread': False},
    # echo=True
)

Base.metadata.create_all(engine)

Session = sessionmaker(
    engine,
    autocommit=False,
    autoflush=False,
)


def get_session() -> Session:
    session = Session()
    try:
        yield session
    finally:
        session.close()
