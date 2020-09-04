import React, { useEffect } from "react";
import Router from "next/router";
import cookie from "js-cookie";
import Head from "next/head";
import { Layout, Form, Input, Button, message, Typography } from "antd";

const { Text } = Typography;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const { Content, Footer } = Layout;

const Login = () => {
  function handleSubmit(e) {
    const username = e.username;
    const password = e.password;
    //call api
    fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((r) => {
        return r.json();
      })
      .then(async (data) => {
        if (data && data.error) {
          message.error(data.message);
        }
        if (data && data.token) {
          //set cookie
          cookie.set("token", data.token, {
            expires: 2,
            secure: true,
            sameSite: "strict",
          });
          Router.push("/ats");
        }
      });
  }

  useEffect(() => {
    Router.prefetch("/ats");
  }, []);

  return (
    <div>
      <Head>
        <title>Login - Simple ATS</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Layout style={{ minHeight: "100vh" }}>
        <Content
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Form
            {...layout}
            name="basic"
            onFinish={handleSubmit}
            style={{
              backgroundColor: "#fff",
              padding: 24,
              borderRadius: 4,
              boxShadow: "2px 2px 6px -3px rgba(0,0,0,0.15)",
            }}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            <Text>
              Demo Username: guest <br /> Demo Password: guest
            </Text>
          </Form>
        </Content>
        <Footer style={{ textAlign: "center" }}>Baykam Say ©2020</Footer>
      </Layout>
    </div>
  );
};

export default Login;
