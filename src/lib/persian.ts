const enDigits = ['0','1','2','3','4','5','6','7','8','9']
export function toEnglishNumbers(n:Number) {
    return n.toString().replace(/\d/g, (x) => enDigits[parseInt(x)]);
  }
export default function toLocalDateShort(date:Date){
    return new Date(date).toLocaleDateString("fa-IR")
}
