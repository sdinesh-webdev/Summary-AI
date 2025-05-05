export type SubscriptionTier = 'basic' | 'pro';

export interface User {
    id: string;
    email: string;
    clerkUserId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Subscription {
    id: string;
    userId: string;
    tier: SubscriptionTier;
    status: 'active' | 'cancelled' | 'expired';
    startDate: Date;
    endDate: Date;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
}

export interface Summary {
    id: string;
    userId: string;
    title: string;
    pdfUrl: string;
    summary: string;
    createdAt: Date;
    updatedAt: Date;
}
