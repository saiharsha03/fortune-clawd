export type FortuneShown = boolean

declare module 'claude-code' {
  interface PluginState {
    'fortune-clawd': { shown: FortuneShown }
  }
}
