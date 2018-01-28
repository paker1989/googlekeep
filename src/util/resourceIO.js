const fs = require('fs')
const path = require('path')

module.exports = {
  getPhotoPath(photoUrl) {
    if (photoUrl.indexOf('/') === 0) {
      photoUrl = photoUrl.substring(1)
    }
    return path.resolve(__dirname, '../../', photoUrl)
  },

  deletePhotos(photos) {
    const self = this
    const deletePromises = []
    photos.forEach((photo) => {
      deletePromises.push(self.deletePhoto(photo))
    })
    return Promise.all(deletePromises)
  },

  deletePhoto(photo) {
    const self = this
    return new Promise((resolve, reject) => {
      const photoPath = self.getPhotoPath(photo.url)
      const isPhotoExists = fs.existsSync(photoPath)

      if (isPhotoExists) {
        fs.unlink(photoPath, (err) => {
          if (err) {
            reject({ err })
          } else {
            resolve(photo._id)
          }
        })
      } else {
        resolve(photo._id)
      }
    })
  }
}
