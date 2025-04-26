import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShoppingContext from "../providers/ShoppingContext";
import Loading from "./Loading";

const AdminProductManage = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(ShoppingContext);
    const [loading,setLoading] = useState(true)

  const navigate = useNavigate();
  useEffect(() => {
    if (!user || !user?.isAdmin) {
      navigate("/login");
      return;
    }
    fetchProducts();
  }, [user]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://fresh-fruits-backend.onrender.com/api/admin/products", {
        headers: {
          authorization: `Bearer ${user?.token}`,
        },
      });
      const data = await res.json();
      setProducts(data);
      setLoading(false)
    } catch (err) {
      toast.error("something went wrong");
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure to delete this product?"))
      return;

    try {
      await fetch(`https://fresh-fruits-backend.onrender.com/api/admin/products/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${user?.token}`,
        },
      });
      fetchProducts();
    } catch (err) {
      toast.error("something went wrong");
    }
  };

  if(loading){
    return(<Loading/>)
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Manage Products</h3>
        <Link to="/admin/products/listproduct" className="btn btn-primary">
          + Add New Product
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price (₹)</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product.img}
                      alt={product.name}
                      width="60"
                      height="60"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.qty}</td>
                  <td>
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="btn btn-sm btn-info me-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn mt-md-0 mt-2 btn-sm btn-danger"
                      onClick={() => deleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductManage;
