import './App.css';
import { CellManagerProvider } from './PocCa2/context/CellManagerContext';
import MainTable from './PocCa2/components/MainTable';
import { useState } from 'react';


function App() {
  const [model, setModel] = useState<any>('year-month');


  return (
    <>
    <input type="checkbox" onChange={() => setModel(model === 'year-month' ? 'month-day' : 'year-month')} />
    <div style={{ paddingTop: '100px', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <MainTable totalRows={10} totalColumns={model === 'month-day' ? 31 : 12} model={model} />
    </div>
    </>
  );
}

export default App;
