import React from "react";
import { Menu } from "antd";

interface TopicMenuProps {
  topics: string[];
  selectedKey: string;
  changeSelectedKey: (event: any) => void;
}

const TopicMenu: React.FC<TopicMenuProps> = ({
  topics,
  selectedKey,
  changeSelectedKey,
}) => {
  const styledTopics: JSX.Element[] = [];
  topics.forEach((topic, index) =>
    styledTopics.push(
      <Menu.Item key={index} onClick={changeSelectedKey}>
        {topic}
      </Menu.Item>
    )
  );

  return (
    <Menu mode="inline" selectedKeys={[selectedKey]}>
      {styledTopics}
    </Menu>
  );
};

export default TopicMenu;
