import logo from './logo.svg';
import './App.css';
import GenerateRoomCodeButton from './generateRoomCodeButton'

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
              <GenerateRoomCodeButton/>
              <a
                  id={"Form-Link"}
                  className="App-link"
                  href="https://forms.gle/sVTvfBVW5aZqpv9fA"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                  Form
              </a>
          </header>
      </div>
  );
}

export default App;
