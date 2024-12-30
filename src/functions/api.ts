// @ts-ignore
import { Kuroshiro } from 'kuroshiro-browser'

export default (() => {
  let kuroshiro: any = null
  return async (text: string) => {
    if (!kuroshiro) kuroshiro = await Kuroshiro.buildAndInitWithKuromoji(import.meta.env.MODE === 'production')
    return kuroshiro.getFurigana(text) as Promise<string>
  }
})()
