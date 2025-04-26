import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import toast from "react-hot-toast";
import ShoppingContext from "../providers/ShoppingContext";

const ViewOrder = () => {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(ShoppingContext);

  const getOrder = async () => {
    try {
      const res = await fetch(
        `https://fresh-fruits-backend.onrender.com/api/admin/order/${id}`,
        {
          headers: {
            authorization: `Bearer ${user?.token}`,
          },
        }
      );
      const data = await res.json();
      setOrder(data);
      setLoading(false);
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    if (!user || !user?.isAdmin) {
      navigate("/login");
      return;
    }

    getOrder();
  }, [id, user]);

  const acceptOrder = async (orderId) => {
    try {
      await fetch(
        `https://fresh-fruits-backend.onrender.com/api/admin/orders/accept/${orderId}`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${user?.token}`,
          },
        }
      );
      toast.success("order accepted");
      getOrder();
    } catch (err) {
      toast.error("something went wrong");
    }
  };

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
      <h2 className="text-center mb-4">Order Details</h2>

      {loading ? (
        <Loading />
      ) : order.length === 0 ? (
        <div className="text-center text-muted">You have no orders yet.</div>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <div className="card  shadow-sm p-md-4 p-0">
            <div className="card-body">
              <div className="d-md-flex  justify-content-between mb-3">
                <h5 className="fs-6">OrderId #{order._id}</h5>
                <button
                  className={`btn ${getStatusClass(order.status)}  btn-sm`}
                >
                  {order.status}
                </button>
              </div>

              <p className="card-text">
                <strong>Items:</strong>
              </p>
              <ul className="list-unstyled">
                {order.items.map((item) => (
                  <li key={item._id} className="d-flex justify-content-between">
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
                Ordered on: {new Date(order.createdAt).toLocaleDateString()} at{" "}
                {new Date(order.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              <button
                onClick={() => acceptOrder(id)}
                disabled={order.status === "accepted"}
                className={`btn w-100 ${
                  order.status === "accepted" ? "btn-secondary" : "btn-success"
                }`}
              >
                {order.status === "accepted" ? "Accepted" : "Accept"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewOrder;
