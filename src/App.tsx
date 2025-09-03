import './App.css';
import { CellManagerProvider } from './PocCa2/context/CellManagerContext';
import MainTable from './PocCa3/components/MainTable';
import { useState } from 'react';
import HistoryLink from './PocCa3/HoldingsHistory/HoldingsHistory';


function App() {
  return (
    <div style={{ margin: '100px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <HistoryLink />
    </div>
  );
}

export default App;
