import logo from './logo.svg';
import './App.css';
import RoomParent from "./roomParent";
import InfoParent from "./infoParent";

function App() {

  return (
      <div className="App">
          <header className="App-header">
              <div className="banner">
                  <img src={logo} className="App-logo" id = "right" alt="logo"/>
                  <p id="header">
                      Debate A-Rounder
                  </p>
                  <img src={logo} className="App-logo" id = "left" alt="logo"/>
              </div>
              <RoomParent/>
              <InfoParent/>
          </header>
      </div>
  );
}

export default App;
