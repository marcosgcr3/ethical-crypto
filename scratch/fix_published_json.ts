import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'scratch/published_out.json');

try {
  let content = fs.readFileSync(filePath, 'utf-8');
  if (content.includes('\u252C\u2591')) {
    console.log('Mangled characters found in scratch/published.json. Fixing...');
    const fixedContent = content.replace(/\u252C\u2591/g, '°');
    fs.writeFileSync(filePath, fixedContent, 'utf-8');
    console.log('scratch/published.json fixed.');
  } else {
    // Check if it's there but maybe encoded differently
    console.log('Mangled string \u252C\u2591 not found in scratch/published.json as UTF-8 string.');
    // Check for the character sequence in hex
    const buffer = fs.readFileSync(filePath);
    const hex = buffer.toString('hex');
    if (hex.includes('e294ace29691')) {
      console.log('Hex sequence e294ace29691 found! Replacing...');
      const targetBuffer = Buffer.from('e294ace29691', 'hex');
      const replacementBuffer = Buffer.from('c2b0', 'hex'); // °
      
      let newBuffer = buffer;
      let index = newBuffer.indexOf(targetBuffer);
      while (index !== -1) {
        newBuffer = Buffer.concat([
          newBuffer.subarray(0, index),
          replacementBuffer,
          newBuffer.subarray(index + targetBuffer.length)
        ]);
        index = newBuffer.indexOf(targetBuffer);
      }
      fs.writeFileSync(filePath, newBuffer);
      console.log('scratch/published.json fixed via buffer manipulation.');
    } else {
      console.log('Character sequence not found in scratch/published.json.');
    }
  }
} catch (e) {
  console.error('Error handling scratch/published.json:', e);
}
