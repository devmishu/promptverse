"use client";

import React, { useEffect, useState } from "react";
import { Button, Label, ListBox, Select, TextArea, Modal, Surface } from "@heroui/react";
import { ShieldCheck, AlertTriangle } from "lucide-react";
import { toast } from "react-hot-toast";
import { createReport } from "@/lib/actions/report";

export function ReportModal({ author, promptData }) {
    const [hasReported, setHasReported] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isChecking, setIsChecking] = useState(true); // 🛠️ ফিক্স: লোডিং স্টেট যোগ করা হয়েছে

    useEffect(() => {
        const checkReportStatus = async () => {
            if (!author?.id || !promptData?._id) {
                setIsChecking(false);
                return;
            }

            try {
                const res = await fetch(`http://localhost:5000/api/reports/check?userId=${author.id}&promptId=${promptData._id}`);
                const data = await res.json();
                if (data?.hasReported) {
                    setHasReported(true); // 🛠️ ফিক্স: স্টেট ভ্যারিয়েবলের সঠিক নাম (setHasReported) দেওয়া হয়েছে
                }
            } catch (error) {
                console.error("Error checking report status:", error);
            } finally {
                setIsChecking(false);
            }
        };

        checkReportStatus();
    }, [author?.id, promptData?._id]);


    const handleUserReport = async (e) => {
        e.preventDefault();

        if (hasReported) {
            toast.error("You have already reported this prompt!");
            return;
        }

        const formData = new FormData(e.target);
        const reportData = Object.fromEntries(formData.entries());

        // সিলেক্ট ফিল্ডের ভ্যালু ভ্যালিডেশন
        if (!reportData.reason) {
            toast.error("Please select a reason for reporting!");
            return;
        }

        try {
            setIsSubmitting(true);

            const finalReportData = {
                reason: reportData.reason,
                description: reportData.description || "",
                userName: author?.name,
                userImail: author?.email, // আপনার দেওয়া স্পেলিং
                userId: author?.id,
                promptId: promptData?._id,
                title: promptData?.title,
            };

            // আপনার ব্যাকএন্ড সার্ভার অ্যাকশন বা এপিআই কল
            const res = await createReport(finalReportData);

            if (res?.success) {
                setHasReported(true);
                toast.success("Report submitted successfully!");
            } else {
                if (res?.alreadyReported) {
                    setHasReported(true);
                }
                toast.error(res?.message || "Failed to submit report.");
            }

        } catch (error) {
            console.error("Report submit error:", error);
            const errorMessage = error?.response?.data?.message || error?.message || "";

            if (errorMessage.includes("already reported") || error?.response?.data?.alreadyReported) {
                setHasReported(true);
                toast.error("You have already reported this prompt!");
            } else {
                toast.error("Something went wrong. Try again!");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // এপিআই চেকিং চলাকালীন বাটনটি লোডিং মোডে থাকবে যেন ইউজার ইনস্ট্যান্ট ফ্লিকার না দেখে
    if (isChecking) {
        return (
            <Button isIconOnly size="md" variant="light" className="text-slate-600 rounded-xl" isLoading />
        );
    }

    return (
        <Modal>
            {/* মোডাল ওপেন বাটন - অলরেডি রিপোর্টেড হলে ইন্ডিকেটর হিসেবে কালার চেইঞ্জ হবে */}
            <Button
                isIconOnly
                size="md"
                variant="light"
                className={`rounded-xl transition-all ${hasReported ? "text-rose-500 bg-rose-500/10" : "text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"}`}
            >
                <ShieldCheck size={18} />
            </Button>

            <Modal.Backdrop className="bg-[#020617]/80 backdrop-blur-md">
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md bg-[#090d16] border border-slate-950 shadow-2xl rounded-2xl overflow-hidden">
                        <Modal.CloseTrigger className="text-slate-500 hover:text-slate-200" />

                        <Modal.Header className="flex flex-col items-center text-center p-6 bg-[#0f172a]/40 border-b border-slate-900">
                            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-3 shadow-[0_0_15px_rgba(244,63,94,0.1)]">
                                <AlertTriangle className="size-5" />
                            </div>
                            <Modal.Heading className="text-slate-200 font-bold text-lg tracking-tight">Report Prompt</Modal.Heading>
                            <p className="mt-1.5 text-xs leading-relaxed text-slate-500 max-w-sm">
                                Help us keep the community safe. If this prompt violates copyright, rules, or is spam, please let us know.
                            </p>
                        </Modal.Header>

                        <Modal.Body className="p-6 bg-[#020617]/20">
                            {hasReported ? (
                                <div className="py-8 flex flex-col items-center justify-center text-center border border-dashed border-slate-900 rounded-xl bg-[#0f172a]/10">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-3">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <p className="text-sm font-bold text-slate-300 uppercase tracking-wider">Already Reported</p>
                                    <p className="text-xs text-slate-500 mt-1 max-w-[240px]">Our team is already reviewing this prompt. Thank you for your patience!</p>
                                </div>
                            ) : (
                                <Surface variant="default" className="bg-transparent shadow-none border-none p-0">
                                    <form onSubmit={handleUserReport} className="flex flex-col gap-5">

                                        {/* সিলেক্ট রিজন */}
                                        <div className="flex flex-col gap-1.5">
                                            <Label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Reason for Report</Label>
                                            <Select placeholder="Select a reason" name="reason" className="w-full">
                                                <Select.Trigger className="bg-[#020617]/60 border border-slate-900 hover:border-slate-800 text-slate-300 rounded-xl h-11 transition-all">
                                                    <Select.Value />
                                                    <Select.Indicator className="text-slate-500" />
                                                </Select.Trigger>
                                                <Select.Popover className="bg-[#090d16] border border-slate-900 rounded-xl shadow-2xl p-1">
                                                    <ListBox className="text-slate-300">
                                                        <ListBox.Item id="inappropriate" textValue="Inappropriate Content" className="hover:bg-slate-900 p-2.5 rounded-lg text-sm cursor-pointer transition-colors">
                                                            Inappropriate Content
                                                        </ListBox.Item>
                                                        <ListBox.Item id="spam" textValue="Spam" className="hover:bg-slate-900 p-2.5 rounded-lg text-sm cursor-pointer transition-colors">
                                                            Spam / Misleading
                                                        </ListBox.Item>
                                                        <ListBox.Item id="copyright" textValue="Copyright Violation" className="hover:bg-slate-900 p-2.5 rounded-lg text-sm cursor-pointer transition-colors">
                                                            Copyright Violation
                                                        </ListBox.Item>

                                                    </ListBox>
                                                </Select.Popover>
                                            </Select>
                                        </div>

                                        {/* ডেসক্রিপশন */}
                                        <div className="flex flex-col gap-1.5">
                                            <Label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Additional Description (Optional)</Label>
                                            <TextArea
                                                name="description"
                                                aria-label="Report Details"
                                                rows={4}
                                                
                                                placeholder="Provide more details about the issue..."
                                                className={{
                                                    inputWrapper: "bg-[#020617]/60 border border-slate-900 focus-within:border-slate-800 rounded-xl p-3.5 transition-all",
                                                    input: "text-sm text-slate-300 placeholder:text-slate-700 min-h-[100px]",
                                                }}
                                            />
                                        </div>

                                        {/* ফুটার বাটনস */}
                                        <Modal.Footer className="p-0 mt-2 flex gap-3 border-none bg-transparent">
                                            <Button
                                                slot="close"
                                                variant="secondary"
                                                className="flex-1 h-11 rounded-xl border border-slate-900 bg-transparent hover:bg-slate-900 text-slate-400 text-sm font-semibold transition-all"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                isLoading={isSubmitting}
                                                className="flex-1 h-11 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold transition-all shadow-[0_4px_12px_rgba(225,29,72,0.2)]"
                                            >
                                                Submit Report
                                            </Button>
                                        </Modal.Footer>
                                    </form>
                                </Surface>
                            )}
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}