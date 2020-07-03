const getFilterStr = (arr, element) => {
  let result = '';
  arr.forEach((item) => {
    result += `${item.field}[${item.operator}]=${item.value}&`;
  });
  if (element.field !== '' && element.operator !== '' && element.field !== '') {
    result += `${element.field}[${element.operator}]=${element.value}`;
  } else {
    result = result.slice(0, result.length - 1);
  }

  return result;
};

export { getFilterStr };
