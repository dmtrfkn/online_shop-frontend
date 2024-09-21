import { useState } from 'react';
import styles from './App.module.scss';
import LoginView from './LoginView';
import Modal from './components/Modal/Modal';
import RegistrationView from './RegistrationView';
import NavBar from './NavBar/NavBar';

function App() {
  const [isOpen, setOpen] = useState<boolean>(true);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const hadleCloseModal = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <div>
        <NavBar />
        <Modal isOpen={isOpen} setOpen={hadleCloseModal}>
          <div className={styles.block}>
            <div className={styles.flex}>
              <h1
                className={isLogin ? styles.active : styles.header}
                onClick={() => setIsLogin(true)}>
                Авторизация
              </h1>
              <h1
                className={!isLogin ? styles.active : styles.header}
                onClick={() => setIsLogin(false)}>
                Регистрация
              </h1>
            </div>
            {isLogin ? (
              <LoginView setOpen={hadleCloseModal} />
            ) : (
              <RegistrationView setOpen={hadleCloseModal} />
            )}
          </div>
        </Modal>
      </div>
    </>
  );
}

export default App;
