import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsBoxArrowRight } from "react-icons/bs"; // Bootstrap-style logout icon

export const HeaderNav = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar shadow">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold" to="/admin">
          Admin Dashboard
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {[
              { to: "/admin", label: "Add Question" },
              { to: "/admin/show-question", label: "Show Question" },
              { to: "/admin/generate-quiz", label: "Generate Quiz" },
              { to: "/admin/validate-answer", label: "User Response" },
            ].map((item, index) => (
              <li className="nav-item" key={index}>
                <NavLink
                  className={({ isActive }) =>
                    `nav-link custom-link ${isActive ? "active" : ""}`
                  }
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center">
            {username && (
              <span className="navbar-text text-light me-3">
                👋 Welcome, <strong>{username}</strong>
              </span>
            )}
            <button
              className="btn btn-outline-light btn-sm d-flex align-items-center"
              onClick={handleLogout}
            >
              <BsBoxArrowRight className="me-1" /> Logout
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .custom-navbar {
          background: linear-gradient(90deg, #0f2027, #203a43, #2c5364);
        }

        .custom-link {
          position: relative;
          padding-bottom: 4px;
          transition: color 0.3s ease;
        }

        .custom-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0%;
          height: 2px;
          background-color: #a8d0e6;
          transition: width 0.3s ease;
        }

        .custom-link:hover::after {
          width: 100%;
        }

        .custom-link.active {
          font-weight: bold;
          color: #a8d0e6 !important;
        }

        .navbar-brand {
          font-size: 1.3rem;
          display: flex;
          align-items: center;
        }

        .btn-outline-light:hover {
          background-color: #ffffff22;
          border-color: #ffffff88;
        }
      `}</style>
    </nav>
  );
};
