import React, { Component } from 'react';
import './App.css';
import PrimarySearchAppBar from './components/PrimarySearchAppBar'
import ActionsContainer from './components/ActionsContainer'
import Grid from '@material-ui/core/Grid';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <PrimarySearchAppBar />
          </Grid>
          <Grid item xs={12}>
            <ActionsContainer />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
