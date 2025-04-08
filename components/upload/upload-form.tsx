'use client';

// Import necessary dependencies
import * as React from 'react';
import { useEdgeStore } from '@/lib/edgestore';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { generatedPdfSummary, summarizeExtractedText } from '@/actions/upload-actions';

/**
 * UploadForm Component
 * This component handles PDF file uploads using EdgeStore for storage
 */
export default function UploadForm() {
  // === State Management ===
  // Store the selected PDF file
  const [file, setFile] = React.useState<File>();
  // Store any error messages during validation
  const [error, setError] = React.useState<string>('');
  // Store the URL of the uploaded file
  const [uploadedUrl, setUploadedUrl] = React.useState<string>('');
  // Track different processing states
  const [isUploading, setIsUploading] = React.useState(false);
  const [extractedText, setExtractedText] = React.useState<string>('');
  const [isExtracting, setIsExtracting] = React.useState(false);
  const [summary, setSummary] = React.useState<string>('');
  const [isSummarizing, setIsSummarizing] = React.useState(false);
  
  // Initialize file storage service
  const { edgestore } = useEdgeStore();

  // === File Validation Function ===
  // Checks if file is PDF and under 10MB
  const validateFile = (file: File) => {
    if (!file.type.includes('pdf')) {
      toast.error('📚 Oops! PDFs only please!', {
        description: "Let's stick to PDF files for now.",
        duration: 3000,
      });
      setError('Please upload a PDF file only');
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('📦 That\'s a big file!', {
        description: 'Keep it under 10MB please.',
        duration: 3000,
      });
      setError('File size must be less than 10MB');
      return false;
    }
    setError('');
    toast.success(`✨ "${file.name}" looks perfect!`, {
      description: "We're ready to work some magic.",
      duration: 2000,
    });
    return true;
  };

  return (
    <div>
      {/* === File Input Section === */}
      {/* Allows users to select a PDF file */}
      <Input
        type="file"
        accept=".pdf,application/pdf"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0];
          if (selectedFile && validateFile(selectedFile)) {
            setFile(selectedFile);
            setUploadedUrl(''); // Reset URL when a new file is selected
          } else {
            setFile(undefined);
          }
        }}
      />
      {/* Display validation error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* === Upload Button Section === */}
      {/* Handles the main upload and processing flow */}
      <Button
        disabled={!file || isUploading}
        onClick={async () => {
          if (file) {
            try {
              setIsUploading(true);
              let loadingToastId: string | number = '';

              // STEP 1: Upload PDF to Cloud Storage
              // Shows progress updates with toast messages
              const uploadPromise = edgestore.publicFiles.upload({
                file,
                onProgressChange: (progress) => {
                  if (progress === 0) {
                    toast.dismiss(loadingToastId);
                    loadingToastId = toast.loading('🚀 Initiating upload...', {
                      duration: Infinity,
                    });
                  } else if (progress === 100) {
                    toast.dismiss(loadingToastId);
                  } else if (progress % 25 === 0) {
                    toast.dismiss(loadingToastId);
                    loadingToastId = toast.loading(`📤 Upload in progress: ${progress}%`, {
                      duration: Infinity,
                    });
                  }
                },
              });

              const res = await uploadPromise;
              toast.dismiss(loadingToastId);
              toast.success('🎉 Upload complete!', {
                description: "Your PDF is safely in the cloud.",
                duration: 2000,
              });

              // STEP 2: Extract Text from PDF
              // Uses Langchain to get text content
              // Shows loading state and success/error messages
              setIsExtracting(true);
              const extractionToastId = toast.loading('🔍 Extracting text...', {
                duration: Infinity,
              });
              
              const extractionResult = await generatedPdfSummary([
                {
                  serverData: {
                    userId: 'default-user',
                    file: { url: res.url, name: file.name },
                  },
                },
              ]);

              toast.dismiss(extractionToastId);
              
              if (extractionResult.success) {
                setExtractedText(extractionResult.data);
                toast.success('📝 Text extracted!', {
                  description: "Now let's create a summary.",
                  duration: 2000,
                });

                // STEP 3: Generate Summary using AI
                // Uses Gemini AI to create a summary
                // Shows loading state and final result
                setIsSummarizing(true);
                const summaryToastId = toast.loading('🤖 AI is working its magic...', {
                  duration: Infinity,
                });
                
                const summarizationResult = await summarizeExtractedText(extractionResult.data);
                toast.dismiss(summaryToastId);
                
                if (summarizationResult.success) {
                  setSummary(summarizationResult.data);
                  toast.success('✨ Summary ready!', {
                    description: "We've distilled the important bits.",
                    duration: 3000,
                  });
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
            } catch (err) {
              // Handle any errors during the process
              toast.error('⚠️ Something went wrong', {
                description: "Let's give it another try!",
                duration: 4000,
              });
              console.error(err);
            } finally {
              // Reset all processing states
              setIsUploading(false);
              setIsExtracting(false);
              setIsSummarizing(false);
            }
          }
        }}
      >
        {/* Show loading spinner or upload text */}
        {isUploading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Uploading...</span>
          </>
        ) : (
          'Upload'
        )}
      </Button>

      {/* === Results Display Section === */}
      {/* Show uploaded file URL */}
      {uploadedUrl && (
        <div>
          <p>File uploaded successfully!</p>
          <p>
            URL:{' '}
            <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
              {uploadedUrl}
            </a>
          </p>
        </div>
      )}

      {/* Show extracted text when available */}
      {isExtracting && <p>Extracting text...</p>}
      {extractedText && (
        <div>
          <h3>Extracted Text:</h3>
          <p>{extractedText}</p>
        </div>
      )}
      {/* Show final summary when ready */}
      {isSummarizing && <p>Generating summary...</p>}
      {summary && (
        <div>
          <h3>Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}