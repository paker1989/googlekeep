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
                eWidth = 240) => {
  const wraperWidth = $(wraper).width()
  const nbPerRow = Math.floor(wraperWidth / eWidth)
  const originLeft = (wraperWidth - eWidth * nbPerRow) / 2 // 起始左侧位置
  const $itemArrays = $(element).toArray()
  const array = new Array(nbPerRow)

  $itemArrays.forEach((item, index) => {
    const row = Math.floor((index) / nbPerRow) // 第几行
    const col = index % nbPerRow // 第几列
    array[col] = array[col] || []
    array[col][row] = $(item).height()
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

