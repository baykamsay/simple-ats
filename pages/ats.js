import React, { useEffect, useState } from "react";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import Router from "next/router";
import cookie from "js-cookie";
import { Layout, Menu, Spin, Row, Col, Button } from "antd";
import styles from "../styles/ATS.module.css";
import homeStyle from "../styles/Home.module.css";
import Applicants from "../components/applicants";
import JobListings from "../components/jobListings";

const { Header, Content, Footer } = Layout;

function ATS() {
  const { data, revalidate } = useSWR("/api/me", async function (args) {
    const res = await fetch(args);
    return res.json();
  });
  const [componentId, setComponentId] = useState("1");

  useEffect(() => {
    if (data && !data.username && !cookie.get("token")) {
      Router.replace("/login");
    }
  }, [data]);

  if (!data || !data.username)
    return (
      <div className={homeStyle.container}>
        <Spin size="large" />
      </div>
    );

  return (
    <div>
      <Head>
        <title>Simple ATS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
          }}
        >
          <Row>
            <Col flex="auto">
              <div className={styles.logo} />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["1"]}
                onSelect={(item) => {
                  setComponentId(item.key);
                }}
              >
                <Menu.Item key="1">Applicants</Menu.Item>
                <Menu.Item key="2">Job Listings</Menu.Item>
                <Menu.Item key="3">Settings</Menu.Item>
                <Menu.Item key="4">About</Menu.Item>
              </Menu>
            </Col>
            <Col flex="80px">
              <Button
                onClick={() => {
                  cookie.remove("token");
                  revalidate();
                }}
              >
                Sign Out
              </Button>
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
          {componentId === "1" && <Applicants />}
          {componentId === "2" && <JobListings />}
        </Content>
        <Footer style={{ textAlign: "center" }}>Baykam Say ©2020</Footer>
      </Layout>
    </div>
  );
}

export default ATS;
