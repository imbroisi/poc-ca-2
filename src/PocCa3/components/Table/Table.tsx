import './Table.css';

const Table = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="table-container">
      <table className="table" cellPadding={0} cellSpacing={0}>
        {children}
      </table>
    </div>
  );
}

export default Table; 