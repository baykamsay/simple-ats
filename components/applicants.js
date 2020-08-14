import React from "react";
import { Layout, Menu } from "antd";
import styles from "../styles/ATS.module.css";

const { Content, Sider } = Layout;

export default function Applicants(props) {
  console.log(props.data[0]);
  return (
    <Layout
      className={styles.siteLayoutBackground}
      style={{ padding: "24px 0" }}
    >
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
          minHeight: "76vh",
        }}
      >
        Content
      </Content>
    </Layout>
  );
}
