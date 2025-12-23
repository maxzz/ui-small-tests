const fs = require('fs');
const path = require('path');

const targetDir = path.join(process.cwd(), 'src/components/2-main/3-pages/4-motion-examples');

function getFiles(dir) {
    const dirents = fs.readdirSync(dir, { withFileTypes: true });
    const files = dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    });
    return Array.prototype.concat(...files);
}

const allFiles = getFiles(targetDir).filter(f => f.endsWith('.tsx'));

allFiles.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const lines = content.split('\n');
    
    // 1. Identify Header (Imports and top-level comments)
    let headerEndIndex = 0;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        // Allow imports, comments, empty lines, and "use client" directives
        if (line.startsWith('import ') || 
            line.startsWith('//') || 
            line.startsWith('/*') || 
            line.startsWith('*') || 
            line.startsWith('*/') ||
            line === '' || 
            line === '"use client";' ||
            line === "'use client';") {
            headerEndIndex = i + 1;
        } else {
            // Stop at the first line of code that isn't a comment/import
            break;
        }
    }
    
    const header = lines.slice(0, headerEndIndex).join('\n');
    const bodyLines = lines.slice(headerEndIndex);
    const bodyContent = bodyLines.join('\n');

    // 2. Find the Main Exported Function
    // Regex to find "export function XxxDemo" or "export default function XxxDemo"
    const exportRegex = /export\s+(?:default\s+)?function\s+(\w+)\s*\(/;
    const match = bodyContent.match(exportRegex);
    
    if (!match) {
        // console.log(`Skipping ${path.basename(filePath)}: No export function found.`);
        return;
    }
    
    const functionName = match[1];
    const startIndex = bodyContent.indexOf(match[0]);
    
    // Extract the function body by counting braces
    let braceCount = 0;
    let endIndex = -1;
    let foundStart = false;
    
    for (let i = startIndex; i < bodyContent.length; i++) {
        if (bodyContent[i] === '{') {
            braceCount++;
            foundStart = true;
        } else if (bodyContent[i] === '}') {
            braceCount--;
        }
        
        if (foundStart && braceCount === 0) {
            endIndex = i + 1;
            break;
        }
    }
    
    if (endIndex === -1) {
        console.log(`Error parsing ${path.basename(filePath)}: Could not find end of function.`);
        return;
    }
    
    const mainFunction = bodyContent.substring(startIndex, endIndex);
    
    // 3. Reconstruct
    const beforeFn = bodyContent.substring(0, startIndex);
    const afterFn = bodyContent.substring(endIndex);
    
    // Check if it's already at the top (ignoring whitespace)
    if (beforeFn.trim() === '') {
        // console.log(`Skipping ${path.basename(filePath)}: Already correctly ordered.`);
        return;
    }

    const otherCode = (beforeFn + "\n\n" + afterFn).trim();
    
    const newContent = `${header}\n\n${mainFunction}\n\n${otherCode}\n`;
    
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Reordered ${path.basename(filePath)}`);
});
