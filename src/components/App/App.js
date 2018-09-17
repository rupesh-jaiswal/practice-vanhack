import React, { Component } from 'react';
import logo from '../../assets/images/logo.svg';
import YearStats from '../YearStats/YearStats';
import SkillsStats from '../SkillsStats/SkillsStats';
import AreaStats from '../AreaStats/AreaStats';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="dashboard-container">
          <YearStats />
          <AreaStats />
          <SkillsStats />
        </div>
        
      </div>
    );
  }
}

export default App;
