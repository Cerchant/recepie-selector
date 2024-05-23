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
          await axios.get("НУЖЕН АДЕКВАТНЫЙ ЗАПРОС", {
            headers: { Authorization: `Bearer ${token}` },
          })
        ).data;
        //setRecipes(recipesData); ////////////////////////////////////////// ТУТ НАДО ИЗМЕНИТЬ ДАННЫЕ На ПРИХОДЯЩие
        setRecipes([
          {
            id: 1,
            name: "Яйца Бенедикт",
            k: 123,
            b: 321,
            j: 142,
            u: 23,
          },
          {
            id: 2,
            name: "Картошка по-деревенски в духовке",
            k: 123,
            b: 321,
            j: 142,
            u: 23,
          },
          {
            id: 3,
            name: "Сырники",
            k: 123,
            b: 321,
            j: 142,
            u: 23,
          },
        ]);
      } catch (ex) {
        const { response } = ex;
        console.log(response);
        setRecipes([]);
      }
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
