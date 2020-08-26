import React from "react";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import { List, Spin, Card, Tag, Row, Col } from "antd";

export default function ApplicantView(props) {
  const { data, error } = useSWR(`/api/jobs/${props.data}`, async function (
    args
  ) {
    const res = await fetch(args);
    return res.json();
  });
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
          >
            <Row>
              <Col span={4} style={{ display: "flex", alignItems: "center" }}>
                {item.name}
              </Col>
              <Col span={4} style={{ display: "flex", alignItems: "center" }}>
                <Tag color={setColor(item.stage)}>{item.stage}</Tag>
              </Col>
              <Col span={4} style={{ display: "flex", alignItems: "center" }}>
                {item.email}
              </Col>
              <Col span={12} style={{ display: "flex", alignItems: "center" }}>
                {item.introduction}
              </Col>
            </Row>
          </Card>
        </List.Item>
      )}
    />
  );
}
