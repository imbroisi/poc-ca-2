import './Body.css';

export interface BodyProps {
  children: React.ReactNode;
}

const Body = ({ children }: BodyProps) => {
  return (
    <tbody className="body-container">
      {children}
    </tbody>
  );
}

export default Body;
