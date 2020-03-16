import React, { useEffect } from "react";
import { useTree } from "../TreeContext";
import SubTree from "./SubTree";
import { useSearch } from "../SearchContext";

const Tree = () => {
  const { rootItems, expandOnlyItems } = useTree();
  const { results } = useSearch();

  useEffect(() => {
    expandOnlyItems(results.map(({ id }) => id));
  }, [results]);

  return (
    <div className="tree">
      <SubTree items={rootItems} />
    </div>
  );
};

export default Tree;
