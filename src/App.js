import Login from './components/Login';
import Game from './components/Game';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>

      {sessionStorage.getItem('token') === null ? <Login /> : <Game />}
    </div>
  );
}

export default App;
