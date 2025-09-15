import './Table.css';
import { forwardRef } from 'react';

interface TableProps {
  children: React.ReactNode;
}

const Table = forwardRef<HTMLDivElement, TableProps>(({ children }, ref) => {
  return (
    <div ref={ref} className="table-container">
      <table className="table" cellPadding={0} cellSpacing={0}>
        {children}
      </table>
    </div>
  );
});

export default Table; 