export function toEnglishNumbers(farsiDate:string) {
  // Mapping of Persian digits to English digits
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  // Replace each Persian digit with its English counterpart
  return farsiDate.replace(/[۰-۹]/g, (w) => englishDigits[persianDigits.indexOf(w)]);
}
export default function toLocalDateShort(date:Date){
    return new Date(date).toLocaleDateString("fa-IR")
}
