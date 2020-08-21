import React from "react";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import { List, Spin } from "antd";

export default function ApplicantView(props) {
  const { data, error } = useSWR(`/api/jobs/${props.data}`, async function (
    args
  ) {
    const res = await fetch(args);
    return res.json();
  });
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
      dataSource={data}
      renderItem={(item) => <List.Item>{item.name}</List.Item>}
    />
  );
}
