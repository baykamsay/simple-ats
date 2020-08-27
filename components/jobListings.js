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
import EditJobModal from "./editJobModal";

const { Content } = Layout;
const { Title } = Typography;

export default function JobListings() {
  const [newJobModalVisible, setNewJobModalVisible] = useState(false);
  const [editJobModalVisible, setEditJobModalVisible] = useState(false);
  const [selectedListing, setSelectedListing] = useState({});
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
      style={{ paddingTop: 84, minHeight: "100vh" }}
    >
      <AddJobModal
        visible={newJobModalVisible}
        close={() => {
          mutate("/api/jobs");
          setNewJobModalVisible(false);
        }}
      />
      <EditJobModal
        data={selectedListing}
        visible={editJobModalVisible}
        close={() => {
          mutate("/api/jobs");
          setEditJobModalVisible(false);
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
                setNewJobModalVisible(true);
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
                  setSelectedListing(item);
                  setEditJobModalVisible(true);
                }}
                title={item.title}
              >
                {item.description.length <= 88
                  ? item.description
                  : `${item.description.substr(0, 85)}...`}
              </Card>
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
}
