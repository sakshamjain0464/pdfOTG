import express from 'express' // Import express
import upload from '../configs/multer.config.js' // Import the upload
import PDFMerger from 'pdf-merger-js' // Import the pdf merger
import path from 'path' // Import path
import fs from 'fs' // Import fs
const router = express.Router() // Initialize the router

router.use(express.static('public')) // Set the public folder as static


router.post('/merge', upload.array('pdfs'), async (req, res) => {
    try {
        const files = req.files.map(file => path.resolve(file.path)) // Get the paths of the pdfs
        console.log(files)
        const merger = new PDFMerger() // Initialize the merger
       for(let file of files){
            await merger.add(file) // Add the pdfs to the merger
       }

        await merger.setMetadata({
            producer: "pdfOTG",
            author: "USER",
            creator: "USER",
            title: "My PDF"
        });

        const fileName = `${req.files[0].originalname}-merged.pdf` // Get the name of the merged pdf

        await merger.save(fileName); //save under given name and reset the internal document

        for(let file of files){
            fs.unlinkSync(file) // Delete the pdfs
        }
        
        res.send("Merged") // Send the response
    }
    catch (err) {
        console.log(err)
        res.status(400).send('Error') // Send the error response
    }

}) // Merge the pdfs



export default router // Export the router