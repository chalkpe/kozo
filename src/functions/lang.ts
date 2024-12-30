const hantakuon = /([ぱぴぷぺぽパピプペポ])/g
const dakuon = /([がぎぐげござじずぜぞだぢづでどばびぶべぼガギグゲゴザジズゼゾダヂヅデドバビブベボ])/g

export const highlight = (text: string) =>
  text.replace(hantakuon, '<span class="hantakuon">$1</span>').replace(dakuon, '<span class="dakuon">$1</span>')
