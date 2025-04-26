import React from 'react'
import { Link } from 'react-router-dom';

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

export default DashboardCard