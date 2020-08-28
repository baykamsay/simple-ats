import React, { useEffect } from "react";
import { Modal, Button, Form, Input } from "antd";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export default function EditJobModal(props) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [props.data]);

  async function handleSubmit(e) {
    e.id = props.data._id;
    await fetch("/api/jobs", {
      method: "put",
      body: JSON.stringify(e),
    });
    props.close();
  }

  async function deleteListing() {
    await fetch("/api/jobs", {
      method: "delete",
      body: JSON.stringify(props.data._id),
    });
    props.close();
  }

  return (
    <Modal
      visible={props.visible}
      title={`Edit Listing: ${props.data.title}`}
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
        name="edit-job"
        onFinish={handleSubmit}
        hideRequiredMark
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true }]}
          initialValue={props.data.title}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true }]}
          initialValue={props.data.location}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
          initialValue={props.data.description}
        >
          <Input.TextArea rows={8} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 4,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "8px" }}
          >
            Save
          </Button>
          <Button
            type="default"
            htmlType="button"
            onClick={deleteListing}
            danger
          >
            Delete
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
