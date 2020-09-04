import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import listingStyles from "../styles/ListingsPage.module.css";
import { Row, Col, Divider, List } from "antd";

function Jobs({ jobs }) {
  return (
    <div className={styles.container} {...listingStyles}>
      <Head>
        <title>Jobs</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <Row style={{ paddingTop: "4rem" }} justify="center" align="top">
          <Col xs={{ span: 20 }} lg={{ span: 10 }}>
            <h1>Job Openings</h1>
            <Divider />
            <List
              className={listingStyles.list}
              dataSource={jobs}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Link key={item._id} href={`/jobs/${item._id}`}>
                      <a className={listingStyles.link} key="apply">
                        Apply
                      </a>
                    </Link>,
                  ]}
                >
                  <List.Item.Meta title={<h5>{item.title}</h5>} />
                  {item.location}
                </List.Item>
              )}
            />
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

export async function getServerSideProps() {
  return fetch(`${process.env.URL}api/jobs`).then(
    async (res) => {
      const jobs = await res.json();
      return {
        props: {
          jobs,
        },
      };
    },
    () => {
      return {
        props: {
          jobs: [{}],
        },
      };
    }
  );
}

export default Jobs;
