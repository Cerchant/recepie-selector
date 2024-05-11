import Container from "../../UI/Container/Container";
import Content from "../../UI/Content/Content";
import PageBody from "../../UI/PageBody/PageBody";
import PageFooter from "../../UI/PageFooter/PageFooter";
import PageHeader from "../../UI/PageHeader/PageHeader";
import Title from "../../UI/Title/Title";
import ProfileForm from "./ProfileForm/ProfileForm";
import styles from "./ProfilePage.module.css";

const ProfilePage = (props) => {
  const user = {
    email: "example@gmail.com",
    password: "hello",
    age: 25,
    weight: 80,
    height: 180,
    intolerantProducts: ["яйца"],
  };
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
