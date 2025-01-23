import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Col, Form, Row } from "antd";
import logoSmall from "@/assets/PTR_icon_red.png";
import loginBg from "@/assets/ddos_bg.png";
import GoogleBtn from "@/components/GoogleBtn";

export const metadata = {
  title: "Dashboard",
  description: "DDos Dashboard by Playtorium",
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect("/dashboard");
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1B1D36] to-[#131419]">
      <div className="flex">
        <Col
          xs={0}
          lg={12}
          style={{
            backgroundImage: `url(${loginBg.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="w-[500px] h-[520px] rounded-l-xl"
        />
        <Col
          xs={24}
          lg={12}
          className="flex items-center bg-white max-w-[500px] h-[520px] rounded-r-xl p-4"
        >
          <Form className="w-full">
            <Row gutter={[16, 16]} justify="center" className="mb-2">
              <Col>
                <Image src={logoSmall} alt="DDos Icon" width={56} height={56} />
              </Col>
            </Row>
            <Row gutter={[16, 16]} justify="center">
              <Col>
                <h2 className="font-bold text-2xl">
                  Welcome to DDos Dashboard
                </h2>
              </Col>
            </Row>
            <Row gutter={[16, 16]} justify="center">
              <Col>
                <p className="text-gray-600 text-xs">Sign in to your account</p>
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
      <div className="flex flex-col items-center mt-8 text-gray-300">
        <span className="text-xs">
          © 2024 Playtorium Solutions Company Limited
        </span>
        <span className="text-xs">(Speed x Quality x Consistency)</span>
      </div>
    </div>
  );
}
