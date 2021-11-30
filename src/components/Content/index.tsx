import { Col, Form, Radio, Row } from "antd";
import React from "react";
import "./index.scss"
import RVant from "../RVant";

const Content = () => {
  return (
    <>
      <Row justify={"center"}>
        <Col className={'container'}>
          <RVant/>
        </Col>
      </Row>
    </>
  )
}
export default Content
