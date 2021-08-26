import React, { useContext } from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentUserOperation, login, register } from "../../redux/auth/authOperations";
import { setToken } from "../../redux/auth/authSelectors";
import { AuthContainer, BackDeskImg, DeskWrapper } from "./AuthStyled";
import sprite from "../../images/sprite.svg";
import Footer from "../footer/Footer";
import { LanguageContext } from "../App";
import languages from "../../languages";
import { buttonLangSelector } from "../../languages/languagesSelectors/AuthLangSelector";
import { validationSchema } from "./Validator";

const Auth = () => {
  const dispatch = useDispatch();
  const token = useSelector(setToken);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    if (token) {
      getCurrentUserOperation();
    }
  }, [token]);

  return (
    <DeskWrapper>
      <BackDeskImg />
      <AuthContainer>
        <h1 className="authTitle">{languages[language].pages.authPage.title}</h1>

        <Formik initialValues={{ email: "", password: "" }} validationSchema={validationSchema}>
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="user-form">
              <p className="authText">{languages[language].pages.authPage.authForm.authGoogleText}</p>
              <a href="https://kidslikev1.herokuapp.com/auth/google" className="googleBtn" aria-label="google button">
                <svg className="icon-user">
                  <use href={sprite + "#icon-google-symb"} />
                </svg>{" "}
                Google
              </a>
              <p>{languages[language].pages.authPage.authForm.authText}</p>
              <label className="user-label" htmlFor="email">
                <span className="accent-red">*</span>
                E-mail:
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="your@email.com"
                className="user-input"
              />
              {errors.email && touched.email && (
                <p className="accent-red">{languages[language].pages.authPage[errors.email]}</p>
              )}
              <label className="user-label" htmlFor="password">
                <span className="accent-red">*</span>
                {languages[language].pages.authPage.authForm.password}
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="abraKadabra777"
                className="user-input"
              />
              {errors.password && touched.password && (
                <p className="accent-red">{languages[language].pages.authPage[errors.password]}</p>
              )}

              <div className="auth-btn-wrap">
                <button className="user-button" type="button" onClick={() => dispatch(login(values))}>
                  {buttonLangSelector(language, "login")}
                </button>
                <button className="user-button" type="button" onClick={() => dispatch(register(values))}>
                  {buttonLangSelector(language, "register")}
                </button>
              </div>
            </form>
          )}
        </Formik>
        <Footer />
      </AuthContainer>
    </DeskWrapper>
  );
};
export default Auth;
