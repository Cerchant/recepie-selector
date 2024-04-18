from fastapi import APIRouter
from .auth import auth

router = APIRouter()
router.include_router(auth)
