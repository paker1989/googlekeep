function getHeight(array, row, col) {
  let totalHeight = 0
  array[col].forEach((item, index) => {
    if (index < row) {
      totalHeight += array[col][index]
    }
  })
  return totalHeight
}

export default (wraper = '.noteWaterfallWraper',
                element = '.noteItem',
                elementWidth = 220,
                vertMargin = 32,
                horMargin = 16) => {
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
    $(item).css({ height: (100 + (Math.random() * 80)) }) // to remove
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

