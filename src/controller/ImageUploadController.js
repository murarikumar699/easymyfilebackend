
const Image = require("../models/images");
const base64ToImage = require('base64-to-image');
const { getImageMime } = require('base64-image-mime')
const PDFDocument = require('pdfkit');
const sizeOf = require('image-size');
const fs = require('fs');


const mimeTypes = {
    png: 'image/png',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    svg: 'image/svg+xml',
    webp: 'image/webp',
    jpeg: 'image/jpeg',
    pjpeg: 'image/jpeg',
    pjp: 'image/jpeg',
    jfif: 'image/jpeg'
  }


async function uploadImage(req,res){
    try{
        const base64Str = req.body.file;
        console.log(base64Str);        
       return res.json({status:200,image:base64Str});
    }catch(error){
        console.log("error",error);
        return res.json({status:400,message:"Something went wrong"})
    }    
}


async function makePdf(req,res) {
    try {
        const pdfData = await createPdfFromImages(req.body.image);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=images.pdf');
        res.send(pdfData)
      } catch (error) {
        console.log("error",error)
        res.status(500).send('Error creating PDF');
      }
}

async function createPdfFromImages(imagePaths) {
    try{

    
    const doc = new PDFDocument({autoFirstPage:false});
    
    const buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      pdfData;
    });

    let i = 0;
    for (let imagePath of imagePaths) {
        doc.addPage();

    doc.image(imagePath, {
        fit: [500, 700], // Adjust the image size to fit within the specified dimensions
        align: 'left',
        valign: 'center'
      })   
    i++;
  }
  // Finalize the PDF and end the document
  doc.end();

    return new Promise((resolve, reject) => {
        doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
        });
        doc.on('error', reject);
    });
    }catch(error){
        console.log("99iio",error);
    }
  }
  
  // Usage example
  

var signatures = {
    JVBERi0: "application/pdf",
    R0lGODdh: "image/gif",
    R0lGODlh: "image/gif",
    iVBORw0KGgo: "image/png",
    "/9j/": "image/jpg"
  };
  
  const getMimeType = (base64)=>{
    for(const sign in signatures)if(base64.startsWith(sign))return signatures[sign];
};



module.exports = {
    uploadImage,
    makePdf
}