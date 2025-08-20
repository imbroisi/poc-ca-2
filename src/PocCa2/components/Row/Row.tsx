import './Row.css';

export interface RowProps {
  children: React.ReactNode
}

const Row = ({ children }: RowProps) => {
  return (
    <tr className="row">
      {children}
    </tr>
  );
};

export default Row;
