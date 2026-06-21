import { getBookmarksByUser } from '@/lib/api/bookmark';
import { getUser } from '@/lib/core/session';
import React from 'react';

const SavedPromptsPage = async () => {
    const user = await getUser();
    const bookmarks = await getBookmarksByUser(user?.id);
    console.log("bookmarks data ", bookmarks);
    return (
        <div>
            SavedPromptsPage
        </div>
    );
};

export default SavedPromptsPage;