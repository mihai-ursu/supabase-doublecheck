import Layout from "../components/Layout/Layout/Layout";
import { NextPage } from "next";
import React from "react";
import Link from "next/link";
import { FaTasks, FaRegStickyNote } from "react-icons/fa";
import styles from "../styles/Home.module.scss";
import { motion } from "framer-motion";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className={styles.cards}>
        <Link href="/todos">
          <motion.a
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className={styles.card}
          >
            <FaTasks />
            Todos
          </motion.a>
        </Link>
        <Link href="/notes">
          <motion.a
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className={styles.card}
          >
            <FaRegStickyNote />
            Notes
          </motion.a>
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
