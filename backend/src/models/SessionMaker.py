from sqlalchemy.orm import sessionmaker
from src.models.Buisnes import Base
from sqlalchemy import create_engine


engine = create_engine(
    'sqlite:///./database.db',
    connect_args={'check_same_thread': False},
    echo=True
)
Base.metadata.create_all(engine)

Session = sessionmaker(
    engine,
    autocommit=False,
    autoflush=False,
)


def get_session():
    session = Session()
    try:
        yield session
    finally:
        session.close()
