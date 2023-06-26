import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";

interface NavBarProps {
  menu: React.ReactNode;
}

const NavBar: React.FC<NavBarProps> = ({ menu }) => {
  const [visible, setVisible] = useState(false);
  return (
    <nav className="navbar">
      <Button
        className="menu"
        type="primary"
        icon={<MenuOutlined />}
        onClick={() => setVisible(true)}
      />
      <Drawer
        title="Topics"
        placement="left"
        onClick={() => setVisible(false)}
        onClose={() => setVisible(false)}
        visible={visible}
      > 
        {menu}
      </Drawer>
      <Link href="/">Logo</Link>     
    </nav>
  );
};
export default NavBar;