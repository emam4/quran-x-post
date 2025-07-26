import { convert } from 'pdf-poppler';
import fs from 'fs/promises'; // for file deletion
import path from 'path';

const pdfPath = 'quran.pdf';
const outputDir = './outputImages';

export const covertToImages = async (pagesToConvert) => {
  for (const page of pagesToConvert) {
    const options = {
      format: 'jpeg',
      out_dir: outputDir,
      out_prefix: `${page}`,
      page,
      scale: 1024,
    };

    try {
      await convert(pdfPath, options);
      console.log(`Page ${page} converted successfully.`);
    } catch (error) {
      console.error(`Error converting page ${page}:`, error);
      throw error;
    }
  }
};

export const getImagePathForPage = (page) => {
  let fileName;
  if (page < 10) {
    fileName = `${page}-001.jpg`; // For 1-digit pages: 1-001.jpg
  } else if (page < 100) {
    fileName = `${page}-${String(page).padStart(3, '0')}.jpg`; // For 2-digit pages: 10-010.jpg
  } else {
    fileName = `${page}-${page}.jpg`; // For 3-digit pages: 100-100.jpg
  }
  return path.join(outputDir, fileName);
};

export const deleteImage = async (imagePath) => {
  try {
    await fs.unlink(imagePath);
    console.log('Image deleted:', imagePath);
  } catch (err) {
    console.error('Error deleting image:', err);
  }
};
