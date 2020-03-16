const getParent = (i, total, spread) => {
  const r = Math.floor(total * Math.random() * 0.8);
  const noParent = Math.random() < 0.01;
  return noParent || i === r ? null : r;
};

const getData = ({ total, spread }) => {
  let data = [];
  for (let i = 0; i < total; i++) {
    data.push({
      id: i,
      name: "node " + i,
      parent: getParent(i, total, spread)
    });
  }
  return data;
};

let fiCache = {};
const findItems = (value, data) => {
  if (!(value || value.trim())) return [];
  if (fiCache[value]) return fiCache[value];
  let res = data.filter(({ name }) => {
    return name.includes(value);
  });
  fiCache[value] = res;
  return res;
};

export { getData, findItems };
