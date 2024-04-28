from sqlalchemy import String, ForeignKey, Column
from typing import Optional, List
from sqlalchemy.orm import mapped_column, Mapped, relationship
from .Base import Base
from sqlalchemy import Table

# TODO: ?? add relationships for user Recipe history

product_recipe = Table(
    "product_recipe",
    Base.metadata,
    Column("recipe", ForeignKey("recipe.id")),
    Column("product", ForeignKey("product.id")),
)
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
    recipes: Mapped[List["Recipe"]] = relationship(
        secondary=product_recipe, back_populates="products"
    )

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
    text: Mapped[str] = mapped_column(String(64000))
    products: Mapped[List["Product"]] = relationship(
        secondary=product_recipe, back_populates="recipes"
    )
    step: Mapped[Optional[List["Step"]]] = relationship(back_populates = "recipe_for_step", cascade = "all, delete-orphan")
    kbju: Mapped[Optional["KBJU"]] = relationship(back_populates="recipe_for_kbju")


class IntolerableProduct(Base):
    __tablename__ = "intolerable_product"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30))
    additionalUserDataID: Mapped[int] = mapped_column(ForeignKey("additional_user_data.id"))

class AdditionalUserData(Base):
    __tablename__ = 'additional_user_data'

    id: Mapped[int] = mapped_column(primary_key=True)
    weight: Mapped[int]
    age: Mapped[int]
    height: Mapped[int]
    intolerableProducts: Mapped[List["IntolerableProduct"]] = relationship()