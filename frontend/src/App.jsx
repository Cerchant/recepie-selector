import { useState } from "react";
import styles from "./App.module.css";
import RecipeListPage from "./components/pages/RecipeListPage/RecipeListPage";
import RecipePage from "./components/pages/RecipePage/RecipePage";

function App() {
  const recipes = [
    {
      id: 1,
      recipeName: "Сырники",
      description:
        "Очень опупительные, балдежные, сочные, потрясный сырники, которые вы еще никогда не пробовали. Всего за 15 минут вашего личного времени вы научитесь готовить эти Очень опупительные, балдежные, сочные, потрясный сырники",
      imageLink:
        "https://proprikol.ru/wp-content/uploads/2021/01/kartinki-syrniki-3.jpg",
      ingridients: [
        "творог",
        "мука пшеничная",
        "яйцо куриное",
        "сахар",
        "масло подсолнечное",
      ],
      portionMass: 285,
      kbju: {
        k: 654,
        b: 38.4,
        j: 13.2,
        u: 96.4,
      },
      instruction: [
        {
          text: "Взбить 2 небольших яйца с сахаром.",
          images: [],
        },
        {
          text: "Растереть творог и добавить в яичную смесь.",
          images: [],
        },
        {
          text: "Вымесить плотное, но мягкое тесто, понемногу добавляя муку.",
          images: [],
        },
        {
          text: "Сформировать сырники и обжарить на сковороде по 4 минуты с каждой стороны при среднем огне.",
          images: [
            "https://proprikol.ru/wp-content/uploads/2021/01/kartinki-syrniki-3.jpg",
          ],
        },
      ],
    },
    {
      id: 2,
      recipeName: "Сырники",
      description:
        "Очень опупительные, балдежные, сочные, потрясный сырники, которые вы еще никогда не пробовали. Всего за 15 минут вашего личного времени вы научитесь готовить эти Очень опупительные, балдежные, сочные, потрясный сырники",
      imageLink:
        "https://proprikol.ru/wp-content/uploads/2021/01/kartinki-syrniki-3.jpg",
      ingridients: [
        "творог",
        "мука пшеничная",
        "яйцо куриное",
        "сахар",
        "масло подсолнечное",
      ],
      portionMass: 285,
      kbju: {
        k: 654,
        b: 38.4,
        j: 13.2,
        u: 96.4,
      },
      instruction: [
        {
          text: "Взбить 2 небольших яйца с сахаром.",
          images: [],
        },
        {
          text: "Растереть творог и добавить в яичную смесь.",
          images: [],
        },
        {
          text: "Вымесить плотное, но мягкое тесто, понемногу добавляя муку.",
          images: [
            "https://proprikol.ru/wp-content/uploads/2021/01/kartinki-syrniki-3.jpg",
            "https://proprikol.ru/wp-content/uploads/2021/01/kartinki-syrniki-3.jpg",
          ],
        },
        {
          text: "Сформировать сырники и обжарить на сковороде по 4 минуты с каждой стороны при среднем огне.",
          images: [
            "https://proprikol.ru/wp-content/uploads/2021/01/kartinki-syrniki-3.jpg",
          ],
        },
      ],
    },
  ];

  const [cookingState, setCookingState] = useState({
    isCooking: false,
    recipe: {},
  });

  const startCookingHandler = (recipeId) => {
    setCookingState((prevState) => ({
      isCooking: true,
      recipe: recipes.filter((recipe) => recipe.id === recipeId)[0],
    }));
  };

  const commitRecipeHandler = () => {
    setCookingState((prevState) => ({
      isCooking: false,
      recipe: {},
    }));
  };

  return (
    <>
      {!cookingState.isCooking ? (
        <RecipeListPage
          startCookingHandler={startCookingHandler}
          recipes={recipes}
        />
      ) : (
        <RecipePage
          commitRecipeHandler={commitRecipeHandler}
          recipe={cookingState.recipe}
        />
      )}
    </>
  );
}

export default App;
