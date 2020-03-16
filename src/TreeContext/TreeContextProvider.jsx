import React, { useState } from "react";
import memoize from "lodash.memoize";
import TreeContext from "./TreeContext";

const getItem = (id, itemID, data) => {
  return data.find(item => {
    const { [itemID]: itemKey } = item;
    return itemKey === id;
  });
};

const getParents = memoize((id, parentSelector, itemID, data) => {
  let currentItem = getItem(id, itemID, data);
  let parents = [];
  let depth = 0;
  while (currentItem && currentItem.parent !== null && depth++ < 20) {
    currentItem = getItem(parentSelector(currentItem), itemID, data);
    if (currentItem) parents.push(currentItem[itemID]);
  }
  return parents;
});

const getChildrenItems = memoize((id, data, selector) => {
  return selector(id, data);
});

const getChildren = memoize((id, data, selector, itemID) =>
  getChildrenItems(id, data, selector).map(item => {
    const { [itemID]: childrenID } = item;
    return childrenID;
  })
);

const TreeContextProvider = ({
  data,
  children,
  itemID,
  childrenSelector,
  parentSelector
}) => {
  const [itemState, setItemState] = useState({});
  const rootItems = data.filter(({ parent }) => parent === null);

  const expandAll = () => {
    setItemState(data.reduce((obj, { id }) => ({ ...obj, [id]: true }), {}));
  };

  const collapseAll = () => {
    setItemState({});
  };

  const expandItem = id => {
    const newItemState = {
      ...itemState,
      ...getParents(id, parentSelector, itemID, data).reduce(
        (obj, id) => ({ ...obj, [id]: true }),
        {
          [id]: true
        }
      )
    };
    setItemState(newItemState);
  };

  const expandOnlyItems = ids => {
    setItemState(
      ids.reduce(
        (obj, id) => ({
          ...obj,
          ...getParents(id, parentSelector, itemID, data).reduce(
            (obj, parent) => ({ ...obj, [parent]: true }),
            {}
          ),
          [id]: true
        }),
        {}
      )
    );
  };

  const getExpandedItems = () => {
    return data.reduce((expanded, item) => {
      return isItemExpanded(item[itemID])
        ? [...expanded, item[itemID]]
        : expanded;
    }, []);
  };

  const isItemExpanded = id => {
    return itemState[id] || false;
  };

  const collapseItem = id => {
    setItemState({ ...itemState, [id]: false });
  };

  const toggleItem = id => {
    const expanded = isItemExpanded(id);
    if (expanded) collapseItem(id);
    else expandItem(id);
  };

  const isItemFinal = id => {
    return getChildren(id, data, childrenSelector).length === 0;
  };

  return (
    <TreeContext.Provider
      value={{
        isItemExpanded,
        toggleItem,
        getItem,
        getChildren: id => getChildren(id, data, childrenSelector),
        getChildrenItems: id =>
          getChildrenItems(id, data, childrenSelector, itemID),
        collapseAll,
        expandAll,
        expandOnlyItems,
        rootItems,
        data,
        isItemFinal,
        expandItem,
        getParents: id => getParents(id, parentSelector, itemID, data),
        getExpandedItems
      }}
    >
      {children}
    </TreeContext.Provider>
  );
};

export default TreeContextProvider;
