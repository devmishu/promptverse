import React from 'react';
import CreatorAnalyticsGrid from './_components/CreatorAnalyticsGrid';
import { getUser } from '@/lib/core/session';
import { getAnalyticsById } from '@/lib/api/prompt';

const CreatorHomePage = async () => {
    const user = await getUser();
    const analyticsData = await getAnalyticsById(user?.id);

    

    console.log("analyticsData..", analyticsData);
    return <CreatorAnalyticsGrid
        analyticsData={analyticsData}
    />
};

export default CreatorHomePage;