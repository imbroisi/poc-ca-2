import './App.css';
import HistoryLink from './HoldingsHistory/HoldingsHistory';

function App() {
  const MARGIN = 0; // Change this value to adjust padding/margin
  
  return (
    <div style={{
      height: `calc(100vh)`, 
      // width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '4px solid orange',
      boxSizing: 'border-box',
      // margin: '50px',
      // border: '4px solid orange',
      // position: 'relative'
      // backgroundColor: 'pink',
      // margin: `${MARGIN}px`,
      padding: '50px',
      // backgroundColor: 'pink',
    }}>
          <HistoryLink />
      </div>
  );
}

export default App;
