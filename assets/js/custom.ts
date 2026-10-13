/**
 * Custom TypeScript for the Nexonis site (auto-loaded by FixIt).
 * Discord social link → copy + browser alert instead of navigation.
 */

const DISCORD_USERNAME = 'ari_nex'
const DISCORD_LINK_SELECTOR = '.home-profile .links a[href*="discordapp.com/users/"]'
const STATUS_OK = '(Username is copied to clipboard.)'
const STATUS_FAIL = '(Copying the username was blocked.)'

/** Copy text to the clipboard, return true on success. */
async function copyToClipboard(text: string): Promise<boolean> {
  // modern async API (requires secure context + user gesture)
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // fall through to the legacy path below
  }

  // legacy fallback: hidden textarea + execCommand
  try {
    const field = document.createElement('textarea')
    field.value = text
    field.setAttribute('readonly', '')
    field.style.position = 'fixed'
    field.style.left = '-9999px'
    document.body.appendChild(field)
    field.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(field)
    return ok
  } catch {
    return false
  }
}

/** The browser message: draft copy + truthful clipboard status. */
function showMessage(ok: boolean) {
  alert(
    `\nYou can add me on Discord: ${DISCORD_USERNAME}\n` +
    `I would love to chat and collaborate!\n` +
    (ok ? STATUS_OK : STATUS_FAIL)
  )
}

document.addEventListener('click', (event) => {
  const anchor = (event.target as HTMLElement | null)?.closest?.(
    DISCORD_LINK_SELECTOR
  ) as HTMLAnchorElement | null
  if (!anchor) return
  // stop the icon from opening discordapp.com
  event.preventDefault()

  // start the clipboard write inside the click gesture, then report the
  // result truthfully in the browser message
  void copyToClipboard(DISCORD_USERNAME).then(showMessage, () => showMessage(false))
})