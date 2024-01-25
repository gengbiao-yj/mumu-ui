export function bem(
  blockName: string,
  element?: string,
  modifier?: string
): string {
  const blockClass = `mu-${blockName}`

  let bemClass = blockClass
  if (element) {
    bemClass += `__${element}`
  }

  if (modifier) {
    bemClass += element ? `--${modifier}` : `--${modifier}`
  }

  return bemClass
}

export function bm(blockName: string, modifier?: string): string {
  const blockClass = `mu-${blockName}`

  let bemClass = blockClass

  if (modifier) {
    bemClass += `--${modifier}`
  }

  return bemClass
}
