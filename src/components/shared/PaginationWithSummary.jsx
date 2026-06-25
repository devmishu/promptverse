"use client";

import { Pagination } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function PaginationWithSummary({ promptsData, filters, total }) {
    const [page, setPage] = useState(1);
    const totalItems = total;
    const itemsPerPage = 8;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const router = useRouter();

    useEffect(() => {
        const sp = new URLSearchParams();

        if (page) {
            sp.set('page', page)
        }
        if (itemsPerPage) {
            sp.set('itemsPerPage', itemsPerPage)
        }

        // নতুন সার্চ প্যারামস দিয়ে পাথ তৈরি করা হচ্ছে
        const searchString = sp.toString();
        const path = searchString ? `?${searchString}` : window.location.pathname;

        router.push(path);

    }, [page, router]);

    const getPageNumbers = () => {
        const pages = [];
        pages.push(1);
        if (page > 3) {
            pages.push("ellipsis");
        }
        const start = Math.max(2, page - 1);
        const end = Math.min(totalPages - 1, page + 1);
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        if (page < totalPages - 2) {
            pages.push("ellipsis");
        }
        pages.push(totalPages);
        return pages;
    };


    const startItem = (page - 1) * itemsPerPage + 1;
    const endItem = Math.min(page * itemsPerPage, totalItems);

    return (
        <Pagination className="w-full">
            <Pagination.Summary>
                Showing {startItem}-{endItem} of {totalItems} results
            </Pagination.Summary>
            <Pagination.Content>
                <Pagination.Item>
                    <Pagination.Previous isDisabled={page === 1} onPress={() => setPage((p) => p - 1)}>
                        <Pagination.PreviousIcon />
                        <span>Previous</span>
                    </Pagination.Previous>
                </Pagination.Item>
                {getPageNumbers().map((p, i) =>
                    p === "ellipsis" ? (
                        <Pagination.Item key={`ellipsis-${i}`}>
                            <Pagination.Ellipsis />
                        </Pagination.Item>
                    ) : (
                        <Pagination.Item key={p}>
                            <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                                {p}
                            </Pagination.Link>
                        </Pagination.Item>
                    ),
                )}
                <Pagination.Item>
                    <Pagination.Next isDisabled={page === totalPages} onPress={() => setPage((p) => p + 1)}>
                        <span>Next</span>
                        <Pagination.NextIcon />
                    </Pagination.Next>
                </Pagination.Item>
            </Pagination.Content>
        </Pagination>
    );
}