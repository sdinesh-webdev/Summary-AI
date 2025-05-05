'use server';

import { fetchandExtractPdfText } from "@/lib/langchain";
import { summarizeWithGeminiAI } from "@/lib/geminiai";
import { auth } from "@clerk/nextjs/server";

/**
 * Processes the uploaded PDF and extracts its text content
 */
export async function generatedPdfSummary(uploadResponse: [{
    serverData: {
        file: {
            url: string;
            name: string;
        };
    };
}]) {
    const { userId } = await auth();
    if (!userId) {
        return { success: false, message: 'Unauthorized: User not authenticated', data: null };
    }

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

/**
 * Main action to store PDF summary
 */
export async function storePdfSummaryAction({
    fileUrl,
    summary,
    title,
}: {
    fileUrl: string;
    summary: string;
    title: string;
}): Promise<{
    success: boolean;
    message: string;
    data?: any;
}> {
    try {
        const { userId } = await auth();
        if (!userId) {
            return {
                success: false,
                message: 'Unauthorized: User not authenticated',
            };
        }

        // Validate required inputs
        if (!fileUrl || !summary || !title) {
            return {
                success: false,
                message: 'Missing required fields',
            };
        }

        // Return the summary data directly
        return {
            success: true,
            message: 'PDF summary processed successfully',
            data: { fileUrl, summary, title }
        };

    } catch (error) {
        console.error('Error in storePdfSummaryAction:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Failed to process PDF summary',
        };
    }
}
