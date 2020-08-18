import React, { useState } from "react";
import fetch from "isomorphic-unfetch";
import useSWR, { mutate } from "swr";
import {
  Layout,
  List,
  Card,
  Typography,
  Divider,
  Button,
  Row,
  Col,
  Spin,
} from "antd";
import styles from "../styles/ATS.module.css";
import homeStyle from "../styles/Home.module.css";
import { PlusOutlined } from "@ant-design/icons";
import AddJobModal from "./addJobModal";

const { Content } = Layout;
const { Title } = Typography;

export default function JobListings() {
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
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Layout
      className={styles.siteLayoutBackground}
      style={{ padding: "24px 0" }}
    >
      <AddJobModal
        visible={modalVisible}
        close={() => {
          mutate("/api/jobs");
          setModalVisible(false);
        }}
      />
      <Content
        style={{
          padding: "0 24px",
          minHeight: "76vh",
        }}
      >
        <Row align="middle">
          <Col flex="auto">
            <Title style={{ margin: 0 }} level={2}>
              Job Listings
            </Title>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={() => {
                setModalVisible(true);
              }}
            >
              Add Listing
            </Button>
          </Col>
        </Row>
        <Divider />
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                onClick={() => {
                  console.log("hey"); // change here
                }}
                title={item.title}
              >
                {item.description}
              </Card>
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
}
