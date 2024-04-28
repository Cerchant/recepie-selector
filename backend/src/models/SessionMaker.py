from sqlalchemy.orm import sessionmaker

engine = create_engine(
    settings.database_url,
    connect_args={'check_same_thread': False},
    # echo=True
)

Session = sessionmaker(
    engine,
    autocommit=False,
    autoflush=False,
)

Base.metadata.create_all(engine)

def get_session() -> Session:
    session = Session()
    try:
        yield session
    finally:
        session.close()