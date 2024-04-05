// DefaultLayout.jsx
import { useAuth } from "../Auth/AuthProvider";
import { useNavigate } from "react-router";
import { API_URL } from "../Auth/constants";
import { Link } from "react-router-dom";
import styles from "./DefaultLayout.module.scss";

export function DefaultLayout({ children }) {
  const goTo = useNavigate();
  const auth = useAuth();

  async function handleSignOut(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/signout`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.getRefreshToken()}`,
        },
      });
      if (response.ok) {
        auth.signOut();
        goTo("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <header>
        <nav className={styles.navbarCont}>
          <ul className={styles.navbarList}>
            <div className={styles.listLeft}>
              <li>
                <Link to="/">Home</Link>
              </li>
              {localStorage.getItem("token") ? (
                <li>
                  <Link to="/bienvenido">Bienvenido</Link>
                </li>
              ) : null}
              {localStorage.getItem("token") ? null : (
                <li>
                  <Link to="/SignUp">SignUp</Link>
                </li>
              )}
            </div>
            {localStorage.getItem("token") ? (
              <div className={styles.listRight}>
                <li>
                  <p onClick={handleSignOut}>Sign Out</p>
                </li>
              </div>
            ) : null}
            {localStorage.getItem("token") ? null : (
              <div className={styles.listRight}>
                <li>
                  <Link to="/Login">Login</Link>
                </li>
              </div>
            )}
          </ul>
        </nav>
      </header>
      <main className={styles.mainCont}>{children}</main>
    </>
  );
}
