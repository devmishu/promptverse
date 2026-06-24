"use client";

import { Button } from "@heroui/react";
import { CreditCard, Eye, Trash2, Calendar, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AdminPaymentTable({ payments = [], onView, onDelete }) {

    console.log("admin all payments..", payments);

    // পেমেন্ট স্ট্যাটাসের ডাইনামিক স্টাইল
    const getStatusStyle = (status) => {
        switch (status?.toUpperCase()) {
            case "PAID":
            case "SUCCESS":
                return "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
            case "FAILED":
                return "bg-rose-500/10 border-rose-500/30 text-rose-400";
            default:
                return "bg-amber-500/10 border-amber-500/30 text-amber-500";
        }
    };

    // প্ল্যান অনুযায়ী ডাইনামিক ব্যাজ স্টাইল
    const getPlanStyle = (plan) => {
        const p = plan?.toUpperCase();
        if (p === "PREMIUM") return "bg-purple-500/10 border-purple-500/20 text-purple-400";
        if (p === "ENTERPRISE") return "bg-indigo-500/10 border-indigo-500/20 text-indigo-400";
        return "bg-cyan-500/10 border-cyan-500/20 text-cyan-400";
    };

    return (
        <div className="w-full bg-[#111827]/20 border border-[#1e293b]/50 rounded-3xl backdrop-blur-md p-4 sm:p-6 shadow-2xl relative overflow-hidden">

            {/* Table Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
                        <CreditCard className="text-cyan-400 size-4 sm:size-5" />
                        Transaction & Payment Records
                    </h2>
                    <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
                        Monitor platform revenue, user subscriptions, and gateway transaction states.
                    </p>
                </div>
            </div>

            {/* Clean Scrollable Wrapper */}
            <div className="w-full overflow-x-auto touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <table className="w-full min-w-[1000px] border-collapse text-left table-auto">
                    <thead>
                        <tr className="bg-[#030712]/80 border-b border-[#1e293b]/40">
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4 whitespace-nowrap">Customer Info</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4 whitespace-nowrap">Transaction ID</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4 whitespace-nowrap">Plan Tier</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4 whitespace-nowrap">Amount</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4 whitespace-nowrap">Method</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4 whitespace-nowrap">Status</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4 whitespace-nowrap">Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments.map((payment) => {
                            // MongoDB `$date` বা ডিরেক্ট ISO স্ট্রিং উভয় ফরম্যাট সেফলি হ্যান্ডেল করার লজিক
                            const rawDate = payment?.createdAt?.$date || payment?.createdAt;
                            const formattedDate = rawDate
                                ? new Date(rawDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                : "N/A";

                            return (
                                <tr key={payment?._id?.$oid || payment?._id} className="border-b border-[#1e293b]/20 hover:bg-[#111827]/30 transition-colors group">

                                    {/* Column 1: Customer Email */}
                                    <td className="py-4 px-4">
                                        <div className="flex flex-col max-w-[220px]">
                                            <span className="font-semibold text-sm text-gray-200 tracking-wide group-hover:text-cyan-400 transition-colors truncate">
                                                {payment.email}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Column 2: Transaction ID */}
                                    <td className="py-4 px-4 whitespace-nowrap">
                                        <span className="text-sm font-mono text-gray-400">
                                            {payment.transactionId}
                                        </span>
                                    </td>

                                    {/* Column 3: Plan ID */}
                                    <td className="py-4 px-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center justify-center px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-md border ${getPlanStyle(payment.planId)}`}>
                                            {payment.planId}
                                        </span>
                                    </td>

                                    {/* Column 4: Amount & Currency */}
                                    <td className="py-4 px-4 whitespace-nowrap">
                                        <span className="text-sm text-emerald-400 font-semibold">
                                            {payment.amount} {payment.currency?.toUpperCase()}
                                        </span>
                                    </td>

                                    {/* Column 5: Card Details */}
                                    <td className="py-4 px-4 whitespace-nowrap">
                                        <span className="text-xs text-gray-400 flex items-center gap-1 font-medium capitalize">
                                            <ShieldCheck className="size-3.5 text-gray-500" />
                                            {payment.cardBrand} (•••• {payment.cardLast4})
                                        </span>
                                    </td>

                                    {/* Column 6: Payment Status */}
                                    <td className="py-4 px-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center justify-center px-3 py-1 text-[10px] font-bold tracking-widest rounded-full border shadow-sm ${getStatusStyle(payment.paymentStatus)}`}>
                                            {payment.paymentStatus}
                                        </span>
                                    </td>

                                    {/* Column 7: Formatted Date */}
                                    <td className="py-4 px-4 whitespace-nowrap">
                                        <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                                            <Calendar className="size-3.5 text-gray-500" />
                                            {formattedDate}
                                        </div>
                                    </td>

                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    );
}