/** 메시지 고유 ID 생성 */
export const createId = () => Date.now() + Math.random()

/** 스크롤을 맨 아래로 이동 */
export const scrollToBottom = (timeout = 100) => setTimeout(() => window.scrollTo(0, document.body.scrollHeight), timeout)
