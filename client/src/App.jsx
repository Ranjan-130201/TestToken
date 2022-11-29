import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro.jsx";


function App() {
  return (
    <EthProvider>
  
          <Intro />
          
    </EthProvider>
  );
}

export default App;
