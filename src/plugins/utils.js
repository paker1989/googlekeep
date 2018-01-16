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
  maxHeight = 280, maxFontSize = 40) {
  let currCHeight
  let currFontSize
  const $elements = $(elementDiv).toArray()

  $elements.forEach((element) => {
    for (let i = 1; i < 25; i += 1) {
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

/* eslint no-param-reassign: off */
export function arrangeImages(images, nbColumns = 3) {
  let columnIndex
  let sizeRatio
  const array = []

  images.forEach((item, index) => {
    console.log(item.naturalWidth + ': ' + item.naturalHeight)
    columnIndex = Math.floor(index / nbColumns) // 在第几列
    sizeRatio = item.naturalWidth / item.naturalHeight // 宽高比
    console.log(sizeRatio)
    array[columnIndex] = array[columnIndex] || []
    array[columnIndex].push({ index, sizeRatio })
  })

  console.log(array)
  array.forEach((item, colIndex) => {
    const ratioSums = array[colIndex].reduce((a, b) => a.sizeRatio || a + b.sizeRatio || b, 0)
    array[colIndex].forEach((e) => {
      images[e.index].width = `${(e.sizeRatio * 100) / ratioSums}%`
    })
  })
  return images
}


// console.log(`index: ${index}row : ${row}, col: ${col}, top: ${top}, left: ${left}`)


/* eslint brace-style: off */
// export function setFontSize(elementDiv = '.noteItem .noteItemWraper .noteContent',
//   maxHeight = 293, maxFontSize = 40) {
//   let currCHeight
//   let currFontSize
//   let content
//   let scrollHeight
//   const $elements = $(elementDiv).toArray()

//   $elements.forEach((element) => {
//     scrollHeight = $(element).prop('scrollHeight')
//     console.log(scrollHeight)
//     if (scrollHeight > maxHeight) {
//       console.log($(element).text())
//       content = $(element).text()
//       $(element).text(content.slice(0, Math.floor(content.length * (maxHeight / scrollHeight))))
//       console.log($(element).text())
//     }
//     else {
//       for (let i = 1; i < 50; i += 1) {
//         currCHeight = $(element).innerHeight()
//         currFontSize = parseInt($(element).css('font-size'), 10)

//         if (currCHeight < maxHeight && currFontSize < maxFontSize) {
//           $(element).css('font-size', '+=1')
//         } else {
//           break
//         }
//       }
//     }
//   })
// }

