import { Layout } from "antd";
import "./index.scss"

const Header = () => {
  const { Header } = Layout;
  return <>
    <Layout>
      <Header className="header">
        <a href="https://github.com/3lang3/react-vant">
          <div className="logo">
            <img src="https://img01.yzcdn.cn/vant/logo.png" alt=""/>
            <span>React Vant</span>
          </div>
        </a>
      </Header>
    </Layout>
  </>
}
export default Header
