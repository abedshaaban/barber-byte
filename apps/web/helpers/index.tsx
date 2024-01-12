/**
 *
 * @param email
 * @returns `true` if the string matches the email format
 */
export function checkEmailFormat(email: string): boolean {
  return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/) ? true : false
}
