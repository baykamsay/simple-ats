import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import listingStyles from "../../styles/ListingsPage.module.css";
import {
  Row,
  Col,
  Spin,
  Form,
  Input,
  Button,
  Divider,
  message,
  Upload,
} from "antd";
import { useRouter } from "next/router";
import useSWR from "swr";
import fetch from "isomorphic-unfetch";
import ReactMarkdown from "react-markdown";

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

function Jobs() {
  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`/api/jobListing/${id}`, async function (
    args
  ) {
    const res = await fetch(args);
    return res.json();
  });

  async function handleSubmit(e) {
    e.listing = id;
    const eString = JSON.stringify(e, (k, v) => (v === undefined ? null : v));
    await fetch("/api/applicants", {
      method: "post",
      body: eString,
    });
    form.resetFields();
    message.success("Your application has been submitted");
  }

  if (error)
    return (
      <div>
        This page does not exist,{" "}
        <Link href="/jobs">
          <a>click here to go back.</a>
        </Link>
      </div>
    );
  if (!data)
    return (
      <div className={styles.container}>
        <Spin size="large" />
      </div>
    );

  return (
    <div className={styles.container} {...listingStyles}>
      <Head>
        <title>Jobs</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <Row style={{ paddingTop: "4rem" }} justify="center" align="top">
          <Col xs={{ span: 20 }} lg={{ span: 10 }}>
            <h1>{data.title}</h1>
            <h5>{data.location}</h5>
            <ReactMarkdown source={data.description} />
            <Divider style={{ margin: "3rem 0" }} />
            <h3>Apply For This Job</h3>
            <Form
              form={form}
              {...layout}
              name="insert-applicant"
              onFinish={handleSubmit}
              validateMessages={validateMessages}
              style={{ maxWidth: "600px" }}
            >
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
              <Form.Item
                name="linkedin"
                label="LinkedIn"
                rules={[{ type: "url" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="website"
                label="Website"
                rules={[{ type: "url" }]}
              >
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
                  Submit Application
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/baykamsay/simple-ats"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
        </a>
      </footer>
    </div>
  );
}

export default Jobs;
