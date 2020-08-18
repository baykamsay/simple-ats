import React from "react";
import { Modal, Button, Form, Input } from "antd";

const layout = {
  labelCol: { sm: { span: 4 }, xl: { span: 6 } },
  wrapperCol: { sm: { span: 16 }, xl: { span: 12 } },
};

export default function AddJobModal(props) {
  async function handleSubmit(e) {
    // change this
    // const res = await fetch("/api/jobs", {
    //   method: "post",
    //   body: JSON.stringify(e),
    // });
    props.close();
  }
  return (
    <Modal
      visible={props.visible}
      title="Job Listing" // change this
      onOk={props.close}
      onCancel={props.close}
      footer={null}
      width="80vw"
      // bodyStyle={{ height: "80vh" }}
      centered
    >
      <Form {...layout} name="edit-job" onFinish={handleSubmit}>
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
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
