import React, { useState } from "react";
import { Layout } from "antd";

import TopicMenu from "@/components/TopicMenu";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";

function App() {
  const topics: string[] = ["First topic", "Second topic", "Third topic"];
  const [contentIndex, setContentIndex] = useState<number>(0);
  const [selectedKey, setSelectedKey] = useState<string>("0");
  const changeSelectedKey = (event: any) => {
    const key = event.key;
    setSelectedKey(key);
    setContentIndex(+key);
  };
  const Menu = (
    <TopicMenu
      topics={topics}
      selectedKey={selectedKey}
      changeSelectedKey={changeSelectedKey}
    />
  );
  return (
    <div className="App">
      <NavBar menu={Menu} />
      <Layout>
        <SideBar menu={Menu} />
        <Layout.Content className="content">
          {topics[contentIndex]}
        </Layout.Content>
      </Layout>
    </div>
  );
}

export default App;
