import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Typography } from "antd";

const { Title } = Typography;

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <Title>
          Go to{" "}
          <Link href="/ats">
            <a>the ATS</a>
          </Link>
        </Title>
      </main>

      <footer className={styles.footer}>
        <a href="https://baykam.me" target="_blank" rel="noopener noreferrer">
          Powered by Baykam Say
        </a>
      </footer>
    </div>
  );
}
