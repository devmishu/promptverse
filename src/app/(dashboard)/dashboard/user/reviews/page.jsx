import { getReviewsByUser } from '@/lib/api/review';
import { getUser } from '@/lib/core/session';
import React from 'react';
import UserReviewTable from '../_components/UserReviewTable';

const ReviewsPage = async () => {
    const user = await getUser()
    const reviews = await getReviewsByUser(user?.id)

    console.log("reviews data....", reviews);
    return (

        <div className='px-5 md:pr-10 md:my-10'>
            <UserReviewTable reviews={reviews} />
        </div>
    );
};

export default ReviewsPage;