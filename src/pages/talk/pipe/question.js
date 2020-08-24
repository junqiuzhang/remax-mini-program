// 含有‘吗’或‘？’
export const dialogReg = /.+(吗|\?|吗\?)$/g;
export const getDialog = (value) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value.replace('吗', '').replace('？', ''));
    }, 500);
  });
}
export const testDialog = () => {
  return false;
}
export const renderDialog = () => {
  return false;
}