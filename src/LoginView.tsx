import { FC, useState } from 'react';
import styles from './Main.module.scss';
import axios, { AxiosError } from 'axios';

interface LoginProps {
  setOpen: () => void;
}

const LoginView: FC<LoginProps> = ({ setOpen }) => {
  const [loginValue, setLoginValue] = useState('');
  const [pwdValue, setPwdValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchLogin = async () => {
    try {
      const { data } = await axios.post('http://localhost:3000/api/login', {
        login: loginValue,
        pwd: pwdValue,
      });
      setOpen();
      window.alert('Успешная авторизация');
      localStorage.setItem('user', JSON.stringify({ login: data.login, password: data.password }));
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div className={styles.gap}>
      <div>
        <p className={styles.title}>Введите логин</p>
        <input
          className={styles.input}
          type="text"
          value={loginValue}
          onChange={(e) => setLoginValue(e.target.value)}
        />
      </div>
      <div>
        <p className={styles.title}>Введите пароль</p>
        <input
          className={styles.input}
          type="text"
          value={pwdValue}
          onChange={(e) => setPwdValue(e.target.value)}
        />
      </div>
      <button onClick={fetchLogin}>Авторизоваться</button>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};

export default LoginView;
