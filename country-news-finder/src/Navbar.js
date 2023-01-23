import { Link, useMatch, useResolvedPath } from 'react-router-dom'

const Navbar = () => {  
  return (
    <nav className="nav">
      <Link to="/" className="site-title">Country News Finder</Link>
      <ul>
        <CustomLink to="/Home">Home</CustomLink>
        <CustomLink to="About">About</CustomLink>
      </ul>
    </nav>
  );
};

const CustomLink = ({to, children, ...props}) => {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>{children}</Link>
    </li>
  )
}

export default Navbar;