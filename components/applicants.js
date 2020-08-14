import React from "react";
import { Layout, Menu, Typography, Divider } from "antd";
import styles from "../styles/ATS.module.css";

const { Content, Sider } = Layout;
const { Title } = Typography;

export default function Applicants(props) {
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
            {props.data.map((job, i) => (
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
