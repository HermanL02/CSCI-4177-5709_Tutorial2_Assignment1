import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Typography, Grid } from '@mui/material';

const theme = createTheme ({
    typography:{
        
    }
});

function CenterText() {
  const classes = them();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="h3" className={classes.text}>
          Welcome to Material UI
        </Typography>
      </Grid>
    </Grid>
  );
}

export default CenterText;