import { FC, useState, useEffect } from "react";
import { supabase } from "utils/supabase";
import styles from "./Header.module.scss";
import Link from "next/link";
import { FaUserAlt, FaSignOutAlt, FaGithub } from "react-icons/fa";

const Header: FC = () => {
  const [user, setUser] = useState<string | undefined>();

  useEffect(() => {
    const user = supabase.auth.user();
    setUser(user?.user_metadata.name);

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user.user_metadata.name);
    });
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>Logo</a>
        </Link>
      </div>
      {!user ? (
        <Link href="/login">
          <a className={styles.button}>
            <FaGithub />
            Login
          </a>
        </Link>
      ) : (
        <nav className={styles.navigation}>
          <span className={styles.user}>
            <FaUserAlt />
            {user}
          </span>

          <Link href="/logout">
            <a className={styles.button}>
              <FaSignOutAlt />
              Logout
            </a>
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
