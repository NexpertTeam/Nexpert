import logo from './logo.svg';
import ExpandedNode from './components/ExpandedNode.js';
import Graph from './components/Graph.js';
import History from './components/History.js';

import './App.css';

function App() {
  return (
    <div className="App">
      <History color='black'/>
      <ExpandedNode color='red'/>
      <Graph />
    </div>
  );
}

export default App;
