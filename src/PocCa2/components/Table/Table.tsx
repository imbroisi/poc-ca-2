import './Table.css';

const Table = ({ children }: { children: React.ReactNode }) => {
  return (
    <table className="table" cellPadding={0} cellSpacing={0} >
      <tbody>
        {children}
      </tbody>
    </table>
  );
}

export default Table; 