import React, { FC } from 'react';
import Diaries from './Diaries';
import Editor from './Editor';
import NavBar from './NavBar';


import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { GridList } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
    

const Home: FC = () => {
  const classes = useStyles();
    return (
      <div>
         
          
          
       
       <div className={classes.root}>  
      <Grid container  spacing={4}  >
        <Grid  item spacing={4} style={{width:'400px' ,margin:'20px 10px' }}>
        <Diaries />
        </Grid>
       {/*  <Grid item xs>
          <Paper className={classes.paper}><Editor/></Paper>
        </Grid> */}
       
      </Grid>
      </div>
    </div>

  
    )   
};

export default Home;
