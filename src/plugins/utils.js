export function getHeight(array, row, col) {
  let totalHeight = 0
  array[col].forEach((item, index) => {
    if (index < row) {
      totalHeight += array[col][index]
    }
  })
  return totalHeight
}

export function setFontSize(elementDiv = '.noteItem .noteItemWraper .noteContent',
  maxHeight = 293, maxFontSize = 40) {
  let currCHeight
  let currFontSize
  const $elements = $(elementDiv).toArray()

  $elements.forEach((element) => {
    for (let i = 1; i < 50; i += 1) {
      currCHeight = $(element).innerHeight()
      currFontSize = parseInt($(element).css('font-size'), 10)

      if (currCHeight < maxHeight && currFontSize < maxFontSize) {
        $(element).css('font-size', '+=1')
      } else {
        break
      }
    }
  })
}

export function waterFall(wraper = '.noteWaterfallWraper', element = '.noteItem',
  elementWidth = 220, vertMargin = 32, horMargin = 20) {
  const eWidth = elementWidth + (horMargin * 2)
  const wraperWidth = $(wraper).width()
  const nbPerRow = Math.floor(wraperWidth / eWidth)
  const originLeft = (wraperWidth - (eWidth * nbPerRow)) / 2 // 起始左侧位置
  const $itemArrays = $(element).toArray()
  const array = new Array(nbPerRow)

  $itemArrays.forEach((item, index) => {
    const row = Math.floor((index) / nbPerRow) // 第几行
    const col = index % nbPerRow // 第几列
    array[col] = array[col] || []
    // $(item).css({ height: (100 + (Math.random() * 80)) }) // to remove
    array[col][row] = $(item).height() + vertMargin
  })

  $itemArrays.forEach((item, index) => {
    const row = Math.floor((index) / nbPerRow) // 第几行
    const col = index % nbPerRow // 第几列
    const left = (eWidth * col) + originLeft
    const top = getHeight(array, row, col)
    $(item).css({ top, left })
  })
}

// console.log(`index: ${index}row : ${row}, col: ${col}, top: ${top}, left: ${left}`)

