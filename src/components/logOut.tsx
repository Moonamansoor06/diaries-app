import React from 'react'; 
import {clearToken,setAuthState} from '../reducers/authSlice'
import { clearUser } from '../reducers/userSlice';
import {Route, Redirect, useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { Card, Link} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Auth from './Auth';

const useStyles = makeStyles({
    root: {
     
      justifyContent:'center'
    },

    
    title: {
      fontSize: 14,
    },
    
    
  });
 
function LogOut() {
    const classes = useStyles(); 
    const Logout=()=>{
        const history=useHistory();
      const dispatch=useDispatch()
  
      
      dispatch(clearUser())
      dispatch(clearToken())
      dispatch(setAuthState(false))
     
      }

   return(
       <div style={{margin:'10rem',justifyContent:'center',alignItems:'center', marginTop:'40px' ,width:'15rem',
       height:'40rem'}}>
     <Card  variant="outlined">
         <CardContent>
             <Typography className={classes.title}>
          You are logged out</Typography>
     <Button onClick={()=>Logout()} >
     <Link href='/'  style={{color:'#9e9e9e'}}>Login</Link>
     </Button></CardContent></Card>
     </div>
   )
}

export default LogOut
