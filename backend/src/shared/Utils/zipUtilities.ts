import archiver from "archiver";
import fs from "fs";
import path from "path";

export const zipFolder = (sourceFolder: string, outPath: string) => {
    return new Promise<void>((resolve, reject) => {
        const output = fs.createWriteStream(outPath);
        const archive = archiver('zip', {
            zlib: { level: 9 }, // Set the compression level
        });

        output.on('close', () => {
            console.log(`Zipped ${archive.pointer()} total bytes.`);
            resolve();
        });
        archive.on('error', (err) => {
            reject(err);
        });
        archive.pipe(output);
        archive.directory(sourceFolder, false); // `false` means don't include the base folder
        archive.finalize();
    });
};