import { FC, useState } from 'react'
import type { Tab } from '../types/ui'
import type { MessageEntry } from '../types/message'

interface MessageTableProps {
  selectedTab: Tab
  messages: MessageEntry[]
}

const MessageTable: FC<MessageTableProps> = ({ selectedTab, messages }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <table className={selectedTab}>
      <tbody>
        {messages.map((entry) => (
          <tr key={entry.id} className={entry.category}>
            {expanded ? (
              <td
                onClick={() => setExpanded(false)}
                className="sender"
                title={entry.originalSender}
                dangerouslySetInnerHTML={{ __html: entry.sender }}
              />
            ) : (
              <td onClick={() => setExpanded(true)} className="sender fold" title={entry.originalSender}>
                {entry.originalSender.split(' ')[0]}
              </td>
            )}
            <td
              className="message"
              dangerouslySetInnerHTML={{ __html: entry.message }}
            />
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default MessageTable
