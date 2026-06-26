import React from 'react';
import { getUser } from '@/lib/core/session';
import { getAdminAnalytics, getAnalyticsById } from '@/lib/api/prompt';
import AdminAnalyticsGrid from './_components/AdminAnalyticsGrid';

const AdminHomePage = async () => {
    const analyticsData = await getAdminAnalytics();

    console.log("admin analyticsData..", analyticsData);
    return <AdminAnalyticsGrid
        analyticsData={analyticsData}
    />
};

export default AdminHomePage;