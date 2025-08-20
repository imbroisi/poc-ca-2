import './RowBody.css';

export interface RowBodyProps {
  children: React.ReactNode
}

const RowBody = ({ children }: RowBodyProps) => {
  return (
    <tr className="row-body">
      {children}
    </tr>
  );
};

export default RowBody;
