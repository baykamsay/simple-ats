import Head from "next/head";
import styles from "../../styles/Home.module.css";
import listingStyles from "../../styles/ListingsPage.module.css";
import { Row, Col, Spin } from "antd";
import { useRouter } from "next/router";
import useSWR from "swr";
import fetch from "isomorphic-unfetch";
import ReactMarkdown from "react-markdown";

function Jobs() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`/api/jobListing/${id}`, async function (
    args
  ) {
    const res = await fetch(args);
    return res.json();
  });
  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <div className={styles.container}>
        <Spin size="large" />
      </div>
    );
  console.log(data);
  return (
    <div className={styles.container} {...listingStyles}>
      <Head>
        <title>Jobs</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <Row style={{ paddingTop: "4rem" }} justify="center" align="top">
          <Col xs={{ span: 20 }} lg={{ span: 12 }}>
            <h1>{data.title}</h1>
            <h5>{data.location}</h5>
            <ReactMarkdown source={data.description} />
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

export default Jobs;
