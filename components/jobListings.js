import React from "react";
import {
  Layout,
  List,
  Card,
  Typography,
  Divider,
  Button,
  Row,
  Col,
} from "antd";
import styles from "../styles/ATS.module.css";
import { PlusOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title } = Typography;

export default function JobListings(props) {
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
        <Row align="middle">
          <Col flex="auto">
            <Title style={{ margin: 0 }} level={2}>
              Job Listings
            </Title>
          </Col>
          <Col>
            <Button type="primary" icon={<PlusOutlined />} size="large">
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
          dataSource={props.data}
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
