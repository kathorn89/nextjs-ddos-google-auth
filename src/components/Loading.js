import React from "react";
import { Alert, Flex, Spin } from "antd";
const contentStyle = {
  padding: 50,
  background: "rgba(0, 0, 0, 0.05)",
  borderRadius: 4,
};
const content = <div style={contentStyle} />;
const App = () => (
  <Flex gap="middle" vertical>
    <Flex gap="middle">
      <Spin tip="Loading">{content}</Spin>
    </Flex>
  </Flex>
);
export default App;
