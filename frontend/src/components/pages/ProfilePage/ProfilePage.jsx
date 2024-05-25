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
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const ProfilePage = (props) => {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState();
  const [recipes, setRecipes] = useState([]);
  const [startDate, setStartDate] = useState(
    dayjs().hour(0).minute(0).second(0)
  );
  const [endDate, setEndDate] = useState(
    dayjs().hour(23).minute(59).second(59)
  );

  const fetchRecipes = async () => {
    let recipesData;
    try {
      recipesData = (
        await axios.post(
          "http://127.0.0.1:8000/business/history",
          {
            start_date_time: startDate.toISOString(),
            end_date_time: endDate.toISOString(),
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      ).data;

      console.log(recipesData);
      const matchedData = recipesData.map((data) => ({
        id: data.rid,
        name: data.rname,
        k: data.kbju.k,
        b: data.kbju.b,
        j: data.kbju.j,
        u: data.kbju.u,
      }));
      setRecipes(matchedData);
    } catch (ex) {
      alert("Что-то пошло не так");
      const { response } = ex;
      console.log(response);
      setRecipes([]);
    }
  };

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

    fetchUser();
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [startDate, endDate]);

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
            <div className={styles.profile__date}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Начало"
                  value={startDate}
                  onChange={(newValue) =>
                    setStartDate(newValue.hour(0).minute(0).second(0))
                  }
                />
                <DatePicker
                  sx={{ marginLeft: 2 }}
                  label="Конец"
                  value={endDate}
                  onChange={(newValue) =>
                    setEndDate(newValue.hour(23).minute(59).second(59))
                  }
                />
              </LocalizationProvider>
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
