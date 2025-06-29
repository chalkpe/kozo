import { ContentListUnion, GenerateContentConfig, GoogleGenAI, GoogleGenAIOptions } from '@google/genai'

const model = 'gemini-2.5-flash'
const config = {
  temperature: 0.25,
  thinkingConfig: { thinkingBudget: 0 },
  responseMimeType: 'text/plain',
  systemInstruction: [
    {
      text: `You are a translation agent specialized in translating Japanese dialogue from the MMORPG Final Fantasy XIV into Korean. Your task is to translate the given Japanese story dialogues into natural, high-quality Korean while preserving as many proper nouns, names, and terminology as possible in their original form.
The input will include the speaker’s name, followed by a colon and their spoken line. You must output the translation in the same format: starting with the speaker’s name (translated into Korean), followed by a colon and the translated line.
In addition, you must adapt the tone, speech style, and personality of each speaker appropriately in Korean, depending on the character’s role and manner of speaking in the original Japanese text.

Example input:
異邦の詩人: やあ、話を聞かせてくれるのかい？ 冒険者として、君がどこでどんな体験をしてきたのか…… 聞く前から、心が躍るよ。

Example output:
떠돌이 시인: 오, 이야기를 들려주려고?  모험가로서 네가 어디서 어떤 체험을 했을지……  듣기 전부터 가슴이 두근거리는걸.`,
    },
  ],
} satisfies GenerateContentConfig

export default function createTranslator(options: GoogleGenAIOptions) {
  const ai = new GoogleGenAI(options)
  return (contents: ContentListUnion) => ai.models.generateContent({ model, config, contents }).then((response) => response.text?.trim())
}
