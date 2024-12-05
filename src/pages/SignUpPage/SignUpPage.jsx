import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import Logo from "../../components/Logo/Logo";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import Loader from "../../components/Loader/Loader.jsx";
import { NavLink } from "react-router-dom";
import css from "./SignUpPage.module.css";
import { useMediaQuery } from "react-responsive";
import { useLanguage } from "../../locales/langContext.jsx";
import { useSelector } from "react-redux";
import {
  selectAuthError,
  selectAuthIsLoading,
  selectAuthIsRegisteredSuccess,
} from "../../redux/auth/selectors.js";
import iziToast from "izitoast";

const SignUpPage = () => {
  const { t } = useLanguage();
  const isDesktop = useMediaQuery({ minWidth: 1440 });
  const error = useSelector(selectAuthError);
  const isRegistered = useSelector(selectAuthIsRegisteredSuccess);
  const isLoading = useSelector(selectAuthIsLoading);
  // console.log("register Page state error: ", error);
  // console.log("register Page state isRegistered: ", isRegistered);
  // console.log("register Page state isLoading: ", isLoading);

  return (
    <Section>
      <Container className={css.signUpWrapper}>
        {isLoading && <Loader />}
        <Logo className={css.logo} />
        <h1 className={css.title}>{t("SignUp")}</h1>
        <SignUpForm />
        <p className={css.text}>
          {t("AlreadyHave")}{" "}
          <NavLink to="/signin" className={css.link}>
            {t("SignIn")}
          </NavLink>
        </p>
      </Container>
      {isDesktop && <AdvantagesSection className={css.advantagesSection} />}
      {error &&
        iziToast.error({
          title: "Error",
          message: error,
          titleColor: "#ef5050",
          messageColor: "#ef5050",
          displayMode: 1,
          position: "topRight",
          maxWidth: "300px",
        })}
      {isRegistered &&
        iziToast.success({
          title: "Success",
          message: "Successfully register user",
          displayMode: 1,
          position: "topRight",
          maxWidth: "300px",
        })}
    </Section>
  );
};

export default SignUpPage;
