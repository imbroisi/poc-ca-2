import './App.css';
import { ModalProvider } from './HoldingsHistory/context/ModalContext';
import HistoryLink from './HoldingsHistory/HoldingsHistory';

function App() {
  return (
    <div style={{ margin: '100px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ModalProvider>
        <HistoryLink />
      </ModalProvider>
    </div>
  );
}

export default App;
