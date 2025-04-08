'use server';

import { fetchandExtractPdfText } from "@/lib/langchain";
import { summarizeWithGeminiAI } from "@/lib/geminiai"; // Retain Gemini AI import

/**
 * Processes the uploaded PDF and extracts its text content
 */
export async function generatedPdfSummary(uploadResponse: [{
    serverData: {
        userId: string;
        file: {
            url: string;
            name: string;
        };
    };
}]) {
    // Step 1: Validate the upload response
    if (!uploadResponse || !uploadResponse[0]?.serverData?.file?.url) {
        return { success: false, message: 'Oops! Looks like the upload response is missing or the PDF URL is nowhere to be found.', data: null };
    }

    const pdfUrl = uploadResponse[0].serverData.file.url;
    console.log('PDF URL:', pdfUrl); // Debug log to confirm the URL

    try {
        // Step 2: Extract text from the PDF using Langchain
        const pdfText = await fetchandExtractPdfText(pdfUrl);
        console.log('Extracted PDF Text:', pdfText); // Debug log to confirm extracted text

        if (!pdfText) {
            console.warn('No text extracted from the PDF.'); // Warning for empty text
            return { 
                success: false, 
                message: 'No text could be extracted from the PDF. Please ensure the PDF contains readable text.',
                data: null 
            };
        }

        // Additional debug log for successful extraction
        console.log('PDF text extraction successful. Text length:', pdfText.length);
        return {
            success: true,
            message: 'Text extracted successfully',
            data: pdfText
        };
    } catch (err: any) {
        console.error('PDF processing error:', err); // Enhanced error log
        if (err.response) {
            console.error('Error response:', err.response); // Log response details if available
        }
        return { 
            success: false, 
            message: `PDF processing failed: ${err.message}`,
            data: null 
        };
    }
}

/**
 * Summarizes the extracted text using Gemini AI
 */
export async function summarizeExtractedText(extractedText: string) {
    try {
        console.log('Starting Gemini AI summarization...');
        const summary = await summarizeWithGeminiAI(extractedText);
        console.log('Gemini AI Summary:', summary);
        return { success: true, data: summary };
    } catch (err: any) {
        console.error('Gemini AI summarization error:', err);
        return { success: false, message: `Summarization failed: ${err.message}`, data: null };
    }
}

