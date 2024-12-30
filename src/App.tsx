import { useCallback, useMemo, useState } from 'react'
import MessageTable from './components/MessageTable'
import { tabs } from './constants/ui'
import api from './functions/api'
import { highlight } from './functions/lang'
import { createId, scrollToBottom } from './functions/ui'
import { getMessageCategoryByType, isCombatType } from './functions/xiv'
import useOverlayPlugin from './hooks/useOverlayPlugin'
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
  const onMessage: EventMap['LogLine']  = useCallback(async (event) => {
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
  }, [])

  // 오버레이 플러그인과 연결
  useOverlayPlugin({ onMessage })

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
      </nav>
      <MessageTable selectedTab={selectedTab} messages={currentMessages} />
    </main>
  )
}

export default App
