// 含有‘吗’‘？’
export const testGetDialog = (value) => {
  const regexp = /.+(吗|\?|吗\?)$/g;
  return regexp.test(value);
}
export const getDialog = (value) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const answer = {
        type: 'text',
        isAnswer: true,
        value: value.replace('吗', '').replace('？', '')
      };
      resolve([answer]);
    }, 500);
  });
}
export const testRenderDialog = () => {
  return false;
}
export const renderDialog = () => {
  return false;
}