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

const { Header, Content } = Layout;

function ATS({ staticProps }) {
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
        <link rel="icon" href="/favicon.png" />
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
              <img
                src="/logo_transparent.png"
                alt="Logo"
                className={styles.logo}
              />
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
            minHeight: "100%",
          }}
        >
          {componentId === "1" && <Applicants data={staticProps} />}
          {componentId === "2" && <JobListings />}
        </Content>
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  return fetch(`${process.env.URL}api/jobs`).then(
    async (res) => {
      const jobs = await res.json();
      const res2 = await fetch(`${process.env.URL}api/pipeline`);
      const pipeline = await res2.json();
      return {
        props: {
          staticProps: {
            initialId: jobs[0]._id,
            pipeline: pipeline,
          },
        },
      };
    },
    () => {
      return {
        props: {
          staticProps: {
            initialId: 0,
            pipeline: [],
          },
        },
      };
    }
  );
}

export default ATS;
