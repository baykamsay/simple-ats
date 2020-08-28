import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import listingStyles from "../styles/ListingsPage.module.css";
import { Row, Col, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

export default function Home() {
  return (
    <div className={styles.container} {...listingStyles}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <Row
          style={{
            minHeight: "60vh",
          }}
          className={listingStyles.secondary_b}
          justify="center"
          align="bottom"
        >
          <Col
            xs={{ span: 20 }}
            lg={{ span: 8 }}
            style={{ paddingBottom: "5rem" }}
          >
            <h1 className={listingStyles.primary}>Example Jobs</h1>
            <h5 className={listingStyles.primary}>
              Join Us &ndash; add small and meaningful slogan here
            </h5>
            <Link href="/jobs">
              <a className={listingStyles.button}>View Open Jobs</a>
            </Link>
          </Col>
          <Col
            xs={{ span: 20 }}
            lg={{ span: 8 }}
            style={{ paddingBottom: "5rem" }}
          >
            <p className={listingStyles.primary}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              interdum hendrerit pulvinar. Cras accumsan imperdiet augue in
              ornare. Ut ac ex eu leo aliquet porttitor ac id ligula.
            </p>
            <p
              className={[
                listingStyles.primary,
                listingStyles.margin_bottom,
              ].join(" ")}
            >
              Nulla pellentesque lorem turpis, in rhoncus urna euismod sit amet.
              Aenean pharetra justo felis, quis congue dui faucibus non. Nulla
              blandit lacinia dolor, sit amet mattis massa fermentum ac.in.
            </p>
          </Col>
        </Row>
        <Row style={{ minHeight: "30vh", paddingTop: "5%" }} justify="center">
          <Col xs={{ span: 20 }} lg={{ span: 8 }}>
            <h2>Our Mission</h2>
          </Col>
          <Col xs={{ span: 20 }} lg={{ span: 8 }}>
            <p
              className={[listingStyles.mission, listingStyles.secondary].join(
                " "
              )}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              interdum hendrerit pulvinar. Cras accumsan imperdiet augue in
              ornare.
            </p>
          </Col>
        </Row>
        <Row
          style={{ minHeight: "10vh", paddingBottom: "1rem" }}
          justify="center"
          align="bottom"
        >
          <DownOutlined style={{ color: "black", fontSize: "1.5rem" }} />
        </Row>
        <Row style={{ paddingTop: "5rem" }} justify="center" align="bottom">
          <Col
            style={{
              display: "flex",
              flexDirection: "column",
            }}
            xs={{ span: 20 }}
            lg={{ span: 16 }}
          >
            <h2>Our Team</h2>
            <Col
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src="/our-team.png" alt="Our Team" width="100%"></img>
              <span>
                Photo by{" "}
                <a
                  href="https://unsplash.com/@annaelizaearl?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Anna Earl
                </a>{" "}
                on{" "}
                <a
                  href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Unsplash
                </a>
              </span>
            </Col>
          </Col>
        </Row>
        <Row style={{ padding: "4rem 0" }} justify="center" align="bottom">
          <Link href="/jobs">
            <a className={listingStyles.button_s}>Join Us</a>
          </Link>
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
