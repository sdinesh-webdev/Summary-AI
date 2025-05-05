import { useEdgeStore } from '@/lib/edgestore';
import { toast } from 'sonner';

interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

interface PdfUploaderProps {
  file: File;
  onProgress?: (progress: number) => void;
  onComplete?: (result: UploadResult) => void;
}

export const usePdfUploader = () => {
  const { edgestore } = useEdgeStore();

  const uploadPdf = async ({ file, onProgress, onComplete }: PdfUploaderProps): Promise<UploadResult> => {
    let loadingToastId: string | number = '';

    try {
      const uploadPromise = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          onProgress?.(progress);
          
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

      toast.dismiss(loadingToastId);
      toast.success('🎉 Upload complete!', {
        description: "Your PDF is safely in the cloud.",
        duration: 2000,
      });

      const result = { success: true, url: uploadPromise.url };
      onComplete?.(result);
      return result;

    } catch (error) {
      toast.dismiss(loadingToastId);
      const errorResult = {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed'
      };
      onComplete?.(errorResult);
      return errorResult;
    }
  };

  return { uploadPdf };
};
