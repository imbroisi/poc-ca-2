import './Table.css';

const Table = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="table">
      {children}
    </div>
  );
}

export default Table; 