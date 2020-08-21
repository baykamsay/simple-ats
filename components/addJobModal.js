import React from "react";
import { Modal, Button, Form, Input } from "antd";

const layout = {
  labelCol: { sm: { span: 4 }, xl: { span: 6 } },
  wrapperCol: { sm: { span: 16 }, xl: { span: 12 } },
};

export default function AddJobModal(props) {
  const [form] = Form.useForm();
  async function handleSubmit(e) {
    const res = await fetch("/api/jobs", {
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
      width="80vw"
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
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={8} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            sm: { ...layout.wrapperCol, offset: 4 },
            xl: { ...layout.wrapperCol, offset: 6 },
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
