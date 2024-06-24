const multer = require('multer')
const moment = require('moment')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = moment().format('DDMMYYYYHHmmss');
        const fileExtension = file.originalname.substring(file.originalname.lastIndexOf('.'));
        const baseName = file.originalname.substring(0, file.originalname.lastIndexOf('.'));
        cb(null, baseName + '-' + uniqueSuffix + fileExtension)
    }
})

const upload = multer({ storage: storage })

module.exports = {
    upload
}