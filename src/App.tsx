import React, {useState} from 'react';
import logo from './assets/edgyn-logo.svg';
import './App.css';
import Footer from "./Footer";
import Backdrop from "./Backdrop";

const App: React.FC = () =>
{
  let [animationCounter, setAnimationCounter] = useState(0);
  let animationClassName = animationCounter % 2 === 0 ? "alert" : "twirl"; 
  let logoClassName = animationCounter ? `App-logo ${animationClassName}` : "App-logo";
  
  return <div className="Layout">
    <div className="App">
      <Backdrop />
      <header className="App-header">
        <img
            src={logo}
            className={logoClassName}
            alt="edgyn Logo"
            onClick={() => setAnimationCounter(animationCounter + 1)} />
        <p>We're coming soon.</p>
      </header>
    </div>
    <Footer />
  </div>;  
};

export default App;
