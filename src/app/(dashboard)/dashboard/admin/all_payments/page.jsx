import { getAllSubscriptionsByAdmin } from '@/lib/api/subscription';
import React from 'react';
import AdminPaymentTable from '../_components/AdminPaymentTable';
import EmptyStateCard from '@/components/cards/EmptyStateCard';

const AllPaymentsPage = async () => {

    const allPayments = await getAllSubscriptionsByAdmin();

    



    return (
        <div className='p-4 sm:mt-5'>

            {
                allPayments.length === 0 ? <EmptyStateCard className={`mt-50`}/> :
                    <AdminPaymentTable payments={allPayments} />
            }


        </div>
    );
};

export default AllPaymentsPage;