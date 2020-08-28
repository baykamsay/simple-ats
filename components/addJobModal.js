import React from "react";
import { Modal, Button, Form, Input } from "antd";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export default function AddJobModal(props) {
  const [form] = Form.useForm();
  async function handleSubmit(e) {
    await fetch("/api/jobs", {
      method: "post",
      body: JSON.stringify(e),
    });
    form.resetFields();
    props.close();
  }
  return (
    <Modal
      visible={props.visible}
      title="New Job Listing"
      onOk={props.close}
      onCancel={props.close}
      footer={null}
      width={600}
      // bodyStyle={{ height: "80vh" }}
      centered
      forceRender
    >
      <Form
        form={form}
        {...layout}
        name="add-job"
        onFinish={handleSubmit}
        hideRequiredMark
      >
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={8} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 4,
          }}
        >
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
