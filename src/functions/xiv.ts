import { chatTypes } from '../constants/xiv'
import type { MessageCategory } from '../types/message'

/** 전투 로그 타입인지 체크 (by Arc) */
export const isCombatType = (type: number) => {
  const t = type & 0b0111_1111
  return 41 <= t && t <= 49
}

/** 타입별 메시지 카테고리 분류 */
export const getMessageCategoryByType = (type: number): MessageCategory => {
  return chatTypes.includes(type) ? 'chat' : 'system'
}
