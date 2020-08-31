import React, { useEffect } from "react";
import { Modal, Descriptions, Form, Input, Button, Rate, Select } from "antd";
import fetch from "isomorphic-unfetch";
import { saveAs } from "file-saver";

export default function ViewApplicantModal(props) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [props.data]);

  async function handleSubmit(e) {
    e.id = props.data._id;
    await fetch("/api/applicants", {
      method: "put",
      body: JSON.stringify(e),
    });
    props.close();
  }

  async function deleteApplicant() {
    await fetch("/api/applicants", {
      method: "delete",
      body: JSON.stringify(props.data._id),
    });
    props.close();
  }

  async function downloadCV() {
    const res = await fetch(`/api/cv/${props.data.cv}`);
    let resJson = await res.json();
    const arr = new Uint8Array(resJson.file.data);

    let blob = new Blob([arr], { type: "application/pdf" });
    saveAs(blob, "cv.pdf");
  }

  return (
    <Modal
      visible={props.visible}
      title={props.data.name}
      onOk={props.close}
      onCancel={props.close}
      footer={null}
      width={600}
      centered
      forceRender
    >
      <Form
        form={form}
        name="edit-applicant"
        onFinish={handleSubmit}
        hideRequiredMark
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Stage">
            <Form.Item
              style={{ margin: 0 }}
              name="stage"
              initialValue={props.data.stage}
              required
            >
              <Select bordered={false}>
                {props.pipeline.map((stage, i) => (
                  <Select.Option key={i} value={stage}>
                    {stage}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            <a href={`mailto:${props.data.email}`}>{props.data.email}</a>
          </Descriptions.Item>
          <Descriptions.Item label="CV">
            <Button
              type="link"
              onClick={downloadCV}
              style={{ margin: 0, padding: 0 }}
            >
              Download
            </Button>
          </Descriptions.Item>
          <Descriptions.Item label="Phone">
            {props.data.phone ? (
              <a href={`tel:${props.data.phone}`}>{props.data.phone}</a>
            ) : (
              "-"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="LinkedIn">
            {props.data.linkedin ? (
              <a href={props.data.linkedin} target="_blank" rel="noreferrer">
                {props.data.linkedin}
              </a>
            ) : (
              "-"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Website">
            {props.data.website ? (
              <a href={props.data.website} target="_blank" rel="noreferrer">
                {props.data.website}
              </a>
            ) : (
              "-"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Introduction">
            {props.data.introduction ? props.data.introduction : "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Notes">
            <Form.Item
              style={{ margin: 0 }}
              name="notes"
              initialValue={props.data.notes}
            >
              <Input.TextArea
                bordered={false}
                style={{ padding: 0, margin: 0 }}
              />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="Rating">
            <Form.Item
              style={{ margin: 0 }}
              name="rating"
              initialValue={props.data.rating}
            >
              <Rate />
            </Form.Item>
          </Descriptions.Item>
        </Descriptions>
        <div style={{ textAlign: "end", marginTop: "1rem" }}>
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
            onClick={deleteApplicant}
            danger
          >
            Delete
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
