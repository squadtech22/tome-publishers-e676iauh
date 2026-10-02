import sharp from 'sharp';
import fs from 'fs';

async function splitBooks() {
  const inputPath = './src/assets/generated/books.png';
  const metadata = await sharp(inputPath).metadata();
  
  const cellWidth = Math.floor(metadata.width / 5);
  const cellHeight = Math.floor(metadata.height / 2);
  
  // Estimate book bounds within the cell (e.g. 40% width, 85% height)
  // To avoid ANY checkerboard, let's be conservative.
  // Center is cellWidth / 2.
  const bookWidth = Math.floor(cellWidth * 0.35); 
  const bookHeight = Math.floor(cellHeight * 0.85);
  
  const offsetX = Math.floor((cellWidth - bookWidth) / 2);
  const offsetY = Math.floor((cellHeight - bookHeight) / 2);

  let bookIndex = 1;
  
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 5; c++) {
      const extractRegion = {
        left: c * cellWidth + offsetX,
        top: r * cellHeight + offsetY,
        width: bookWidth,
        height: bookHeight
      };
      
      await sharp(inputPath)
        .extract(extractRegion)
        .toFile(`./src/assets/generated/book_${bookIndex}.png`);
        
      console.log(`Saved book_${bookIndex}.png`);
      bookIndex++;
    }
  }
}

splitBooks().catch(console.error);
