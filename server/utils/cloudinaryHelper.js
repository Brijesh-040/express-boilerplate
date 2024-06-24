const cloudinary = require('cloudinary').v2
const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config()

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const fileUpload = async (file) => {
    try {
        // Upload an image
        const fileName = file.filename.substring(0, file.filename.lastIndexOf('.'))
        const uploadResult = await cloudinary.uploader
            .upload(file.path, {
                resource_type: "auto",
                public_id: fileName,
            })
            .catch((error) => {
                console.log('error: ', error);
                throw error;
            });

        fs.unlinkSync(file.path)
        return {
            success: true,
            url: uploadResult.secure_url,
            fileType: uploadResult.format,
            fileName: uploadResult.display_name
        }
    } catch (error) {
        console.log('error: ', error);
        fs.unlinkSync(file.path)
        throw error
    }
};

module.exports = {
    fileUpload
}