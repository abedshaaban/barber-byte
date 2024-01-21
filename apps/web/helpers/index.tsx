import { useEffect } from 'react'

/**
 *
 * @param email
 * @returns `true` if the string matches the email format
 */
export function checkEmailFormat(email: string): boolean {
  return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/) ? true : false
}


/**
 * Updates the height of a <textarea> when the value changes.
 * @param email
 * @returns `true` if the string matches the email format
 */
export const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) => {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = '0px'
      const scrollHeight = textAreaRef.scrollHeight

      textAreaRef.style.height = scrollHeight + 'px'
    }
  }, [textAreaRef, value])
}
