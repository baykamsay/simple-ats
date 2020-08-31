import React from "react";
import { Modal, Button, Form, Input, Spin, Select, Upload } from "antd";
import useSWR from "swr";
import homeStyle from "../styles/Home.module.css";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const validateMessages = {
  required: "This field is required!",
  types: {
    email: "Not a valid email!",
    number: "Not a valid number!",
    url: "Not a valid url!",
  },
};

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export default function InsertApplicantModal(props) {
  const [form] = Form.useForm();

  async function handleSubmit(e) {
    const eString = JSON.stringify(e, (k, v) => (v === undefined ? null : v));
    await fetch("/api/applicants", {
      method: "post",
      body: eString,
    });
    form.resetFields();
    props.close();
  }

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
    <Modal
      visible={props.visible}
      title="Manual Applicant Insertion"
      onOk={props.close}
      onCancel={props.close}
      footer={null}
      width={600}
      centered
      forceRender
    >
      <Form
        form={form}
        {...layout}
        name="insert-applicant"
        onFinish={handleSubmit}
        validateMessages={validateMessages}
      >
        <Form.Item
          name="listing"
          label="For Job Listing"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select a option" showSearch>
            {data.map((job, i) => (
              <Select.Option key={i} value={job._id}>
                {job.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true }, { type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="cv"
          label="CV"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true }]}
        >
          <Upload name="file" action="/api/cv" accept=".pdf">
            <Button>Upload CV</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="phone" label="Phone Number">
          <Input />
        </Form.Item>
        <Form.Item name="linkedin" label="LinkedIn" rules={[{ type: "url" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="website" label="Website" rules={[{ type: "url" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="introduction"
          label="Short Introduction"
          rules={[
            {
              max: 300,
              message:
                "Your introduction cannot be longer than 300 characters!",
            },
            { type: "string" },
          ]}
        >
          <Input.TextArea rows={8} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 6,
          }}
        >
          <Button type="primary" htmlType="submit">
            Insert
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
