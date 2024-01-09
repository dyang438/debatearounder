import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p id="header">
          Welcome to Debate A-Rounder!
        </p>

        <img src={logo} className="App-logo" alt="logo"/>

        <a
            id={"Form-Link"}
            className="App-link"
            href="https://reactjs.org"
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
