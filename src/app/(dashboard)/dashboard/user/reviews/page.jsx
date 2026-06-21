import { getReviewsByUser } from '@/lib/api/review';
import { getUser } from '@/lib/core/session';
import React from 'react';

const ReviewsPage = async () => {
    const user = await getUser()
    const reviews = await getReviewsByUser(user?.id)

    console.log("reviews data....", reviews);
    return (
        <div>
            ReviewsPage {reviews?.length}
        </div>
    );
};

export default ReviewsPage;