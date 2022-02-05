import Header from "../Header/Header";
import { FC } from "react";
import Head from "next/head";
import styles from "./Layout.module.scss";

const Layout: FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>TODOs</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="My TODOs app using Supabase." />
      </Head>
      <Header />
      <main className={styles.wrapper}>{children}</main>
    </>
  );
};

export default Layout;
