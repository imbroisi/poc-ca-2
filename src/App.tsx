import './App.css';
import { CellManagerProvider } from './PocCa2/context/CellManagerContext';
import MainTable from './PocCa3/components/MainTable';
import { useState } from 'react';


function App() {
  /**
 *  TODO: get today from API
 */
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  /**
   *  
   */
  const totalYears = 3;

  return (
    <div style={{ margin: '100px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <MainTable todayDate={todayDate} numberOfYears={totalYears} totalAttributes={7} />
    </div>
  );
}

export default App;
