import Head from "next/head";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import Router from "next/router";
// import Link from "next/link";
// import cookie from "js-cookie";
import { Layout, Menu, Spin, Row, Col, Button } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import styles from "../styles/ATS.module.css";
import homeStyle from "../styles/Home.module.css";
import { useEffect } from "react";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export default function ATS() {
  // eslint-disable-next-line no-unused-vars
  const { data, revalidate } = useSWR("/api/me", async function (args) {
    const res = await fetch(args);
    return res.json();
  });

  // useEffect(() => {
  //   if (data && !data.username) {
  //     Router.replace("/login");
  //   }
  // }, [data]);

  if (!data)
    return (
      <div className={homeStyle.container}>
        <Spin size="large" />
      </div>
    );

  if (!data.username) {
    Router.replace("/login");
    return (
      <div className={homeStyle.container}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Simple ATS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout style={{ minHeight: "100vh" }}>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <Row>
            <Col flex="auto">
              <div className={styles.logo} />
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1">Applicants</Menu.Item>
                <Menu.Item key="2">Job Listings</Menu.Item>
                <Menu.Item key="3">Settings</Menu.Item>
                <Menu.Item key="4">About</Menu.Item>
              </Menu>
            </Col>
            <Col flex="80px">
              <Button>Sign Out</Button>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            padding: "50px 50px 0 50px",
            marginTop: 64,
            minHeight: "100%",
          }}
        >
          <Layout
            className={styles.siteLayoutBackground}
            style={{ padding: "24px 0" }}
          >
            <Sider className={styles.siteLayoutBackground} width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%" }}
              >
                <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                  <Menu.Item key="1">option1</Menu.Item>
                  <Menu.Item key="2">option2</Menu.Item>
                  <Menu.Item key="3">option3</Menu.Item>
                  <Menu.Item key="4">option4</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                  <Menu.Item key="5">option5</Menu.Item>
                  <Menu.Item key="6">option6</Menu.Item>
                  <Menu.Item key="7">option7</Menu.Item>
                  <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub3"
                  icon={<NotificationOutlined />}
                  title="subnav 3"
                >
                  <Menu.Item key="9">option9</Menu.Item>
                  <Menu.Item key="10">option10</Menu.Item>
                  <Menu.Item key="11">option11</Menu.Item>
                  <Menu.Item key="12">option12</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: "76vh" }}>
              Content
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>Baykam Say ©2020</Footer>
      </Layout>
    </div>
  );
}
