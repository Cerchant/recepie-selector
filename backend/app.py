from fastapi import FastAPI
from controller import router

app = FastAPI()
app.include_router(router)

