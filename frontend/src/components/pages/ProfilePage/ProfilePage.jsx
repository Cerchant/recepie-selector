import { useEffect, useState } from "react";
import Container from "../../UI/Container/Container";
import Content from "../../UI/Content/Content";
import PageBody from "../../UI/PageBody/PageBody";
import PageFooter from "../../UI/PageFooter/PageFooter";
import PageHeader from "../../UI/PageHeader/PageHeader";
import Title from "../../UI/Title/Title";
import ProfileForm from "./ProfileForm/ProfileForm";
import styles from "./ProfilePage.module.css";
import axios from "axios";

const ProfilePage = (props) => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = (
        await axios.get("http://127.0.0.1:8000/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
      ).data;
      const additionData = (
        await axios.get("http://127.0.0.1:8000/business/data", {
          headers: { Authorization: `Bearer ${token}` },
        })
      ).data;
      setUser({ ...additionData, ...userData });
    };
    fetchUser();
  }, []);

  console.log(user);

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
          </Content>
        </Container>
      </PageBody>
      <PageFooter />
    </>
  );
};

export default ProfilePage;