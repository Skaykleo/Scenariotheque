import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginWithGoogle } from "../services/auth.service";
import "./styles/authButton.component.css";

export default function AuthButton() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  if (loading)
    return <span className="auth-button auth-button--loading">...</span>;

  if (user) {
    return (
      <div className="auth-user">
        <button className="auth-user__name" onClick={() => navigate("/profil")}>
          {user.userName}
        </button>
        <button className="auth-button auth-button--logout" onClick={logout}>
          Se déconnecter
        </button>
      </div>
    );
  }

  return (
    <button
      className="auth-button auth-button--login"
      onClick={loginWithGoogle}
    >
      Se connecter
    </button>
  );
}
