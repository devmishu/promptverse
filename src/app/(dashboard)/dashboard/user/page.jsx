import React from 'react';
import { getUser } from '@/lib/core/session';
import { getAdminAnalytics, getAnalyticsById } from '@/lib/api/prompt';
import AdminAnalyticsGrid from './_components/UserAnalyticsGrid';
import UserAnalyticsGrid from './_components/UserAnalyticsGrid';

const AdminHomePage = async () => {
    const user = await getUser();
    const analyticsData = await getAnalyticsById(user?.id);

  
    return <UserAnalyticsGrid
        analyticsData={analyticsData}
    />
};

export default AdminHomePage;