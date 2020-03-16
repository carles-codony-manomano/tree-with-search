import React from "react";
import TreeItem from "./TreeItem";
import { useSearch } from "../SearchContext";
import { useTree } from "../TreeContext";

const SubTree = ({ items }) => {
  const {
    data,
    toggleItem,
    isItemExpanded,
    isItemFinal,
    getChildrenItems
  } = useTree();
  const { results } = useSearch();

  return (
    <div className="subTree">
      {items.map(item => {
        return (
          <TreeItem
            data={data}
            value={item}
            key={item.id}
            isFinal={isItemFinal(item.id)}
            expand={isItemExpanded(item.id)}
            itemChildren={getChildrenItems(item.id)}
            highlight={results.find(({ id }) => id === item.id)}
            onExpand={() => {
              toggleItem(item.id);
            }}
          />
        );
      })}
    </div>
  );
};

export default SubTree;
