import './App.css';

import Router from './router';
import Navigation from './navigation';

function App() {
  return (
    <div className="App">
      <Router Navigation={Navigation}/>
    </div>
  );
}

export default App;
