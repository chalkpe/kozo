export const chatTypes = [
  /** Say */ 10, /** Shout */ 11, /** TellOutgoing */ 12, /**TellIncoming */ 13, /** Party */ 14, /** Alliance */ 15, /** Ls1 */ 16,
  /** Ls2 */ 17, /** Ls3 */ 18, /** Ls4 */ 19, /** Ls5 */ 20, /** Ls6 */ 21, /** Ls7 */ 22, /** Ls8 */ 23, /** FreeCompany */ 24,
  /** NoviceNetwork */ 27, /** CustomEmote */ 28, /** StandardEmote */ 29, /** Yell */ 30, /** CrossParty */ 32, /** PvPTeam */ 36,
  /** CrossLinkShell1 */ 37, /** Echo */ 56, /** CrossLinkShell2 */ 101, /** CrossLinkShell3 */ 102, /** CrossLinkShell4 */ 103,
  /** CrossLinkShell5 */ 104, /** CrossLinkShell6 */ 105, /** CrossLinkShell7 */ 106, /** CrossLinkShell8 */ 107,
]

export const npcDialogueTypes = [/** NPCDialogue */ 61, /** NPCDialogueAnnouncements */ 68]

export const externalToolSignatures = [
  /** ACT.Hojoring */ { /** Echo */ type: 56, pattern: /^Hojoring>/ },
]
