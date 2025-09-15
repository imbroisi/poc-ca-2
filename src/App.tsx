import './App.css';
import HistoryLink from './HoldingsHistory/HoldingsHistory';

function App() {
  return (
    <div style={{ 
      height: 'calc(100vh - 100px)', 
      width: 'calc(100vw - 100px)',
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center' ,
      margin: '50px',
      // border: '10px solid orange',
      // position: 'relative'
    }}>
        <HistoryLink />
    </div>
  );
}

export default App;
