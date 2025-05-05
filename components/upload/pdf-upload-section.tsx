'use client';

// Import necessary dependencies
import * as React from 'react';
import { useEdgeStore } from '@/lib/edgestore';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

// Define what props our component needs
interface PdfUploadSectionProps {
  isSignedIn: boolean;
  onUploadComplete: (url: string) => void;
}

export function PdfUploadSection({ isSignedIn, onUploadComplete }: PdfUploadSectionProps) {
  // State management
  const [file, setFile] = React.useState<File>();
  const [error, setError] = React.useState<string>('');
  const [isUploading, setIsUploading] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const { edgestore } = useEdgeStore();

  // Validate file function
  const validateFile = (file: File) => {
    if (!file.type.includes('pdf')) {
      toast.error('📚 Oops! PDFs only please!', {
        description: "Let's stick to PDF files for now.",
        duration: 3000,
      });
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('📦 That\'s a big file!', {
        description: 'Keep it under 10MB please.',
        duration: 3000,
      });
      return false;
    }
    return true;
  };

  // Handle upload function
  const handleUpload = async () => {
    if (!isSignedIn) {
      toast.error('Please sign in to upload files');
      return;
    }

    if (!file) return;

    try {
      setIsUploading(true);
      let loadingToastId: string | number = '';

      const uploadPromise = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          setUploadProgress(progress); // Update progress state
          if (progress === 0) {
            loadingToastId = toast.loading('🚀 Initiating upload...', {
              duration: Infinity,
            });
          } else if (progress === 100) {
            toast.dismiss(loadingToastId);
          } else if (progress % 25 === 0) {
            toast.dismiss(loadingToastId);
            loadingToastId = toast.loading(`📤 Upload progress: ${progress}%`, {
              duration: Infinity,
            });
          }
        },
      });

      toast.dismiss(loadingToastId);
      toast.success('🎉 Upload complete!', {
        description: "Your PDF is safely in the cloud.",
        duration: 2000,
      });

      onUploadComplete(uploadPromise.url);

    } catch (err) {
      toast.error('⚠️ Upload failed', {
        description: "Please try again.",
        duration: 3000,
      });
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle file removal
  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(undefined);
    setUploadProgress(0);
    setError('');
  };

  // Drag and drop handlers
  const handleDragIn = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOut = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
      setError('');
    }
  };

  return (
    <div className="bg-yellow-50 rounded-xl border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col min-h-[600px]">
      {/* Upload Box Header */}
      <h2 className="text-lg lg:text-3xl font-extrabold text-center text-black mb-4">Upload PDF</h2>
      
      {/* Hidden File Input - Triggered by click events */}
      <input
        type="file"
        accept=".pdf,application/pdf"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0];
          if (selectedFile && validateFile(selectedFile)) {
            setFile(selectedFile);
            setError('');
          }
        }}
        className="hidden"
        id="pdf-upload"
      />
      
      {/* Drag and Drop Container */}
      <div className="flex flex-col flex-1">
        {/* Interactive Drop Zone Area */}
        <div
          className={`border-2 border-dashed ${isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300'} w-full h-full rounded-md p-4 cursor-pointer`}
          onClick={() => document.getElementById('pdf-upload')?.click()}
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {/* Upload Instructions Area */}
          <div className={`flex flex-col w-full pt-18 items-center justify-center text-center transition-all duration-300 ${file ? 'mb-4' : ''}`}>
            <Image 
              src="/pdf.png" 
              alt="Upload PDF" 
              width={130} 
              height={130} 
              className="transform transition-all duration-300 ease-in-out hover:scale-110" 
            />
            <div className="flex gap-2 mt-4">
              <p className="font-bold text-xl text-green-500 underline">Choose</p>
              <p className="font-bold text-xl text-gray-600">Your Files Here.</p>
            </div>
            <p className="font-bold text-sm text-gray-400 m-0.5">10MB Max PDF Size</p>
          </div>

          {/* File Preview Card - Shows when file is selected */}
          {file && (
            <div className="pt-4">
              {/* File Details Container - Black themed card */}
              <div className="border-2 w-full rounded-lg p-3 bg-black shadow-lg">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div>
                        <Image
                          className="p-0"
                          src="/pdf.png"
                          alt="PDF"
                          width={94}
                          height={94}
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xl ml-[-15px] font-semibold text-gray-200 truncate max-w-[200px]">
                          {file.name}
                        </p>
                        <p className="text-sm ml-[-15px] font-semibold text-gray-200">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleRemoveFile}
                      className="p-1 mr-2 hover:text-black rounded-full bg-rose-500"
                    >
                      <svg
                        className="w-5 h-5 text-black hover:text-yellow-200"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="w-[100%] bg-gray-200 rounded-full h-1.5 border-1 border-yellow-400">
                    <div
                      className="bg-yellow-400 h-1.5 rounded-full transition-all duration-300 font-semibold"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm font-semibold text-gray-200 mr-2 text-right">{uploadProgress}%</p>
                </div>
              </div>

              {/* Upload Action Button */}
              {/* Changes appearance based on upload state and sign-in status */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpload();
                }}
                disabled={isUploading || !isSignedIn}
                className={`w-full mt-6 py-3.5 px-4 rounded-lg font-semibold
                  transform transition-all duration-200 active:scale-95 shadow-sm shadow-amber-200
                  ${isUploading 
                    ? 'bg-yellow-400/90 cursor-not-allowed' 
                    : 'bg-yellow-400 hover:bg-yellow-400/90 hover:shadow-md'
                  }`}
              >
                {isUploading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Uploading...
                  </span>
                ) : 'Upload PDF'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Error Message Container */}
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      
      {/* Authentication Status Message */}
      {!isSignedIn && (
        <p className="text-sm text-red-500 mt-2">
          Please sign in to upload files
        </p>
      )}
    </div>
  );
}
