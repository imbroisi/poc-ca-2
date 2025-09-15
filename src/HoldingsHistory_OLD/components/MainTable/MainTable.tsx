import Table from '../Table';
import './MainTable.css';
import Header from '../Header';
import Body from '../Body';
import { forwardRef } from 'react';

const MainTable = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <Table ref={ref}>
      <Header />
      <Body />
    </Table>
  )
});

export default MainTable;
