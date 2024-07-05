import multer from 'multer' // Import multer


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'pdfs/')
    },
    filename: function (req, file, cb) {
        cb(null,  Date.now() + "-" +file.originalname)
    }
})

const upload = multer({ storage: storage }) // Upload the pdfs to the pdfs folder

export default upload // Export the upload