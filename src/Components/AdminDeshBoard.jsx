import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShoppingContext from "../providers/ShoppingContext";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(ShoppingContext);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProfit: 0,
    totalCustomers: 0,
  });

  const navigate = useNavigate();



  const fetchOrders = async () => {
    try {
      const res = await fetch("https://fresh-fruits-backend.onrender.com/api/admin/orders/recent", {
        headers: {
          authorization: `Bearer ${user?.token}`,
        },
      });
      const data = await res.json();
      setOrders(data || []);
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch("https://fresh-fruits-backend.onrender.com/api/admin/dashboard", {
        headers: {
          authorization: `Bearer ${user?.token}`,
        },
      });
      const data = await res.json();
      setStats(data || {});
    } catch (err) {
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    if (!user || !user?.isAdmin) {
      navigate("/login");
      return
    }
    fetchOrders();
    fetchStats();
  }, [user]);
  
  const acceptOrder = async (orderId) => {
    try {
      await fetch(`https://fresh-fruits-backend.onrender.com/api/admin/orders/accept/${orderId}`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${user?.token}`,
        },
      });
      fetchOrders();
    } catch (err) {
      console.error("Failed to accept order", err);
    }
  };

  const profileProfit = orders
    .filter((order) => order.status === "accepted")
    .reduce((total, order) => {
      const orderTotal = order.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      return total + orderTotal;
    }, 0);

  return (
    <div className="container-fluid p-4 bg-light min-vh-100">
      <h2 className="mb-4 fw-bold">Admin Dashboard</h2>

      <div className="row g-4 mb-5">
        <DashboardCard
          title="Total Orders"
          value={stats?.totalOrders}
          bg="success"
        />
        <DashboardCard
          title="Total Profit"
          value={`₹${profileProfit}`}
          bg="warning"
        />
        <DashboardCard title="Customers" value={stats.customers} bg="info" />
        <DashboardCard
          title="Inventory"
          value={stats.inventory}
          bg="danger"
          linkText="Manage"
          link="/admin/products"
        />
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Recent Orders</h5>
        </div>
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th scope="col">Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Status</th>
                <th style={{ minWidth: 100 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user.email}</td>
                    <td>{order.items.length}</td>
                    <td>
                      <span
                        className={`badge text-bg-${
                          order.status === "accepted" ? "success" : "secondary"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Link
                          to={`/admin/order/${order._id}`}
                          className="btn btn-outline-primary btn-sm"
                        >
                          View
                        </Link>
                        {order.status === "pending" && (
                          <button
                            className="btn btn-outline-success btn-sm"
                            onClick={() => acceptOrder(order._id)}
                          >
                            Accept
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">
                    No recent orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, bg, linkText, link }) => {
  return (
    <div className="col-md-3">
      <div
        className={`card border-0 text-white bg-${bg} shadow-sm rounded position-relative h-100`}
        style={{ transition: "transform 0.2s ease" }}
      >
        <div className="card-body">
          <h6 className="card-title">{title}</h6>
          <h4 className="fw-semibold">{value}</h4>
          {link && (
            <Link
              to={link}
              className="btn btn-sm btn-light mt-3 position-absolute bottom-2"
            >
              {linkText}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
