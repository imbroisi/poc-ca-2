import './App.css';
import HistoryLink from './HoldingsHistory/HoldingsHistory';

function App() {
  return (
    <div style={{
      height: 'calc(100vh - 100px)', 
      // width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '50px',
      // border: '4px solid orange',
      // position: 'relative'
      // backgroundColor: 'pink',
    }}>
      <div style={{ width: '100%', height: '800px' }}>
        <HistoryLink />
      </div>
    </div>
  );
}

export default App;
