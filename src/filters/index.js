export function noteItemImageFilter(images, maxNb) {
  const imageArrays = [...images]
  return imageArrays.slice(0, Math.min(imageArrays.length, maxNb))
}