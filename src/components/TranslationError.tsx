import { FC, useMemo } from 'react'
import z from 'zod'

const errorSchema = z.object({
  error: z.object({ code: z.number(), status: z.string(), message: z.string() }),
})

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

  if (!error) return <td className="translation error">{translationError}</td>
  if (error.code === 403) return <td className="translation error">접근 거부. API 키를 확인하세요.</td>
  if (error.code === 429) return <td className="translation error">요청 초과. 잠시 후 다시 시도하세요.</td>

  return (
    <td className="translation error">
      {error.code} {error.status}: {error.message}
    </td>
  )
}

export default TranslationError
