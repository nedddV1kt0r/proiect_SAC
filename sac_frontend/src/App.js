import logo from './logo.svg';
import { HashRouter as Router, Route, Routes} from 'react-router-dom';
import Identify from './Identify';
import Unprotected from "./Unprotected";
import Protected from './Protected';

function App() {


  return (
    <div className="App">
     <Router>
        <Routes>
          <Route exact path="/" element={<Identify />} />  
           <Route path="/Unprotected" element={<Unprotected />} />
          <Route path="/Protected" element={<Protected />} /> 
        </Routes>
        
        
      </Router>
    </div>
  );
}

export default App;
