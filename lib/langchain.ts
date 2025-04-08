import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { Document } from "@langchain/core/documents";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

export async function fetchandExtractPdfText(fileUrl: string) {
    try {
        // Step 1: Fetch the PDF file from the provided URL
        const response = await fetch(fileUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch PDF');
        }

        // Step 2: Convert the fetched PDF data into an ArrayBuffer
        const arrayBuffer = await response.arrayBuffer();

        // Step 3: Create a temporary file to store the PDF
        const tempDir = os.tmpdir(); // Get the system's temporary directory
        const tempFilePath = path.join(tempDir, `temp-${Date.now()}.pdf`); // Generate a unique file name

        // Step 4: Write the PDF data to the temporary file
        await fs.promises.writeFile(tempFilePath, Buffer.from(arrayBuffer));

        try {
            // Step 5: Use PDFLoader to load and parse the PDF
            const loader = new PDFLoader(tempFilePath);
            const docs = await loader.load(); // Extract text from the PDF

            // Step 6: Check if any text was extracted
            if (!docs || docs.length === 0) {
                throw new Error('No text could be extracted from the PDF');
            }

            // Step 7: Combine all extracted pages into a single string with proper spacing
            return docs.map((doc: Document) => doc.pageContent.trim()).join('\n\n');
        } finally {
            // Step 8: Clean up by deleting the temporary file
            await fs.promises.unlink(tempFilePath);
        }
    } catch (error) {
        // Handle errors and log them for debugging
        console.error('PDF extraction error:', error);
        throw new Error(error instanceof Error ? error.message : 'Failed to extract text from PDF');
    }
}