// 천단위 마다 콤마 추가(ex: 1000 => 1,000)
export const formatNumber = (num) => {
  if (num === 0) {
    return "0";
  }
  if (!num) {
    return "";
  }
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

// 숫자만 입력
export const onlyNumber = (text) => {
  return text.replace(/[^0-9]/g, "");
};
