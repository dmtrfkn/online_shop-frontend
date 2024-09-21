import { FC, useState } from 'react';
import styles from './Main.module.scss';
import axios, { Axios, AxiosError } from 'axios';

interface RegistrationProps {
  setOpen: () => void;
}

const RegistrationView: FC<RegistrationProps> = ({ setOpen }) => {
  const [regValue, setRegValue] = useState('');
  const [age, setAge] = useState(0);
  const [pwdValue, setPwdValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchRegistration = async () => {
    try {
      const { data } = await axios.post('http://localhost:3000/api/login', {
        login: regValue,
        pwd: pwdValue,
      });
      setOpen();
      window.alert('Успешная регистрация');
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
        <p className={styles.title}>Придумайте логин</p>
        <input
          className={styles.input}
          type="text"
          value={regValue}
          onChange={(e) => setRegValue(e.target.value)}
        />
      </div>
      <div>
        <p className={styles.title}>Придумайте пароль</p>
        <input
          className={styles.input}
          type="text"
          value={pwdValue}
          onChange={(e) => setPwdValue(e.target.value)}
        />
      </div>
      <div>
        <p className={styles.title}>Укажите ваш возраст (Числом)</p>
        <input
          className={styles.input}
          type="text"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
        />
      </div>
      <button onClick={fetchRegistration}>Зарегистрироваться</button>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};

export default RegistrationView;
