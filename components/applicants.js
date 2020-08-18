import React from "react";
import { Layout, Menu, Typography, Divider, Spin } from "antd";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import styles from "../styles/ATS.module.css";
import homeStyle from "../styles/Home.module.css";

const { Content, Sider } = Layout;
const { Title } = Typography;

export default function Applicants() {
  const { data, error } = useSWR("/api/jobs", async function (args) {
    const res = await fetch(args);
    return res.json();
  });
  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <div className={homeStyle.container}>
        <Spin size="large" />
      </div>
    );

  return (
    <Layout
      className={styles.siteLayoutBackground}
      style={{ padding: "24px 0", minHeight: "81vh" }}
    >
      <div style={{ padding: "0 24px" }}>
        <Title level={2}>Applicants</Title>
        <Divider />
      </div>
      <Layout className={styles.siteLayoutBackground}>
        <Sider className={styles.siteLayoutBackground} width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["0"]}
            style={{ height: "100%" }}
          >
            {data.map((job, i) => (
              <Menu.Item key={i.toString()}>{job.title}</Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Content
          style={{
            padding: "0 24px",
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
}
