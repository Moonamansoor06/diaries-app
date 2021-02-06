import React, { FC, lazy, Suspense } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';

  import { Link} from '@material-ui/core'
  import { clearUser } from '../reducers/userSlice';
  import {useHistory} from 'react-router-dom';
  import {useDispatch} from 'react-redux' 
  

  
  import { makeStyles } from '@material-ui/core/styles';
  import AppBar from '@material-ui/core/AppBar';
  
  import Typography from '@material-ui/core/Typography';
  import Auth from './Auth'
  import Home from './Home'
  import Diaries from './Diaries';
import List from '@material-ui/core/List'
import Toolbar from '@material-ui/core/Toolbar';

import Button from '@material-ui/core/Button';
import LogOut from './logOut';
  
  
  
  
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
     
    },
  
  
  }));
  

const NavBar: FC = () => {


  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
 
   
  

    const classes = useStyles();
    return (
      <div className={classes.root}>
        <AppBar color='primary' position="static" >
  
  
          <Toolbar style={{justifyContent:'space-between'}}>
            <Typography variant="h6" style={{color:'#9e9e9e'}}>
              Diaries
            </Typography>
            <List component="nav"
              aria-labelledby="main navigation">
                 <Link href='/home'  style={{color:'#9e9e9e',paddingRight:'1rem'}}>Home</Link>
              {(isLoggedIn)? 
              
              <Link href='/logout'  style={{color:'#9e9e9e'}}>LogOut </Link>
              :
              <Link href='/login'  style={{color:'#9e9e9e'}}>Login</Link>}
       
                    </List>
             
          
           {/*  <List component="nav"
              aria-labelledby="main navigation"
              className={classes.navDisplayFlex}  >
              <Link to='/home' className={classes.link} style={{color:'#9e9e9e'}}>Home</Link>
              {isLoggedIn}? 
              
              <Link to='/logout' className={classes.link}>LogOut </Link>
              :
              <Link to='/login' className={classes.link}>Login</Link>
       
             
            </List> */}
          </Toolbar>
  
  
  
  
        </AppBar>
      </div>
  );
};

export default NavBar

 
