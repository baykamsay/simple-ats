import React from "react";
import { Layout } from "antd";
import styles from "../styles/ATS.module.css";

const { Content } = Layout;

export default function JobListings() {
  return (
    <Layout
      className={styles.siteLayoutBackground}
      style={{ padding: "24px 0" }}
    >
      <Content
        style={{
          padding: "0 24px",
          minHeight: "76vh",
        }}
      >
        Content
      </Content>
    </Layout>
  );
}
