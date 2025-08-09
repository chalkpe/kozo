import { describe, expect, test, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import App from './App'
import { useEffect } from 'react'
import type { UseOverlayPluginProps } from './hooks/useOverlayPlugin'
import { ContentListUnion } from '@google/genai'

const { messages, translations } = vi.hoisted(() => ({
  messages: [
    '00|2025-08-09T21:38:26.0000000+09:00|003D|ウケブ|ん……？ なんだ、お前たちは。|d50593d13215dad8',
    '00|2025-08-09T21:38:35.0000000+09:00|003D|ウクラマト|挨拶、挨拶……。|a2b3847b2a1b1d4f',
    '00|2025-08-09T21:38:46.0000000+09:00|003D|ウクラマト|オフォカリー！|794f7e3ab8126254',
    '00|2025-08-09T21:38:57.0000000+09:00|003D|ウケブ|オフォカリー！！|4a9ec0de58c2d342',
    '00|2025-08-09T21:39:12.0000000+09:00|003D|ウケブ|……どうやら、礼儀はわきまえているようだな。|bef6c66f804d632e',
    '00|2025-08-09T21:39:28.0000000+09:00|003D|ウケブ|郷に入っては郷に従え。 トライヨラが多部族国家であるからこそ、 それぞれの部族が大切にしてきた文化を尊重すべきなのだ。|fa143282ebefb56b',
    '00|2025-08-09T21:39:36.0000000+09:00|003D|ウクラマト|……そうか。 だからお前は、ハヌハヌ族の文化にも詳しいんだな。|9fdc73d248c7b225',
    '00|2025-08-09T21:39:45.0000000+09:00|003D|ウクラマト|たしかに、お前の言うとおりだ。 ともに生きるってことは、 お互いのことを知るってことなのかもしれねぇ。|ae80e80f91bd1a91',
    '00|2025-08-09T21:39:51.0000000+09:00|003D|ウケブ|ほう、柔軟な考え方をする。|a847d15b67bc7d08',
    '00|2025-08-09T21:39:57.0000000+09:00|003D|ウケブ|そういえば、君の姿……見覚えがあるような。|1cb65302608e3887',
    '00|2025-08-09T21:40:04.0000000+09:00|003D|ウケブ|って、ウクラマト王女ぉぉぉ！？|415cae40182325ba',
    '00|2025-08-09T21:40:22.0000000+09:00|003D|ウケブ|ま、まさか第一王女が、このようなところにおいでとは！ このウケブ、礼儀を語っておきながら、 王族の方に無礼を働くとは……弁解のしようもございません！|6f9da5bfc3a96a5d',
    '00|2025-08-09T21:40:26.0000000+09:00|003D|ウケブ|ど、どうかその斧で、ひと思いにこの首を……！！|7e9cb4d50a7bdbb4',
    '00|2025-08-09T21:40:32.0000000+09:00|003D|ウクラマト|怖ぇこと言うんじゃねぇよ！|b80fced78f4ed63f',
    '00|2025-08-09T21:40:35.0000000+09:00|003D|ウクラマト|ま、気にすんな！ アタシは堅苦しいことは嫌いなんだ！|d934fa2fe4108ab9',
    '00|2025-08-09T21:40:42.0000000+09:00|003D|ウケブ|そうですか、では気にしません。|0c3468dc606e9587',
    '00|2025-08-09T21:40:48.0000000+09:00|003D|クルル|切り替えが早いわね……。|8d7cb436c75acd41',
    '00|2025-08-09T21:41:03.0000000+09:00|003D|ウクラマト|実は、イヒーハナ祭に使う神輿が壊れちまって。 新しい担ぎ棒と眼を作ってほしいんだよ。 ウユイポの木と、アボキシャって石を使うんだろ？|aa271e98f581f313',
    '00|2025-08-09T21:41:13.0000000+09:00|003D|ウケブ|ええ、そうです。 喜んで協力させていただきたいところですが…… その材料が底をついておりましてな。|85fd7e6aabf0fb61',
    '00|2025-08-09T21:41:26.0000000+09:00|003D|ウケブ|先の大嵐で被害を受けた家屋の修理に、 ウユイポ材を使い果たしてしまったのですよ。 アボキシャと合わせて、調達には10日ほど必要でしょう。|2c7cb0dd911efac7',
    '00|2025-08-09T21:41:33.0000000+09:00|003D|ウクラマト|悪いが、それじゃ遅いんだ。 場所を教えてくれよ、アタシが採ってくるからさ。|31fd64d871748676',
    '00|2025-08-09T21:41:45.0000000+09:00|003D|ウケブ|そ、そんな！ 王女を使いぱしりのように扱うなど……！！ 礼儀を重んじるこのウケブには、到底できぬ相談です！|ff4f319aa1c9fddd',
    '00|2025-08-09T21:41:46.0000000+09:00|003D|ウクラマト|だから、気にすんなって言っただろ！|4931170dc82e0242',
    '00|2025-08-09T21:41:52.0000000+09:00|003D|ウケブ|そうですか、では気にしません。|78b615e732c7ac5e',
    '00|2025-08-09T21:42:04.0000000+09:00|003D|ウケブ|ところで、そちらのハヌハヌ族は？|7e7dbd298c01ea1e',
    '00|2025-08-09T21:42:12.0000000+09:00|003D|リヌハヌ|俺は次のイヒーハナ祭のまとめ役だ。 神輿を修理するために同行してる。|6ec52985c5f44557',
    '00|2025-08-09T21:42:22.0000000+09:00|003D|リヌハヌ|本当かどうか眉唾だが、ウクラマトたちの話では、 あれは葦の不作を解決するための魔具でもあるって話だしな。|6c3949df3a0fc7bc',
    '00|2025-08-09T21:42:37.0000000+09:00|003D|ウケブ|ほう、イヒーハナ祭の真の意味をご存じとは。 昨今では、ハヌハヌ族でも知らぬ者が多いというのに、 さすがは王女ですな。|e8ed76a36bc961eb',
    '00|2025-08-09T21:42:48.0000000+09:00|003D|ウクラマト|ま、まぁ……な！|6d524a2b3eac92de',
    '00|2025-08-09T21:42:55.0000000+09:00|003D|ウケブ|ウユイポの木が伐採できる場所には、 私が案内しましょう。|3d242156f6f1a583',
    '00|2025-08-09T21:43:08.0000000+09:00|003D|ウケブ|アボキシャの方は、お仲間に任せてもよろしいですかな？ キキトラ洞のあたりを探せば、必要なぶんは採れるでしょう。|81c7bc397b218e1d',
    '00|2025-08-09T21:43:22.0000000+09:00|003D|リヌハヌ|あそこなら、何度か行ったことがある。 俺が案内するよ。|19672045ca05add7',
    '00|2025-08-09T21:43:28.0000000+09:00|003D|クルル|ええ、お願いね。|7ae424602459bfaa',
    '00|2025-08-09T21:43:35.0000000+09:00|003D|ウクラマト|よーし！ そうと決まれば、行動開始だ！|9687995cd4f083e4',
    '00|2025-08-09T21:44:05.0000000+09:00|003D|ドプロ族の妖賢士|お頭。 面白い話が聞けましたぜ。|2bf74b7a9a0950ff',
    '00|2025-08-09T21:44:17.0000000+09:00|003D|戦のバクージャジャ|ほう……イヒーハナ祭ねェ……。|6decff21e48b3818',
    '00|2025-08-09T21:44:25.0000000+09:00|003D|魔のバクージャジャ|本命がダメだったときの備えとして、 泳がせておくのも悪くないかもよ……。|8d2fb5fed9d5f11f',
    '00|2025-08-09T21:44:36.0000000+09:00|003D|戦のバクージャジャ|どうやら、メスネコちゃんにも使い道ができたみてェだな。|f04df85f7bbbf257',
  ],
  translations: [
    '우크에부: 음……? 누구신지?',
    '우크라마트: 인사, 인사.',
    '우크라마트: 오호칼리~!',
    '우크에부: 오호칼리~!!',
    '우크에부: ……보아하니 예의는 잘 알고 있는 것 같군.',
    '우크에부: 그 고장에 가거든 그곳의 풍속을 따르란 말이 있지. 툴라이욜라는 다부족국가인 만큼 각 부족이 소중히 여겨온 문화를 존중해야만 한다.',
    '우크라마트: ……아, 그래. 그래서 너는 하누하누족 문화에도 밝은 거구나.',
    '우크라마트: 그래, 네 말이 맞아. 함께 살아간다는 것은 서로를 안다는 걸지도 몰라.',
    '우크에부: 호오, 사고방식이 유연하군.',
    '우크에부: 그러고 보니 너를…… 어디서 본 적이 있는 것 같은데.',
    '우크에부: 잠깐, 우크라마트 왕녀님~~~!?',
    '우크에부: 아, 아니, 제1왕녀님께서 이런 누추한 곳에 어인 일로! 이 우크에부, 예의를 논한 주제에 왕족께 무례를 범하다니…… 변명의 여지도 없사옵니다!',
    '우크에부: 부, 부디 그 도끼로 이 목을 쳐 주십시오……!!',
    '우크라마트: 무슨 그런 무서운 소리를 하고 그래!',
    '우크라마트: 신경 쓰지 마! 난 딱딱한 건 질색이거든!',
    '우크에부: 그러시군요. 그럼 신경 안 쓰겠습니다.',
    '쿠루루: 태세 전환이 빠르네…….',
    '우크라마트: 실은 이히하나 축제에 쓸 가마가 망가져서 왔어. 새로운 막대와 눈을 만들어 줬으면 해. 우유이포 나무랑 아보키샤라는 돌을 쓴다며?',
    '우크에부: 예, 맞습니다. 기꺼이 도와드리고 싶습니다만…… 지금은 재료가 다 떨어졌네요.',
    '우크에부: 지난번 태풍으로 피해를 입은 집을 수리하느라 우유이포 목재를 모두 써 버렸거든요. 아보키샤까지 조달한다 치면 열흘쯤 걸릴 겁니다.',
    '우크라마트: 미안하지만 그러면 늦어. 장소를 알려주면 내가 가서 구해 올게.',
    '우크에부: 무, 무슨 말씀이십니까! 왕녀를 심부름꾼처럼 부려 먹으라니……!! 예의를 중시하는 이 우크에부는 절대로 그럴 수 없습니다!',
    '우크라마트: 아니, 신경 쓰지 말라고 했잖아!',
    '우크에부: 그러시군요. 그럼 신경 안 쓰겠습니다.',
    '우크에부: 그나저나 같이 오신 이 하누하누족은?',
    '리누하누: 나는 이번 이히하나 축제의 책임자야. 가마를 수리하기 위해 같이 왔어.',
    '리누하누: 진짜인지 의심스럽기는 하지만, 우크라마트가 그게 갈대 흉작도 해결할 수 있는 마법 도구일 거라고 하더군.',
    '우크에부: 호오, 이히하나 축제의 진정한 의미를 알고 계시다니. 요즘은 하누하누족 중에도 모르는 자가 많은데 역시 왕녀님이시군요.',
    '우크라마트: 뭐, 뭐…… 그렇지!',
    '우크에부: 우유이포 나무를 벌채할 수 있는 곳은 제가 안내해 드리겠습니다.',
    '우크에부: 아보키샤 쪽은 동료분께 맡겨도 되겠습니까? 키키톨라 동굴 쪽을 찾아보면 필요한 만큼은 구하실 수 있을 겁니다.',
    '리누하누: 그쪽이라면 몇 번 가본 적이 있어. 내가 안내할게.',
    '쿠루루: 그럼, 부탁해.',
    '우크라마트: 좋아~! 그럼 어서 움직이자!',
    '도프로족 요현사: 대장. 흥미로운 이야기를 들었습니다.',
    '전투의 바쿠쟈쟈: 호오…… 이히하나 축제라…….',
    '마법의 바쿠쟈쟈: 첫 번째 목표물이 실패했을 때를 대비해서 그쪽을 주시하는 것도 나쁘지 않겠군요…….',
    '전투의 바쿠쟈쟈: 암고양이도 써먹을 데가 있긴 있군.',
  ],
}))

// OverlayPlugin 메시지 모킹
vi.mock('./hooks/useOverlayPlugin', () => ({
  default: function useOverlayPlugin({ onMessage }: UseOverlayPluginProps) {
    useEffect(() => {
      const data = messages.map((rawLine) => {
        const line = rawLine.split('|')
        return { rawLine, line, date: new Date(line[1]) }
      })

      const intervalId = setInterval(() => {
        const entry = data.shift()
        if (!entry) return clearInterval(intervalId)
        if (new Date() < entry.date) return data.unshift(entry)
        onMessage(entry)
      }, 1000)
    }, [onMessage])
  },
}))

// 후리가나 API 모킹
vi.mock('./functions/api', () => ({
  default: (text: string) => Promise.resolve(text),
}))

// 번역 API 모킹
vi.mock('./functions/translate', () => ({
  default: () => async(contents: ContentListUnion) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (!Array.isArray(contents)) return Promise.reject(new Error('Invalid content type'))

    const last = contents[contents.length - 1]

    if (!last || typeof last !== 'object' || !('role' in last) || !Array.isArray(last.parts) || last.parts.length === 0 || !last.parts[0].text) 
    return Promise.reject(new Error('Invalid content structure'))
  
    const text = last.parts[0].text.split(': ').join('|')
    const index = messages.findIndex((m) => m.includes(text))
  
    if (index === -1) return Promise.reject(new Error('No matching message found'))
    return Promise.resolve(translations[index])
  },
}))

describe('App', () => {
  const startDate = new Date('2025-08-09T21:38:25.0000000+09:00')

  vi.useFakeTimers()
  vi.setSystemTime(startDate)

  test('기본 UI 상태', () => {
    const screen = render(<App />)

    expect(screen.getByRole('button', { name: 'All' })).toHaveClass('selected')
    expect(screen.getByRole('button', { name: 'Chat' })).not.toHaveClass('selected')
    expect(screen.getByRole('button', { name: 'System' })).not.toHaveClass('selected')

    expect(screen.getByRole('button', { name: 'TR' })).toHaveClass('selected')
    expect(screen.getByRole('button', { name: 'BG' })).not.toHaveClass('selected')

    expect(screen.getByRole('feed')).toBeInTheDocument()
    expect(screen.getByRole('feed')).toBeEmptyDOMElement()
  })

  test('탭 변경', async () => {
    const screen = render(<App />)

    const chatTab = screen.getByRole('button', { name: 'Chat' })
    await chatTab.click()

    expect(chatTab).toHaveClass('selected')

    const systemTab = screen.getByRole('button', { name: 'System' })
    await systemTab.click()
    expect(systemTab).toHaveClass('selected')
  })

  test('자동 번역 토글', async () => {
    const screen = render(<App />)

    const autoTranslateButton = screen.getByRole('button', { name: 'TR' })
    await autoTranslateButton.click()

    expect(autoTranslateButton).not.toHaveClass('selected')

    await autoTranslateButton.click()
    expect(autoTranslateButton).toHaveClass('selected')
  })

  test('메시지 렌더링', async () => {
    const screen = render(<App />)
    
    using spy = vi.spyOn(window, 'prompt').mockReturnValue('supersecret')
    await screen.getByRole('button', { name: 'TR' }).click({ button: 'right' })
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('번역에 사용할 API 키를 입력하세요.'))

    let lastDate = startDate
    for (const message of messages) {
      const [_, date, __, sender, text] = message.split('|')
      const nextDate = new Date(date)

      await vi.advanceTimersByTimeAsync(nextDate.getTime() - lastDate.getTime())

      expect(screen.getByRole('article').last()).toHaveTextContent(sender)
      expect(screen.getByRole('article').last()).toHaveTextContent(text)

      lastDate = nextDate
    }

    expect(screen.getByRole('article').elements()).toHaveLength(messages.length)
  })
})
