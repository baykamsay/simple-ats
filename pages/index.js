import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Typography } from "antd";

const { Title } = Typography;

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Simple ATS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Title>Hello, World!</Title>
      </main>

      <footer className={styles.footer}>
        <a href="https://baykam.me" target="_blank" rel="noopener noreferrer">
          Powered by Baykam Say
        </a>
      </footer>
    </div>
  );
}
