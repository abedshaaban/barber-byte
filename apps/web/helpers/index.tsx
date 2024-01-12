export function checkEmailFormat(email: string): boolean {
  return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/) ? true : false
}
