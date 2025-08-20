import './Header.css';

export interface HeaderProps {
  children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <thead className="header">
      {children}
    </thead>
  );
};

export default Header;
