export type MessageCategory = 'chat' | 'system'

export interface MessageEntry {
  /** ID */
  id: number

  /** 타입 (XivChatType) */
  type: number

  /** 카테고리 */
  category: MessageCategory

  /** 발신자명 */
  sender: string

  /** 원본 발신자명 */
  originalSender: string

  /** 메시지 텍스트 */
  message: string

  /** 원본 메시지 텍스트 */
  originalMessage: string
}
