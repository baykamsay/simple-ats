import React, { useEffect } from "react";
import { Modal, Button, Form, Input } from "antd";

const layout = {
  labelCol: { sm: { span: 4 }, xl: { span: 6 } },
  wrapperCol: { sm: { span: 16 }, xl: { span: 12 } },
};

export default function EditJobModal(props) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [props.data]);

  async function handleSubmit(e) {
    e.id = props.data._id;
    const res = await fetch("/api/jobs", {
      method: "put",
      body: JSON.stringify(e),
    });
    props.close();
  }

  async function deleteListing() {
    const res = await fetch("/api/jobs", {
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
      width="80vw"
      // bodyStyle={{ height: "80vh" }}
      centered
      forceRender
    >
      <Form form={form} {...layout} name="edit-job" onFinish={handleSubmit}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true }]}
          initialValue={props.data.title}
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
            sm: { ...layout.wrapperCol, offset: 4 },
            xl: { ...layout.wrapperCol, offset: 6 },
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
