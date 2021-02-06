import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { User } from '../interfaces/user.interface';
import * as Yup from 'yup';
import http from '../services/api';
import { saveToken, setAuthState } from '../reducers/authSlice';
import { setUser } from '../reducers/userSlice';
import { AuthResponse } from '../services/mirage/routes/user';
import { useAppDispatch } from '../store';
import Card from '@material-ui/core/Card';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const schema = Yup.object().shape({
  username: Yup.string()
    .required('What? No username?')
    .max(16, 'Username cannot be longer than 16 characters'),
  password: Yup.string().required('Without a password, "None shall pass!"'),
  email: Yup.string().email('Please provide a valid email address (abc@xy.z)'),
});

const Auth: FC = () => {
  const { handleSubmit, register, errors } = useForm<User>({

  });;
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const submitForm = (data: User) => {
    const path = isLogin ? '/auth/login' : '/auth/signup';
    http
      .post<User, AuthResponse>(path, data)
      .then((res) => {
        
        if (res) {
          const { user, token } = res;
          dispatch(saveToken({token:token,
            isAuthenticated:true
          }));
          dispatch(setUser(user));
          dispatch(setAuthState(true));
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="auth" style={{justifyContent:'center',alignItems:'center', marginTop:'40px'}}>
     < Card style={{padding:'1rem'}} >
      <Typography variant='h6' color='textSecondary' style={{alignItems:'center',textAlign:'center'}}> Login</Typography>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="inputWrapper">
            <Input ref={register} name="username" placeholder="Username" />
            {errors && errors.username && (
              <p className="error">{errors.username.message}</p>
            )}
          </div>
          <div className="inputWrapper">
            <Input
              ref={register}
              name="password"
              type="password"
              placeholder="Password"
            />
            {errors && errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>
          {!isLogin && (
            <div className="inputWrapper">
              <Input
                ref={register}
                name="email"
                placeholder="Email (optional)"
              />
              {errors && errors.email && (
                <p className="error">{errors.email.message}</p>
              )}
            </div>
          )}
          <div className="inputWrapper">
            <Button variant="contained"  fullWidth type="submit" disabled={loading}>
              {isLogin ? 'Login' : 'Create account'}
            </Button>
          </div>
          <p
            onClick={() => setIsLogin(!isLogin)}
            style={{ cursor: 'pointer', opacity: 0.7 , textAlign:'center'}}
          >
            {isLogin ? 'No account? Create one' : 'Already have an account?'}
          </p>
        </form></Card>
      </div>
      
  );
};

export default Auth;

