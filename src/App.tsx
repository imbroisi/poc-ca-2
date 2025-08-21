import './App.css';
import { CellManagerProvider } from './PocCa2/context/CellManagerContext';
import MainTable from './PocCa2/components/MainTable';


function App() {
  return (
    // <CellManagerProvider>
      <div style={{ paddingTop: '100px', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <MainTable totalRows={10} totalColumns={30} mode="month" />
      </div>
    // </CellManagerProvider>
  );
}

export default App;
