import React, { useContext, useEffect, useState } from "react";
import toast, { ToastBar } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import ShoppingContext from "../providers/ShoppingContext";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(ShoppingContext);
  const navigate = useNavigate();

  const getOrder = async () => {
    try {
      const res = await fetch(
        "https://fresh-fruits-backend.onrender.com/api/orders",
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      toast.error("Please login")
      return;
    }

    getOrder();
  }, []);

  const getOrderTotal = (items) =>
    items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "btn-warning";
      case "completed":
        return "btn-success";
      case "accepted":
        return "btn-primary";
      default:
        return "btn-secondary";
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Your Orders</h2>

      {loading ? (
        <Loading />
      ) : orders.length === 0 ? (
        <div className="text-center text-muted">You have no orders yet.</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {orders.map((order, index) => (
            <div key={order._id} className="col mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <h5 className="card- fs-6">OrderId #{order._id}</h5>
                    <button
                      className={`btn ${getStatusClass(order.status)} btn-sm`}
                    >
                      {order.status}
                    </button>
                  </div>

                  <p className="card-text">
                    <strong>Items:</strong>
                  </p>
                  <ul className="list-unstyled">
                    {order.items.map((item) => (
                      <li
                        key={item._id}
                        className="d-flex justify-content-between"
                      >
                        <span>{item.name}</span>
                        <span>
                          {item.quantity} x ₹{item.price}
                        </span>
                        <Link
                          to={`/product/${item._id}`}
                          className="btn btn-link btn-sm"
                        >
                          View Details
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <p className="card-text">
                    <strong>Address:</strong>
                  </p>
                  <p>{order?.address}</p>

                  <div className="d-flex justify-content-between">
                    <span>
                      <strong>Total:</strong>
                    </span>
                    <span>₹{getOrderTotal(order.items)}</span>
                  </div>

                  <p className="text-muted mt-2">
                    Ordered on: {new Date(order.createdAt).toLocaleDateString()}{" "}
                    at{" "}
                    {new Date(order.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
