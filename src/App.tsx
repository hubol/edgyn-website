import React from 'react';
import logo from './assets/edgyn-logo.svg';
import './App.css';
import Footer from "./Footer";

const App: React.FC = () =>
<>
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>We're coming soon.</p>
    </header>
  </div>
  <Footer />
</>;

export default App;
