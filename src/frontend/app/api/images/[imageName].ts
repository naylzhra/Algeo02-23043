import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';  // Import correct types from Next.js

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { imageName } = req.query; // Get the image name from the query params
  
  // Ensure imageName is a string
  if (typeof imageName !== 'string') {
    res.status(400).send('Bad Request: imageName must be a string.');
    return;
  }

  // Resolve the correct image path
  const imagePath = path.resolve('src', 'backend', 'database', 'image', imageName);

  // Check if the image exists
  if (fs.existsSync(imagePath)) {
    const imageBuffer = fs.readFileSync(imagePath);
    
    // Get file extension and set the correct MIME type
    const extname = path.extname(imageName).toLowerCase();
    let contentType = 'image/jpeg'; // Default to JPEG

    if (extname === '.png') {
      contentType = 'image/png';
    } else if (extname === '.gif') {
      contentType = 'image/gif';
    }

    // Set the appropriate Content-Type header
    res.setHeader('Content-Type', contentType);
    
    // Send the image content
    res.send(imageBuffer);
  } else {
    res.status(404).send('Image not found');
  }
}
