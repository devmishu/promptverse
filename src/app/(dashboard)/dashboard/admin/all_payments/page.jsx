import { getAllSubscriptionsByAdmin } from '@/lib/api/subscription';
import React from 'react';
import AdminPaymentTable from '../_components/AdminPaymentTable';

const AllPaymentsPage = async () => {
    
    const allPayments = await getAllSubscriptionsByAdmin();

    console.log("allPayments...........", allPayments);


    
    return (
        <div className='p-4 sm:mt-5'>
            
            <AdminPaymentTable payments={allPayments}/>
        </div>
    );
};

export default AllPaymentsPage;