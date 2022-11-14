export const transformBoxDataToBeUnique = (boxs) => {
  let data = [];
  for (let i = 0; i < boxs.length; i++) {
    if (boxs[i].boxPattern.status) {
      data.push(boxs[i]);
    }
  }
  data = data.reduce(
    (items, item) =>
      items.find((x) => x.boxPattern.id === item.boxPattern.id)
        ? [...items]
        : [...items, item],
    []
  );
  return data;
};
