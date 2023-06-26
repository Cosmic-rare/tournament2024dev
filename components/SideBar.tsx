import React from "react";
import { Layout } from "antd";

interface SideBarProps {
  menu: React.ReactNode;
}

const SideBar: React.FC<SideBarProps> = ({ menu }) => {
  return (
    <Layout.Sider
      className="sidebar"
      breakpoint={"lg"}
      theme="light"
      collapsedWidth={0}
      trigger={null}
    >
      {menu}
    </Layout.Sider>
  );
};
export default SideBar;