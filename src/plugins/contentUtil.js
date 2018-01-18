/* eslint no-shadow: off, no-param-reassign: off */
export function getTextNodeAtPosition(root, index) {
    // let lastNode = null;
  const treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, (elem) => {
    if (index > elem.textContent.length) {
      index -= elem.textContent.length
      //   lastNode = elem;
      return NodeFilter.FILTER_REJECT
    }
    return NodeFilter.FILTER_ACCEPT
  })
  const c = treeWalker.nextNode()
  return {
    node: c || root,
    position: c ? index : 0
  }
}

export function saveCaretPosition(context) {
  const selection = window.getSelection()
  const range = selection.getRangeAt(0)
  range.setStart(context, 0)
  const len = range.toString().length

  return function restore() {
    const pos = getTextNodeAtPosition(context, len)
    selection.removeAllRanges()
    const range = new Range()
    range.setStart(pos.node, pos.position)
    selection.addRange(range)
  }
}

export function replaceRec(str, regexs) {
  let newStr = str
  regexs.forEach((regex) => {
    newStr = newStr.replace(regex.pattern, regex.replacement)
  })
  if (newStr === str) return newStr
  return replaceRec(newStr, regexs)
}

