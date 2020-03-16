import React from "react";
import clsx from "clsx";
import SubTree from "./SubTree";

const TreeItem = ({
  value: { id, name },
  highlight,
  isFinal,
  onExpand,
  itemChildren,
  expand
}) => {
  return (
    <div className="item">
      <div className="itemActiveArea" onClick={() => !isFinal && onExpand(id)}>
        <span className="itemExpand">
          {expand && `-`}
          {!expand && !isFinal && `+`}
        </span>
        <span
          className={clsx("itemName", {
            highlight: highlight
          })}
        >
          {name}
        </span>
      </div>
      {expand && (
        <div className="itemChildren">
          <SubTree items={itemChildren} />
        </div>
      )}
    </div>
  );
};

export default TreeItem;
