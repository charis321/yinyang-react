
import './App.css';
import GuaArea from './Compoments/GuaArea'
import useRWD  from './useRWD';
function App() {
  const device = useRWD();
  return (
    <div className="App">
      <GuaArea></GuaArea>
    </div>
  );
}

export default App;
