import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/auth/authSlice";

export default function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Clear redux auth state
        dispatch(logout());
        // Clear localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");

        // Redirect to home
        navigate("/login", { replace: true });
    }, [dispatch, navigate]);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Logging out...</h2>
        </div>
    );
}
