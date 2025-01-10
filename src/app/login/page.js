"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useForm } from "antd/lib/form/Form";
import { Col, Form, Row } from "antd";
import logoSmall from "@/assets/PTR_icon_red.png";
import Image from "next/image";
import { Text } from "@/components/Text";
import GoogleBtn from "@/components/GoogleBtn";

export default function Page() {
  const [form] = useForm();

  const { data: session, status } = useSession();
  if (status === "loading") return <h1> loading... please wait</h1>;

  if (status === "authenticated") {
    return (
      <div className="flex flex-col justify-items-center items-center ">
        Sign in as {session.user.email}
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1B1D36] to-[#131419]">
      <div className="flex">
        <Col
          xs={0}
          lg={12}
          className=" bg-ddos-bg bg-cover bg-center w-[500px] h-[520px] rounded-l-xl"
        />
        <Col
          xs={24}
          lg={12}
          className="flex items-center bg-white max-w-[500px] h-[520px] rounded-r-xl p-4"
        >
          <Form form={form} className="w-full">
            <Row gutter={[16, 16]} justify="center">
              <Col>
                <Image src={logoSmall} alt="DDos Icon" width={72} height={72} />
              </Col>
            </Row>
            <Row gutter={[16, 16]} justify="center">
              <Col>
                <Text h2 className="text-normal">
                  Welcome to DDos Dashboard
                </Text>
              </Col>
            </Row>
            <Row gutter={[16, 16]} justify="center">
              <Col>
                <Text small12 className="text-grey">
                  Sign in to your account
                </Text>
              </Col>
            </Row>
            <Row gutter={[16, 16]} className="p-6" justify="center">
              <Col>
                <GoogleBtn />
              </Col>
            </Row>
          </Form>
        </Col>
      </div>
      <div className="flex flex-col items-center mt-8">
        <Text small12 className="text-placeholder">
          © 2024 Playtorium Solutions Company Limited
        </Text>
        <Text small12 className="text-placeholder">
          (Speed x Quality x Consistency)
        </Text>
      </div>
    </div>
  );
}
