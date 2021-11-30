import { Button, Col, Form, Input, Radio, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { bug_report_str } from "../../bug_report";

type issuesType = 'bug' | 'feat' | 'faq'
const repositoryList = [{
  name: "React Vant",
  repository: "https://github.com/3lang3/react-vant",
  open: true
}, {
  name: "React Vant Cli",
  repository: "",
  open: false
}]
type formType = {
  DesiredResult: string
  Device: string
  ReactVantVersion: string
  ReactVersion: string
  ReproduceLink: string
  StepsToReproduce: string
  description: string
  issuesTitle: string
  issuesType: issuesType
  other: string
  repository: string
}
const RVant = () => {
  const { TextArea } = Input
  const [form, setForm] = useState<Record<string, any>>({})
  const [issuesType, setIssuesType] = useState<issuesType>('bug')
  const [rvantVersions, setRvantVersions] = useState<Array<string>>([])
  const [reactVersions, setReactVersions] = useState<Array<string>>([])
  useEffect(() => {
    fetch("https://registry.npm.taobao.org/react-vant", { mode: 'cors' }).then(response => response.json())
      .then(data => {
        if (data.versions) {
          setRvantVersions(Object.keys(data?.versions))
        }
      })
    // fetch("https://registry.npm.taobao.org/@react-vant/cli").then(response => response.json())
    //   .then(data => console.log("@react-vant/cli", data));
    fetch("https://registry.npm.taobao.org/react").then(response => response.json())
      .then(data => {
        if (data.versions) {
          setReactVersions(Object.keys(data?.versions))
        }
      });
  }, [])
  const { Option } = Select;

  const handleCreate = (values:formType) => {
    const {
      issuesTitle,
      repository,
      description,
      StepsToReproduce,
      DesiredResult,
      ReproduceLink,
      ReactVersion,
      ReactVantVersion,
      other,
      Device
    } = values
    console.log("repository", repository)
    window.open(`${repository}/issues/new?title=🐛 [Component] ${issuesTitle}&body=${bug_report_str({ description,
      StepsToReproduce,
      DesiredResult,
      ReproduceLink,
      ReactVersion,
      ReactVantVersion,
      Device,
      other })}`)
  }

  function onSearch(val: any) {
    console.log('search:', val);
  }

  const onFinish = (values: any) => {
    setForm(values)
    handleCreate(values)
    console.log('Success:', values);
  }
  return (
    <>
      <div className="container">
        {
          !!issuesType &&
          <>
            <p>感谢使用 React-Vant，请完整填写下面表单完成Issues提交</p>
            <p>足够的信息才能帮助维护者定位问题所在，帮你解决问题</p>
          </>
        }
        <Form layout={"vertical"} onFinish={onFinish}>
          <Row gutter={[20, 20]}>
            <Col span={12} style={{ textAlign: 'left' }}>
              <Form.Item label={"请选择要提交 issue 的仓库"} required name={'repository'}
                         initialValue={"https://github.com/3lang3/react-vant"}>
                <Radio.Group>
                  {
                    repositoryList.filter((item, index) => item.open).map((item, index) => (
                      <Radio.Button value={item.repository} key={index}>{item.name}</Radio.Button>
                    ))
                  }
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12} style={{ textAlign: 'left' }}>
              <Form.Item label={"issue 类型"} required name={"issuesType"} initialValue={"bug"}>
                <Radio.Group>
                  <Radio.Button value="bug">Bug</Radio.Button>
                  <Radio.Button value="feat">Feature</Radio.Button>
                  <Radio.Button value="faq">Question</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"issue 标题"} required name={'issuesTitle'}
                         rules={[{ required: true, message: '请输入 issues 标题' }]}>
                <Input autoComplete="false" allowClear/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"设备/系统/浏览器"} required name={"Device"} rules={[{ required: true, message: "请输入组件库运行环境以 '/' 分隔，iPhone6/iOS8.1/safari" }]}>
                <Input autoComplete="false" placeholder={"请输入组件库运行环境以 '/' 分隔，iPhone6/iOS8.1/safari"}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label={"React-Vant 版本"} required name={'ReactVantVersion'} rules={[{ required: true, message: '请选择 React-Vant 版本' }]}>
                <Select
                  showSearch
                  placeholder="请选择 React-Vant 版本"
                  optionFilterProp="children"
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {
                    rvantVersions.map(item => (<Option value={item} key={item}>{item}</Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"React 版本"} required name={"ReactVersion"}>
                <Select
                  showSearch
                  placeholder="请选择 React 版本"
                  optionFilterProp="children"
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {
                    reactVersions.map(item => (<Option value={item} key={item}>{item}</Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label={"复现链接"} name={"ReproduceLink"}>
                <Input autoComplete="false"/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <p dangerouslySetInnerHTML={{
                  __html: `如果重现不需要构建工具，请提供一个尽可能精简的
        <a href="https://jsbin.com/?html,output" target="_blank">JsBin</a> 或者是
        <a href="https://codepen.io/" target="_blank">CodePen</a> 链接。
        如果需要构建工具，可以使用
        <a href="https://codesandbox.io/s/m5v3f" target="_blank">CodeSandbox</a>
        或是提供一个 GitHub 仓库的链接。`
                }}/>
                <p dangerouslySetInnerHTML={{ __html: `请不要乱填一个链接，这会导致你的 issue 被直接关闭。` }}/>
                <span dangerouslySetInnerHTML={{
                  __html: `截图可以使用免费图床
                    <a href="https://sm.ms/" target="_blank">sm.ms</a>
                `
                }}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>

          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label={"🐛 漏洞描述 (Bug description)"} required name={"description"}>
                <TextArea rows={5}
                          placeholder={"详细地描述 bug，让大家都能理解.\nDescribe the bug in detail for everyone to understand."}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"🐾 复现步骤 (Steps to reproduce)"} required name={'StepsToReproduce'}>
                <TextArea rows={5}
                          placeholder={"清晰描述复现步骤（最好是 gif 或者视频），让大家轻松复现问题.\n\nClearly describe the reproduction steps (gif or video is best), so that everyone can easily reproduce the problem."}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label={"🌈 想要的结果 (Desired result)"} name={"DesiredResult"}>
                <TextArea rows={5}
                          placeholder={"描述你原本期望看到的结果.\n" +
                          "\n" +
                          "Describe what you expected to see."}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"🔖 其他 (Other)"} name={'other'}>
                <TextArea rows={5}
                          placeholder={"如其他信息可以贴在这里.\n" +
                          "\n" +
                          "If other information can be posted here."}/>
              </Form.Item>
            </Col>
          </Row>
          {/*TODO 富文本*/}
          {/*<Form.Item style={{ textAlign: "center" }}>*/}
          {/*  <Editor editorState={editorState} onChange={setEditorState} />*/}
          {/*</Form.Item>*/}
          <Form.Item style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit">
              提交 issues
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}
export default RVant
