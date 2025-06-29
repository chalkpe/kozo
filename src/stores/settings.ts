import { atomWithStorage } from 'jotai/utils'

// 배경 투명화 설정
export const isTransparentAtom = atomWithStorage('isTransparent', false)

// Gemini API 키 설정
export const geminiApiKeyAtom = atomWithStorage('geminiApiKey', '')

// 자동 번역 설정
export const autoTranslateAtom = atomWithStorage('autoTranslate', true)