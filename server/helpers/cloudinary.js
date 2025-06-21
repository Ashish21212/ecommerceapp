const cloudinary = require('cloudinary').v2;
const multer = require('multer');


// connecting your Node.js app to your Cloudinary account.
cloudinary.config({
  cloud_name : 'raktasetu',
  api_key :'776313542864231',
  api_secret : 'okZgvYHxVYBD0sE-e5oOgQ5xrGk',

});

const storage = new multer.memoryStorage();//keeps the file in memory(Ram) as a buffer

//creating a function that will upload a file to Cloudinary.
async function imageUploadUtils(file){
  const result  = await cloudinary.uploader.upload(file, {
    resource_type: 'auto',

  });

  return result;
}

const upload = multer({ storage }) // Use the defined storage configuration

module.exports = {upload, imageUploadUtils}