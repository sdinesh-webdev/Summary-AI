'use client';

import * as React from 'react';
import { generatedPdfSummary } from "@/actions/upload-actions";
import { useAuth } from "@clerk/nextjs";

export default function HeroSection2() {
    const { isSignedIn } = useAuth();
    const [uploadedUrl, setUploadedUrl] = React.useState<string>('');
    const [extractedText, setExtractedText] = React.useState<string>('');
    const [isExtracting, setIsExtracting] = React.useState(false);
    const [summary, setSummary] = React.useState<string>('');
    const [issummarizing, setIsSummarizing] = React.useState(false);

    const handleUploadComplete = async (uploadedFileUrl: string) => {
        // This function receives URL but is never called from parent component
        setUploadedUrl(uploadedFileUrl);
        setIsExtracting(true);

        // Attempts to process PDF using the URL
        const extractionresult = await generatedPdfSummary([
            {
                serverData: {
                    file: {
                        url: uploadedFileUrl,  // URL is used here for PDF processing
                        name: 'document.pdf'
                    },
                },
            },
        ]);
        // Missing: Update extractedText state with extraction result
    }

    return (
        <section className="">
            {/* show extracted text when available */}
            {isExtracting && <p>Extracting text......</p>}
            {extractedText && (
                <div className="">
                    <h3>Extracted text</h3>
                    <p className="">{extractedText}</p>
                </div>
            )}
        </section>
    )
}