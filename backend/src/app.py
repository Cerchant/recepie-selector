from fastapi import FastAPI
from backend.src.controller import router

app = FastAPI()
app.include_router(router)

