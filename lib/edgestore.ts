'use client';

import { createEdgeStoreProvider } from '@edgestore/react';
import { type EdgeStoreRouter } from '../app/api/edgestore/[...edgestore]/route';

/**
 * EdgeStore Configuration
 * 
 * This file sets up the EdgeStore client configuration for file uploads
 * EdgeStore is a modern file hosting service that provides:
 * - Direct file uploads
 * - Progress tracking
 * - Secure file storage
 */

// Create a provider with the EdgeStore router type
const { EdgeStoreProvider, useEdgeStore } = createEdgeStoreProvider<EdgeStoreRouter>();

export { EdgeStoreProvider, useEdgeStore };