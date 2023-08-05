import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const AdminRouter = ({ children, ...rest }) => {
  const location = useLocation();
  const userRole = useSelector((state) => state.adminUser.user.role);
  const isAdmin = userRole === "Admin";

  if (isAdmin) {
    return children;
  } else if (userRole) {
    return <Navigate to="/" replace state={{ from: location }} />;
  } else {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
};
