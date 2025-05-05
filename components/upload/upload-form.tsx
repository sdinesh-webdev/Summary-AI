'use client';

import * as React from 'react';
import { useAuth } from "@clerk/nextjs";
import { PdfUploadSection } from './pdf-upload-section';
import { toast } from 'sonner';

import { generatedPdfSummary, summarizeExtractedText, storePdfSummaryAction } from '@/actions/upload-actions';

/**
 * UploadForm Component
 * This component handles PDF file uploads using EdgeStore for storage and displays the generated summary
 */
export default function UploadForm() {
  const { userId, isLoaded, isSignedIn } = useAuth();
  
  // === State Management ===
  const [uploadedUrl, setUploadedUrl] = React.useState<string>('');
  const [extractedText, setExtractedText] = React.useState<string>('');
  const [isExtracting, setIsExtracting] = React.useState(false);
  const [summary, setSummary] = React.useState<string>('');
  const [isSummarizing, setIsSummarizing] = React.useState(false);
  const [isStoring, setIsStoring] = React.useState(false);

  const handleUploadComplete = async (uploadedFileUrl: string) => {
    setUploadedUrl(uploadedFileUrl);
    setIsExtracting(true);
    
    // Step 1: Extract text from PDF
    const extractionResult = await generatedPdfSummary([
      {
        serverData: {
          file: { url: uploadedFileUrl, name: 'document.pdf' },
        },
      },
    ]);

    if (extractionResult.success && extractionResult.data) {
      setExtractedText(extractionResult.data);
      toast.success('📝 Text extracted!', {
        description: "Now let's create a summary.",
        duration: 2000,
      });

      // Step 2: Generate Summary using Gemini AI
      setIsSummarizing(true);
      const summaryToastId = toast.loading('🤖 AI is working its magic...', {
        duration: Infinity,
      });
      
      const summarizationResult = await summarizeExtractedText(extractionResult.data);
      toast.dismiss(summaryToastId);
      
      if (summarizationResult.success && summarizationResult.data) {
        setSummary(summarizationResult.data);
        
        // Step 3: Store the summary
        setIsStoring(true);
        const storeToastId = toast.loading('💾 Saving your summary...', {
          duration: Infinity,
        });

        const storeResult = await storePdfSummaryAction({
          fileUrl: uploadedFileUrl,
          summary: summarizationResult.data,
          title: 'document.pdf',
        });

        toast.dismiss(storeToastId);

        if (storeResult.success) {
          toast.success('✅ Summary saved!', {
            description: "Everything's stored safely.",
            duration: 3000,
          });
        } else {
          toast.error('📝 Save failed', {
            description: storeResult.message,
            duration: 4000,
          });
        }
        setIsStoring(false);

      } else {
        toast.error('😕 Summarization hiccup', {
          description: summarizationResult.message,
          duration: 4000,
        });
      }
    } else {
      toast.error('📄 Text extraction failed', {
        description: extractionResult.message,
        duration: 4000,
      });
    }

    setIsExtracting(false);
    setIsSummarizing(false);
  };

  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full grid md:grid-cols-2 gap-6">
        <PdfUploadSection 
          isSignedIn={isSignedIn ?? false}
          onUploadComplete={handleUploadComplete}
        />

        {/* Summary Display Box */}
        <div className="bg-yellow-50 rounded-xl border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6 flex flex-col min-h-[300px] sm:min-h-[400px] md:min-h-[600px] max-h-[80vh] md:max-h-[900px] w-full transition-all duration-300">
          <h2 className="text-base sm:text-lg lg:text-3xl font-extrabold text-center text-black mb-2 sm:mb-4">Here's your summary</h2>
          <div className="border-2 border-gray-300 w-full flex-1 rounded-md p-2 sm:p-4 overflow-auto max-h-[40vh] md:max-h-[600px] transition-all duration-300">
            {isSummarizing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                <p className="text-gray-600">Generating your summary...</p>
              </div>
            ) : summary ? (
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-800 whitespace-pre-wrap break-words">{summary}</p>
              </div>
            ) : (
              <p className="text-gray-500 text-center">Upload a PDF to get started</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}