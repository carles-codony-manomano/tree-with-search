import React from "react";
import { useTree } from "./TreeContext";

const TreeInfo = () => {
  const { getExpandedItems } = useTree();
  const expandedItems = getExpandedItems();
  return <div>{expandedItems.length}</div>;
};

export default TreeInfo;
