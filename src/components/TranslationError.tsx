import { FC, useMemo } from 'react'
import z from 'zod'

const errorSchema = z.object({
  error: z.object({
    code: z.number(),
    message: z.string(),
    status: z.string(),
    details: z.array(z.object({ '@type': z.string(), retryDelay: z.string().optional() })),
  }),
})

const units = { s: '초', m: '분', h: '시간', d: '일' }

interface TranslationErrorProps {
  translationError: string
}

const TranslationError: FC<TranslationErrorProps> = ({ translationError }) => {
  const error = useMemo(() => {
    try {
      const e = errorSchema.safeParse(JSON.parse(translationError))
      return e.success ? e.data.error : null
    } catch {
      return null
    }
  }, [translationError])

  const retryDelay = useMemo(() => {
    if (!error || error.code !== 429) return null
    const delay = error.details.find((d) => d['@type'] === 'type.googleapis.com/google.rpc.RetryInfo')?.retryDelay
    return delay?.replace(/^(\d+)([smhd])$/, (_, num, unit) => `${num}${units[unit as keyof typeof units]} 후에`)
  }, [error])

  if (!error) return <td className="translation error">{translationError}</td>
  if (error.code === 403) return <td className="translation error">접근 거부: API 키를 확인하세요.</td>
  if (error.code === 429) return <td className="translation error">한도 초과: {retryDelay ?? '잠시 후'} 다시 시도하세요.</td>

  return (
    <td className="translation error">
      {error.code} {error.status}: {error.message}
    </td>
  )
}

export default TranslationError
