
import { getBookmarksByUser } from '@/lib/api/bookmark';
import { getUser } from '@/lib/core/session';
import React from 'react';
import BookmarkCard from '../_components/BookmarkCard';
import { deleteBookmark } from '@/lib/actions/bookmark';
import { revalidatePath } from 'next/cache';

const SavedPromptsPage = async () => {
    const user = await getUser();
    // ইউজারের আইডি দিয়ে বুকমার্ক ডাটা আনা হচ্ছে
    const bookmarks = await getBookmarksByUser(user?.id) || [];

    console.log("bookmarks..", bookmarks);



    const handleDeleteBookmark = async (bookmarkId) => {
        "use server"
        await deleteBookmark(bookmarkId);
        revalidatePath('/dashboard/user/savedprompt')
        console.log("bookmarkId..",bookmarkId);
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">

            {/* হেডিং সেকশন */}
            <div className="mb-6">
                <h1 className="text-xl font-bold text-slate-200 tracking-tight">Saved Prompts</h1>
                <p className="text-xs text-slate-500 mt-1">
                    You have bookmarked {bookmarks.length} {bookmarks.length === 1 ? 'prompt' : 'prompts'}.
                </p>
            </div>

            {/* যদি কোনো বুকমার্ক না থাকে */}
            {bookmarks.length === 0 ? (
                <div className="py-20 flex flex-col items-center justify-center text-center border border-dashed border-slate-900 rounded-2xl bg-[#0f172a]/10">
                    <p className="text-sm font-medium text-slate-400">No bookmarks found</p>
                    <p className="text-xs text-slate-600 mt-1">Prompts you bookmark will appear here.</p>
                </div>
            ) : (
                /* বুকমার্ক গ্রিড লেআউট */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {bookmarks.map((bookmark) => (
                        <BookmarkCard
                            key={bookmark._id}
                            bookmarkId={bookmark._id}
                            promptId={bookmark.promptId}
                            aiTool={bookmark.aiTool}
                            category={bookmark.category}
                            title={bookmark.title}
                            description={bookmark.description}
                            onHhandleDeleteBookmark={handleDeleteBookmark}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedPromptsPage;