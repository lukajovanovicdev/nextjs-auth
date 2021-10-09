import { useState, useRef } from 'react';
import classes from './auth-form.module.css';
import axios from 'axios';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';

const createUser = async (email, password) => {
  const response = await axios.post('/api/auth/signup', { email, password });

  const data = response.data;

  if (response.status !== 201) {
    throw new Error(data || 'Something went wrong');
  }

  return data;
};

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const submitFormHandler = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    //add frontend validation

    if (isLogin) {
      const result = await signIn('credentials', { redirect: false, email, password });
      if (!result.error) {
        router.replace('/profile');
      }
    } else {
      try {
        const result = await createUser(email, password);
        console.log(result);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitFormHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button type="button" className={classes.toggle} onClick={switchAuthModeHandler}>
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
