import './App.css';
import SetUP from "./components/SetUp"
import QandA from './components/QandA';
import {useSelector} from "react-redux" 
function App() { 
  const setupMode=useSelector((state)=>state.switchBetweenModes);

  return (
    <div className="App">
     { 
     setupMode?<SetUP/>:<QandA/>
     } 
     
    </div>
  );
}

export default App;
