import { setIsAppLoading } from "features/App/reducer";
import { selectIsAppLoading } from "features/App/selectors";
import { post } from "helpers/request";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "store";
import {
  AuthFrom,
  FormWrapper,
  GoToWrapper,
  Heading,
  Logo,
  PageWrapper,
  SubHeading,
  VerticalCol,
} from "./styled";
import { Helmet } from "react-helmet";
import Input from "components/Input";
import Button from "components/Button";
import { Link } from "react-router-dom";
import { paths } from "routes/helpers";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAppLoading = useAppSelector(selectIsAppLoading);

  const [fields, setFields] = useState({
    loginOrEmail: process.env.REACT_APP_DEV_LOGIN || "",
    password: process.env.REACT_APP_DEV_PASSWORD || "",
  });
  const onChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFields({
        ...fields,
        [e.target.name]: e.target.value,
      });
    },
    [fields]
  );

  const isLoginDisabled = useCallback(() => {
    return !fields["loginOrEmail"] || !fields["password"];
  }, [fields]);

  const handleLogin = useCallback(async () => {
    dispatch(setIsAppLoading(true));
    const res = await post("/users/login", {
      loginOrEmail: fields["loginOrEmail"],
      password: fields["password"],
    });
    const { status } = res;

    if (status === "error") {
      toast.error("ввденный данные неверны");
      dispatch(setIsAppLoading(false));
    }
  }, [dispatch, fields, navigate]);

  const handleFormKeyPress = useCallback(
    ({ code }: React.KeyboardEvent<HTMLFormElement>) => {
      if (["Enter", "NumpadEnter"].includes(code) && !isLoginDisabled) {
        handleLogin();
      }
    },
    [handleLogin, isLoginDisabled]
  );

  return (
    <PageWrapper>
      <Helmet>
        <title>Войти в e-commerce</title>
      </Helmet>

      <FormWrapper>
        <Logo text={"Logo"} />
        <Heading>Добро пожаловать!</Heading>
        <SubHeading>Войдите или зарегестрируйтесь</SubHeading>
        <AuthFrom>
          <VerticalCol onKeyPress={handleFormKeyPress}>
            <Input
              name="loginOrEmail"
              label="Логин или почта"
              placeholder="Введите логин или почту"
              autocomplete="username"
              value={fields["loginOrEmail"]}
              onChange={onChangeInput}
            />
            <Input
              name="password"
              label="Пароль"
              placeholder="Введите пароль"
              autocomplete="current-password"
              value={fields["password"]}
              onChange={onChangeInput}
              type="password"
            />
          </VerticalCol>
          <Button
            block
            onClick={handleLogin}
            disabled={isLoginDisabled() || isAppLoading}
          >
            Войти
          </Button>
        </AuthFrom>
        <GoToWrapper>
          <span>Не зарегистрированы?</span>
          &nbsp;
          <Link to={paths.register}>
            Пройти регистрацию
          </Link>
        </GoToWrapper>

        <GoToWrapper>
          <Link to={paths.home}>
            На главную
          </Link>
        </GoToWrapper>
      </FormWrapper>
    </PageWrapper>
  );
};

export default LoginPage