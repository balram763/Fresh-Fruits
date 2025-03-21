import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="display-4 text-danger fw-bold">404</h1>
      <h3 className="mb-3">Oops! Page Not Found</h3>
      <p className="text-muted">The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-success mt-3">
        Back to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
