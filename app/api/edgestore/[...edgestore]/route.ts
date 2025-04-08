import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import { initEdgeStore } from '@edgestore/server';

/**
 * EdgeStore Server Configuration
 * 
 * This file configures the server-side handling of file uploads through EdgeStore.
 * It defines:
 * - File upload rules and permissions
 * - File type restrictions (PDF only)
 * - Storage bucket configuration
 */

// Initialize EdgeStore with custom configuration
const es = initEdgeStore.create();

// Define the router with file upload rules
const edgeStoreRouter = es.router({
  // Configure the publicFiles bucket for PDF uploads
  publicFiles: es.fileBucket({
    accept: ['application/pdf'], // Only accept PDF files
    maxSize: 1024 * 1024 * 10, // 10MB file size limit
  }),
});

// Create and export the EdgeStore handler for Next.js API routes
const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

export { handler as GET, handler as POST };

// Export type for use in frontend
export type EdgeStoreRouter = typeof edgeStoreRouter;