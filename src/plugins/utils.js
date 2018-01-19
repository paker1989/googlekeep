export function setFontSize(elementDiv = '.noteItem .noteItemWraper .noteContent',
  maxHeight = 280, maxFontSize = 40) {
  let currCHeight
  let currScrolHeight
  let currFontSize
  let htmlContent
  const $elements = $(elementDiv).toArray()

  $elements.forEach((element) => {
    currCHeight = $(element).innerHeight()
    currScrolHeight = element.scrollHeight
    if (currScrolHeight > maxHeight) {
      for (let j = 1; j < 200; j += 1) {
        currScrolHeight = element.scrollHeight
        if (currScrolHeight > maxHeight) {
          $(element).html($(element).html().substring(0, $(element).html().length - 1))
        } else {
          break
        }
      }
      htmlContent = $(element).html()
      htmlContent = `${htmlContent.substring(0, htmlContent.length - 3)}...`
      htmlContent = htmlContent.replace(/((<b)|<|(<br))...$/g, '...')
      $(element).html(htmlContent)
    } else {
      for (let i = 1; i < 25; i += 1) {
        currCHeight = $(element).innerHeight()
        currFontSize = parseInt($(element).css('font-size'), 10)
        if (currCHeight < maxHeight && currFontSize < maxFontSize) {
          $(element).css('font-size', '+=1')
        } else {
          $(element).css('font-size', '-=1')
          break
        }
      }
    }
  })
}

export function getHeight(array, row, col) {
  let totalHeight = 0
  array[col].forEach((item, index) => {
    if (index < row) {
      totalHeight += array[col][index]
    }
  })
  return totalHeight
}

/* eslint no-param-reassign: off */
export function arrangeImages(images, nbColumns = 3) {
  let columnIndex
  let sizeRatio
  const array = []

  images.forEach((item, index) => {
    columnIndex = Math.floor(index / nbColumns) // 在第几列
    sizeRatio = item.naturalWidth / item.naturalHeight // 宽高比
    array[columnIndex] = array[columnIndex] || []
    array[columnIndex].push({ index, sizeRatio })
  })

  array.forEach((item, colIndex) => {
    const ratioSums = array[colIndex].reduce((a, b) => a.sizeRatio || a + b.sizeRatio || b, 0)
    array[colIndex].forEach((e) => {
      images[e.index].width = `${(e.sizeRatio * 100) / ratioSums}%`
    })
  })
  return images
}

/**
 * @deprecated
 * @param {*} wraper 
 * @param {*} element 
 * @param {*} elementWidth 
 * @param {*} vertMargin 
 * @param {*} horMargin 
 */
export function waterFall(wraper = '.noteWaterfallWraper', element = '.noteItem',
  elementWidth = 220, vertMargin = 32, horMargin = 20) {
  const $itemArrays = $(element).toArray()
  const eWidth = elementWidth + (horMargin * 2)
  const wraperWidth = $(wraper).width()
  const nbPerRow = Math.min(Math.floor(wraperWidth / eWidth), $itemArrays.length)
  const originLeft = (wraperWidth - (eWidth * nbPerRow)) / 2 // 起始左侧位置
  const array = new Array(nbPerRow)

  $itemArrays.forEach((item, index) => {
    const row = Math.floor((index) / nbPerRow) // 第几行
    const col = index % nbPerRow // 第几列
    array[col] = array[col] || []
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
