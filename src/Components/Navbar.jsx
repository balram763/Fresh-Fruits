import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShoppingContext from "../providers/ShoppingContext";

const Navbar = () => {
  const {
    productName,
    sortProduct,
    searchResults,
    setSearchResults,
    user,
    Logout,
  } = useContext(ShoppingContext);
  const [text, setText] = useState("");
  const [sort, setSort] = useState(0);

  useEffect(() => {
    sortProduct(sort);
  }, [sort]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setText(query);
    productName(query);
  };

  const handleSelectItem = () => {
    setText("");
    setSearchResults([]);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
      <div className="container-fluid">
        {user?.isAdmin ? (
          <Link to="/admin" className="navbar-brand fw-bold fs-3 text-warning">
            <i
              style={{ color: "green" }}
              className="fa-solid fa-spray-can-sparkles"
            ></i>{" "}
            <span style={{ color: "green" }}>Fresh</span> Product
          </Link>
        ) : (
          <Link to="/" className="navbar-brand fw-bold fs-3 text-warning">
            <i
              style={{ color: "green" }}
              className="fa-solid fa-spray-can-sparkles"
            ></i>{" "}
            <span style={{ color: "green" }}>Fresh</span> Product
          </Link>
        )}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Search + Sort */}

          {user?.isAdmin ? (
            ""
          ) : (
            <form
              className="d-flex mx-auto my-2 my-lg-0 position-relative"
              style={{ maxWidth: "500px" }}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search products"
                value={text}
                onChange={handleSearchChange}
              />
              <select
                className="form-select"
                style={{ maxWidth: "160px" }}
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="0">Sort</option>
                <option value="1">Price: Low to High</option>
                <option value="2">Price: High to Low</option>
              </select>

              {/* search dropdown */}
              {searchResults.length > 0 && (
                <ul
                  className="dropdown-menu show position-absolute w-100 mt-5"
                  style={{ zIndex: 1000 }}
                >
                  {searchResults.map((item) => (
                    <li key={item._id} className="dropdown-item">
                      <Link
                        to={`/product/${item._id}`}
                        className="text-dark text-decoration-none"
                        onClick={handleSelectItem}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </form>
          )}

          {/* Right nav buttons */}
          <ul className="navbar-nav ms-auto d-flex align-items-center gap-3 mt-2">
            {user ? (
              <>
                {user?.isAdmin ? (
                  <>
                  <li className="nav-item">
                    <Link to="/admin/products" className="btn btn-outline-warning">
                       Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="admin/products/listproduct" className="btn btn-outline-warning">
                      <i className="fa-solid fa-plus me-1"></i>Add Product
                    </Link>
                  </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link
                        to="/AddToCard"
                        className="btn btn-outline-secondary"
                      >
                        <i className="fa-solid fa-cart-shopping me-1"></i> Cart
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/orders" className="btn btn-outline-secondary">
                        <i className="fa-solid fa-box me-1"></i> Orders
                      </Link>
                    </li>{" "}
                  </>
                )}

                <li className="nav-item dropdown">
                  <button
                    className="btn btn-outline-primary dropdown-toggle d-flex align-items-center gap-2"
                    data-bs-toggle="dropdown"
                  >
                    <i className="fa-solid fa-user-circle fs-5"></i>{" "}
                    <span>Profile</span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end shadow-sm rounded-3">
                    {user?.isAdmin ? (
                      <li>
                        <Link
                          to="/admin"
                          className="dropdown-item d-flex align-items-center gap-2"
                        >
                          <i className="fa-regular fa-id-card"></i> Dashboard
                        </Link>
                      </li>
                    ) : (
                      <li>
                        <Link
                          to="/user/profile"
                          className="dropdown-item d-flex align-items-center gap-2"
                        >
                          <i className="fa-regular fa-id-card"></i> My Profile
                        </Link>
                      </li>
                    )}

                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        onClick={() => Logout()}
                        className="dropdown-item d-flex align-items-center gap-2 text-danger"
                      >
                        <i className="fa-solid fa-right-from-bracket"></i>{" "}
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="btn btn-success">
                  <i className="fa-solid fa-right-to-bracket me-1"></i> Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
