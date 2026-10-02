# fortune-clawd

A Claude Code mod. A Claude Code tip as a toast when a session starts; /fortune for another.

**It won't use any of your usage.** Everything is drawn locally from code: no model calls, no tokens.

## Install

```
/plugin marketplace add saiharsha03/fortune-clawd
/plugin install fortune-clawd@fortune-clawd
```

Or from a clone: `claude --plugin-dir ./fortune-clawd`.

## Where it shows

In a toast when a session starts. Terminal only.

## Commands

- `/fortune`

## What the hooks do

`hooks/register.tsx` hooks: session.start, command.run{command=fortune}. It never blocks or rewrites a tool call or a prompt; it only watches them, draws, and answers its own commands.

## Privacy: what data it sends

None. It makes no network or model calls; anything it remembers stays in Claude Code's local plugin storage on your machine.

## Licence

MIT. Clawd is Anthropic's Claude Code mascot; this is an unofficial fan mod.
