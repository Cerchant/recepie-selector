import styles from "./App.module.css";
import RecipeListPage from "./components/pages/RecipeListPage/RecipeListPage";

function App() {
  return (
    <section className={styles.app__body}>
      <RecipeListPage />
    </section>
  );
}

export default App;
