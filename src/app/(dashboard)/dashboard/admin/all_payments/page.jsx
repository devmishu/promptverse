import { getAllSubscriptionsByAdmin } from '@/lib/api/subscription';
import React from 'react';

const AllPaymentsPage = async () => {
    const allPayments = await getAllSubscriptionsByAdmin();

    console.log("allPayments...........", allPayments);
    return (
        <div>
            AllPaymentsPage
        </div>
    );
};

export default AllPaymentsPage;