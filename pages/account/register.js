import { useState, useContext, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import Link from 'next/link';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthContext from '@/context/AuthContext';

import Layout from '@/components/Layout';
import styles from '@/styles/AuthForm.module.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const { register, error } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error('Passwords do not match!');
      return;
    }
    register({ email, password, userName });
  };

  return (
    <Layout title="User Registration">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Register
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="userName">
              User name
              <input type="text" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </label>
          </div>
          <div>
            <label htmlFor="email">
              Email address
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
          </div>
          <div>
            <label htmlFor="passwordConfirm">
              Confirm Password
              <input
                type="password"
                id="passwordConfirm"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </label>
          </div>
          <input type="submit" value="Register" className="btn" />
        </form>
        <p>
          Already have an account? <Link href="/account/login">Login </Link>
        </p>
      </div>
    </Layout>
  );
};

export default RegisterPage;
