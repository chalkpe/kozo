import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAtom } from 'jotai'
import MessageTable from './components/MessageTable'
import { tabs } from './constants/ui'
import api from './functions/api'
import { highlight } from './functions/lang'
import createTranslator from './functions/translate'
import { createId, scrollToBottom } from './functions/ui'
import { getMessageCategoryByType, isCombatType } from './functions/xiv'
import useOverlayPlugin from './hooks/useOverlayPlugin'
import { autoTranslateAtom, geminiApiKeyAtom, isTransparentAtom } from './stores/settings'
import type { MessageEntry } from './types/message'
import type { EventMap } from './types/overlay'
import type { Tab } from './types/ui'

function App() {
  // 메시지 목록 상태
  const [messages, setMessages] = useState<MessageEntry[]>([])
  const appendMessage = useCallback((entry: MessageEntry) => setMessages((messages) => [...messages, entry]), [])
  const updateMessage = useCallback(
    (id: number, entry: Partial<MessageEntry>) => setMessages((messages) => messages.map((e) => (e.id === id ? { ...e, ...entry } : e))),
    [],
  )

  // 탭 관련 상태
  const [selectedTab, setSelectedTab] = useState<Tab>(tabs[0].value)
  const changeTab = useCallback((tab: Tab) => {
    setSelectedTab(tab)
    scrollToBottom()
  }, [])
  const currentMessages = useMemo(
    () => (selectedTab === 'all' ? messages : messages.filter((entry) => entry.category === selectedTab)),
    [messages, selectedTab],
  )

  // 소켓 메시지 수신 처리
  const onMessage: EventMap['LogLine'] = useCallback(
    async (event) => {
      if (parseInt(event.line[0], 10) !== 0) return

      const [type, sender, message] = [parseInt(event.line[2], 16), event.line[3], event.line[4]]
      if (isCombatType(type)) return

      const id = createId()
      const category = getMessageCategoryByType(type)

      appendMessage({
        id,
        type,
        category,
        sender,
        originalSender: sender,
        message,
        originalMessage: message,
      })

      await Promise.all([
        api(message).then((text) => updateMessage(id, { message: highlight(text) })),
        sender ? api(sender).then((text) => updateMessage(id, { sender: highlight(text) })) : Promise.resolve(),
      ])

      scrollToBottom()
    },
    [appendMessage, updateMessage],
  )

  // 오버레이 플러그인과 연결
  useOverlayPlugin({ onMessage })

  // 배경 투명화 상태
  const [isTransparent, setIsTransparent] = useAtom(isTransparentAtom)

  useEffect(() => {
    if (isTransparent) document.body.classList.add('transparent')
    else document.body.classList.remove('transparent')

    return () => {
      document.body.classList.remove('transparent')
    }
  }, [isTransparent])

  // Gemini API 키 상태
  const [geminiApiKey, setGeminiApiKey] = useAtom(geminiApiKeyAtom)
  const translate = useMemo(() => (geminiApiKey ? createTranslator({ apiKey: geminiApiKey }) : null), [geminiApiKey])

  // 번역
  const updateTranslation = useCallback(
    (id: number) => {
      if (!translate) return

      const entryIndex = messages.findIndex((message) => message.id === id)
      if (entryIndex === -1) return

      const entry = messages[entryIndex]
      if (!entry || entry.translation) return

      updateMessage(id, { translation: '...' })
      translate(
        messages
          .slice(0, entryIndex + 1)
          .flatMap((message, index, array) =>
            message.originalTranslation || index + 1 === array.length
              ? [
                  { role: 'user', parts: [{ text: `${message.originalSender || 'システム'}: ${message.originalMessage}` }] },
                  ...(message.originalTranslation ? [{ role: 'model', parts: [{ text: message.originalTranslation }] }] : []),
                ]
              : [],
          ),
      )
        .then((text) => {
          if (text) {
            const index = text.indexOf(': ')
            const [sender, translation] = index !== -1 ? [text.slice(0, index), text.slice(index + 2)] : ['', text]
            updateMessage(id, { originalTranslation: text, sender, translation })
          }
        })
        .then(() => {
          if (messages[messages.length - 1].id === id) scrollToBottom()
        })
        .catch((err) => {
          console.error('Translation error:', err)
          updateMessage(id, { translation: '', translationError: err.message })
        })
    },
    [messages, translate, updateMessage],
  )

  // 자동 번역 상태
  const [autoTranslate, setAutoTranslate] = useAtom(autoTranslateAtom)

  useEffect(() => {
    if (autoTranslate) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage && !lastMessage.translation) {
        updateTranslation(lastMessage.id)
      }
    }
  }, [autoTranslate, messages, updateTranslation])

  return (
    <main>
      <nav className={selectedTab}>
        <ul>
          {tabs.map((tab) => (
            <li key={tab.value} className={selectedTab === tab.value ? 'selected' : ''} onClick={() => changeTab(tab.value)}>
              {tab.name}
            </li>
          ))}
        </ul>
        <ul>
          <li
            className={autoTranslate ? 'selected' : ''}
            onClick={() => setAutoTranslate((v) => !v)}
            onContextMenu={(e) => {
              e.preventDefault()
              const response = prompt('번역에 사용할 API 키를 입력하세요.\nhttps://aistudio.google.com/apikey 에서 발급받을 수 있습니다.')?.trim()
              if (response) setGeminiApiKey(response)
            }}
          >
            TR
          </li>
          <li className={isTransparent ? 'selected' : ''} onClick={() => setIsTransparent((v) => !v)}>
            BG
          </li>
        </ul>
      </nav>
      <MessageTable selectedTab={selectedTab} messages={currentMessages} translate={updateTranslation} />
    </main>
  )
}

export default App
