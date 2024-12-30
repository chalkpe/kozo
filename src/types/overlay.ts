export interface EventMap {
  LogLine: (ev: { line: string[]; rawLine: string }) => void
}

declare global {
  interface Window {
    startOverlayEvents: () => void
    addOverlayListener: <T extends keyof EventMap>(event: T, cb: EventMap[T]) => void
    removeOverlayListener: <T extends keyof EventMap>(event: T, cb: EventMap[T]) => void
  }
}
