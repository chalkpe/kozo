import { FC } from 'react'
import type { Tab } from '../types/ui'
import type { MessageEntry } from '../types/message'

interface MessageTableProps {
  selectedTab: Tab
  messages: MessageEntry[]
  translate: (id: number) => void
}

const MessageTable: FC<MessageTableProps> = ({ selectedTab, messages, translate }) => {
  return (
    <table className={selectedTab}>
      <tbody>
        {messages.map((entry) => (
          <tr key={entry.id} className={entry.category}>
            <td className={'sender fold' + (entry.sender.includes('<ruby>') ? ' ruby' : '')} title={entry.originalSender}>
              {entry.originalSender !== entry.sender ? (
                <span className="translation" dangerouslySetInnerHTML={{ __html: entry.sender === '시스템' ? '' : entry.sender }} />
              ) : (
                entry.originalSender
              )}
            </td>
            <td
              className={'message' + (entry.message.includes('<ruby>') ? ' ruby' : '')}
              colSpan={entry.translation ? 1 : 2}
              dangerouslySetInnerHTML={{ __html: entry.message }}
              onClick={() => translate(entry.id)}
            />
            {entry.translation && <td className="translation">{entry.translation}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default MessageTable
