import React, { useState } from "react";
import fetch from "isomorphic-unfetch";
import useSWR, { mutate } from "swr";
import { List, Spin, Card, Tag, Row, Col, Rate } from "antd";
import ViewApplicantModal from "./viewApplicantModal";

export default function ApplicantView(props) {
  const { data, error } = useSWR(`/api/jobs/${props.data}`, async function (
    args
  ) {
    const res = await fetch(args);
    return res.json();
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [applicantData, setApplicantData] = useState({});
  function setColor(stage) {
    let color;
    switch (stage) {
      case "Applied":
        color = "magenta";
        break;
      case "Interview":
        color = "gold";
        break;
      case "Offer":
        color = "green";
        break;
      default:
        color = "blue";
        break;
    }
    return color;
  }
  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  return (
    <div>
      <ViewApplicantModal
        visible={modalVisible}
        data={applicantData}
        close={() => {
          mutate(`/api/jobs/${props.data}`);
          setModalVisible(false);
        }}
        pipeline={props.pipeline}
      />
      <List
        split={false}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              style={{ width: "100%" }}
              bodyStyle={{ padding: "1rem" }}
              onClick={() => {
                setApplicantData(item);
                setModalVisible(true);
              }}
            >
              <Row>
                <Col span={4} style={{ display: "flex", alignItems: "center" }}>
                  {item.name}
                </Col>
                <Col span={4} style={{ display: "flex", alignItems: "center" }}>
                  <Tag color={setColor(item.stage)}>{item.stage}</Tag>
                </Col>
                <Col span={4} style={{ display: "flex", alignItems: "center" }}>
                  <Rate value={item.rating} disabled />
                </Col>
                <Col
                  span={12}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {item.introduction}
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}
