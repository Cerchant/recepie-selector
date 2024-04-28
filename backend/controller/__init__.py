from fastapi import APIRouter
from .auth import auth
from .Buisness import business

router = APIRouter()
router.include_router(auth)
router.include_router(business)
