import "./NotFound.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

/**
 * NotFound Component - 404 page for invalid routes
 * Features: Friendly error message, navigation links
 */
function NotFound() {
  return (
    <>
      <Header />
      <div className="notfound">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist or has been moved.</p>
        <Link to="/">← Back To Home</Link>
      </div>
    </>
  );
}

export default NotFound;
