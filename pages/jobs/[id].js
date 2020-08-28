import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import listingStyles from "../../styles/ListingsPage.module.css";
import { Row, Col, Divider } from "antd";
import { useRouter } from "next/router";

function Jobs() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className={styles.container} {...listingStyles}>
      <Head>
        <title>Jobs</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <Row style={{ paddingTop: "4rem" }} justify="center" align="top">
          <Col xs={{ span: 20 }} lg={{ span: 12 }}>
            <h1>{id}</h1>
          </Col>
        </Row>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/baykamsay/simple-ats"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
        </a>
      </footer>
    </div>
  );
}

// export async function getStaticProps() {
//   const res = await fetch("http://localhost:3000/api/jobs");
//   const jobs = await res.json();

//   return {
//     props: {
//       jobs,
//     },
//   };
// }

export default Jobs;
