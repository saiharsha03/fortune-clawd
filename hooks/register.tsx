import type { Register } from 'claude-code'

import { TIPS } from './tips'

export const register: Register = hooks => {
  // Walks the deck in order across sessions, so no tip repeats until all have shown.
  const draw = async (get: () => Promise<unknown>, set: (n: number) => Promise<void>) => {
    const i = Number((await get()) ?? 0) % TIPS.length
    await set(i + 1)
    return `✻ Clawd's fortune: ${TIPS[i]}`
  }

  hooks('session.start', async ($, e, next) => {
    await $.command.register({ name: 'fortune', description: 'Show another Claude Code tip' })
    // A hot reload fires session.start again; show the toast only on a real start.
    if (e.isInteractive) {
      const shown = await $.state.get({ plugin: 'fortune-clawd', key: 'shown' } as const)
      if (!shown.value) {
        await $.state.set({ plugin: 'fortune-clawd', key: 'shown' } as const, true)
        $.ui.toast(await draw(() => $.store.get('next'), n => $.store.set('next', n)), { timeoutMs: 9000 })
      }
    }
    return next(e)
  })

  hooks('command.run', { command: 'fortune' }, async $ => ({
    text: await draw(() => $.store.get('next'), n => $.store.set('next', n)),
  }))
}
