import React, { useState } from "react";
import {
  Layout,
  Menu,
  Typography,
  Divider,
  Spin,
  Row,
  Col,
  Button,
} from "antd";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import styles from "../styles/ATS.module.css";
import homeStyle from "../styles/Home.module.css";
import { PlusOutlined } from "@ant-design/icons";
import InsertApplicantModal from "./insertApplicantModal";
import ApplicantView from "./applicantView";

const { Content, Sider } = Layout;
const { Title } = Typography;

function Applicants(props) {
  const [
    insertApplicantModalVisible,
    setInsertApplicantModalVisible,
  ] = useState(false);
  const [selectedListing, setSelectedListing] = useState(props.data.initialId);
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
      <InsertApplicantModal
        visible={insertApplicantModalVisible}
        close={() => {
          setInsertApplicantModalVisible(false);
        }}
      />
      <Row align="middle" style={{ padding: "0 24px" }}>
        <Col flex="auto">
          <Title level={2} style={{ margin: 0 }}>
            Applicants
          </Title>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => {
              setInsertApplicantModalVisible(true);
            }}
          >
            Manual Insert
          </Button>
        </Col>
      </Row>
      <Divider />
      <Layout className={styles.siteLayoutBackground}>
        <Sider className={styles.siteLayoutBackground} width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["0"]}
            style={{ height: "100%" }}
            onSelect={(e) => {
              setSelectedListing(e.item.props.data);
            }}
          >
            {data.map((job, i) => (
              <Menu.Item key={i.toString()} data={job._id}>
                {job.title}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Content
          style={{
            padding: "0 24px",
          }}
        >
          <ApplicantView
            data={selectedListing}
            pipeline={props.data.pipeline}
          />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Applicants;
