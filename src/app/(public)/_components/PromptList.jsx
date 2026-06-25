import React from 'react';

const PromptList = ({
    allPromptsData,
    jobsData,
    filters,
    page,
    setPage,
}) => {
    return (
        <>
            {allPromptsData && allPromptsData.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {allPromptsData.map((prompt) => (
                            <PromptCard
                                key={prompt._id}
                                prompt={prompt}
                            />
                        ))}
                    </div>

                    <PaginationWithSummary
                        jobsData={jobsData}
                        filters={filters}
                        page={page}
                        setPage={setPage}
                        total={allPromptsData.length}
                    />
                </>
            ) : (
                <p>No prompts found.</p>
            )}
        </>
    );
};

export default PromptList;