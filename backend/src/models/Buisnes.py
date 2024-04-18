from sqlalchemy import String, ForeignKey
from typing import Optional, List
from sqlalchemy.orm import mapped_column, Mapped, relationship
from .Base import Base


# TODO: ?? add relationships for user Recipe history

class KBJU(Base):
    __tablename__ = "kbju"
    id: Mapped[int] = mapped_column(primary_key=True)
    recipe_id = mapped_column(ForeignKey("recipe.id"))
    recipe_for_kbju: Mapped["Recipe"] = relationship(back_populates="kbju")
    cal: Mapped[Optional[int]]
    protein: Mapped[Optional[int]]
    fat: Mapped[Optional[int]]
    carb: Mapped[Optional[int]]

class Product(Base):
    __tablename__ = "product"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30))
    mass: Mapped[Optional[int]]
    recipe_id: Mapped[int] = mapped_column(ForeignKey("recipe.id"))
    recipe_for_product: Mapped["Recipe"] = relationship(back_populates="products")


class Step(Base):
    __tablename__ = "step"
    id: Mapped[int] = mapped_column(primary_key=True)
    recipe_id = mapped_column(ForeignKey("recipe.id"))
    recipe_for_step: Mapped["Recipe"] = relationship(back_populates="step")
    picture: Mapped[Optional[str]]
    sentence: Mapped[Optional[str]]

class Recipe(Base):
    __tablename__ = "recipe"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30))
    products: Mapped[List["Product"]] = relationship(back_populates = "recipe_for_product", cascade = "all, delete-orphan")
    step: Mapped[List["Step"]] = relationship(back_populates = "recipe_for_step", cascade = "all, delete-orphan")
    kbju: Mapped["KBJU"] = relationship(back_populates="recipe_for_kbju")
