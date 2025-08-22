import './App.css';
import { CellManagerProvider } from './PocCa2/context/CellManagerContext';
import MainTable from './PocCa2/components/MainTable';


let CHANGE_MODEL = 0;

const model: 'year-month' | 'month-day' = CHANGE_MODEL === 0 ? 'year-month' : 'month-day';

function App() {
  return (
    // <CellManagerProvider>
      <div style={{ paddingTop: '100px', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <MainTable totalRows={10} totalColumns={model === 'month-day' ? 31 : 12} model={model} />
      </div>
    // </CellManagerProvider>
  );
}

export default App;
