const units = [
  "",
  "một",
  "hai",
  "ba",
  "bốn",
  "năm",
  "sáu",
  "bảy",
  "tám",
  "chín",
];
const teens = [
  "mười",
  "mười một",
  "mười hai",
  "mười ba",
  "mười bốn",
  "mười lăm",
  "mười sáu",
  "mười bảy",
  "mười tám",
  "mười chín",
];
const tens = [
  "",
  "mười",
  "hai mươi",
  "ba mươi",
  "bốn mươi",
  "năm mươi",
  "sáu mươi",
  "bảy mươi",
  "tám mươi",
  "chín mươi",
];
const thousands = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ", "triệu tỷ", "tỷ tỷ"];

function convertThreeDigits(number: number): string {
  let str = "";
  const hundred = Math.floor(number / 100);
  const remainder = number % 100;

  if (hundred > 0) {
    str += units[hundred] + " trăm ";
  }
  if (remainder >= 10 && remainder < 20) {
    str += teens[remainder - 10];
  } else {
    const ten = Math.floor(remainder / 10);
    const unit = remainder % 10;
    if (ten > 0) {
      str += tens[ten] + " ";
    }
    if (unit > 0) {
      if (ten === 0 && hundred > 0) {
        str += "lẻ ";
      }
      // Sử dụng "lăm" thay vì "năm" khi đứng sau hàng chục
      if (unit === 5 && ten > 0) {
        str += "lăm";
      } else {
        str += units[unit];
      }
    }
  }
  return str.trim();
}

function numberToWords(number: number): string {
  if (number === 0) return "không đồng";
  let numStr = number.toString().replace(/[,.\s]/g, "");

  const numArray: number[] = [];
  while (numStr.length > 0) {
    numArray.unshift(parseInt(numStr.slice(-3), 10));
    numStr = numStr.slice(0, -3);
  }

  let words = "";
  for (let i = 0; i < numArray.length; i++) {
    if (numArray[i] > 0) {
      const thousandIndex = numArray.length - 1 - i;
      const thousandWord =
        thousandIndex < thousands.length ? thousands[thousandIndex] : "";
      words += convertThreeDigits(numArray[i]) + " " + thousandWord + " ";
    }
  }

  return words.trim() + " đồng";
}

export default numberToWords;
