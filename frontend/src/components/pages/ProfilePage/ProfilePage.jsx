import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useImperativeHandle, useState } from "react";
import Container from "../../UI/Container/Container";
import Content from "../../UI/Content/Content";
import PageBody from "../../UI/PageBody/PageBody";
import PageFooter from "../../UI/PageFooter/PageFooter";
import PageHeader from "../../UI/PageHeader/PageHeader";
import Title from "../../UI/Title/Title";
import ProfileForm from "./ProfileForm/ProfileForm";
import styles from "./ProfilePage.module.css";
import axios from "axios";
import ProfileTable from "./ProfileTable/ProfileTable";

const ProfilePage = (props) => {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      let userData;
      try {
        userData = (
          await axios.get("http://127.0.0.1:8000/auth/user", {
            headers: { Authorization: `Bearer ${token}` },
          })
        ).data;
      } catch (ex) {
        const { response } = ex;
        console.log(response);
        if (response?.data.detail === "Could not validate credentials") {
          alert("Ваша сессия истекла");
          history.push("/login");
        } else {
          alert("Что-то пошло не так");
        }
      }

      const additionData = (
        await axios.get("http://127.0.0.1:8000/business/data", {
          headers: { Authorization: `Bearer ${token}` },
        })
      ).data;
      setUser({ ...additionData, ...userData });
    };
    const fetchRecipes = async () => {
      let recipesData;
      try {
        recipesData = (
          await axios.post(
            "http://127.0.0.1:8000/business/history", 
            {
              start_date_time: (new Date(new Date().setDate(new Date().getDate() - 7))).toISOString(), // 7 days ago
              end_date_time: (new Date()).toISOString(),
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
        ).data;
      } catch (ex) {
        alert("something went wrong");
        const { response } = ex;
        console.log(response);
        setRecipes([]);
      }
      setRecipes(recipesData.map((recipe) => (
        {
          id: recipe.rid,
          name: recipe.rname,
          k: recipe.kbju.k,
          b: recipe.kbju.b,
          j: recipe.kbju.j,
          u: recipe.kbju.u,
        }
      )));
    };
    fetchUser();
    fetchRecipes();
  }, []);

  if (user === undefined) {
    return (
      <>
        <PageHeader />
        <PageBody>
          <Container>
            <Title className={styles.profile__title}>Профиль</Title>
            <Content>Loading...</Content>
          </Container>
        </PageBody>
        <PageFooter />
      </>
    );
  }

  return (
    <>
      <PageHeader />
      <PageBody>
        <Container>
          <Title className={styles.profile__title}>Профиль</Title>
          <Content>
            <div className={styles.profile__form}>
              <ProfileForm user={user} />
            </div>
            <div className={styles.profile__table}>
              <ProfileTable rows={recipes} />
            </div>
          </Content>
        </Container>
      </PageBody>
      <PageFooter />
    </>
  );
};

export default ProfilePage;
