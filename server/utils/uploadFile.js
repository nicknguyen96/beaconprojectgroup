const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    },
    region: process.env.BUCKET_REGION
})

// get files from UserController
async function uploadFile(file) {
    try {
        console.log(file.mimetype);
        let buffer;
        if (file.mimetype == 'application/pdf') {
            buffer = file.buffer;
        } else {
            // resize image
            buffer = await sharp(file.buffer).resize({ height: 1920, width: 1080, fit: 'contain' }).toBuffer();
        }

        const randomName = `${uuidv4()}${file.originalname}`

        console.log("file.mimetype",file.mimetype)

        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: randomName,
            Body: buffer,
            ContentType: file.mimetype
        }
        const command = new PutObjectCommand(params);
        const response = await s3.send(command);
        return {
            status: 200,
            url : `${randomName}`
            // url: `https://${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com/${randomName}`
        };
    } catch (error) {
        console.log("error ", error);
        return { status: 400 }
    }
}

async function getFile(filename){
    try {
        if (!filename){
            throw new Error("filename is not defined");
        }

        const getObjectParams = {
            Bucket: process.env.BUCKET_NAME,
            Key : filename,
            ContentType: 'application/jpg'
        }

        const command = new GetObjectCommand(getObjectParams);
        const response = await s3.send(command);
        console.log(response);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        console.log(url);
        return {status: 200, message:"get file url successful", data: url}
    } catch (error){
        console.log(error);
        return {status: 400, message: error.message};
    }
}

module.exports = { uploadFile, getFile };