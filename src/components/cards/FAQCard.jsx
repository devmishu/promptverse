"use client";
import { Accordion } from "@heroui/react";
import { ChevronDown, ShoppingBag, UserPlus, Wallet, ShieldCheck, HelpCircle } from "lucide-react";

export function FAQCard({ faqs }) {
    // প্রতিটি প্রশ্নের জন্য একটি করে মানানসই Lucide Icon ম্যাপিং
    const icons = [
        <ShoppingBag key="0" className="size-4" />,
        <UserPlus key="1" className="size-4" />,
        <Wallet key="2" className="size-4" />,
        <ShieldCheck key="3" className="size-4" />,
        <HelpCircle key="4" className="size-4" />
    ];

    return (
        <Accordion className="w-full flex flex-col gap-4">
            {faqs.map((item, index) => (
                <Accordion.Item
                    key={index}
                    value={`item-${index}`}
                    className="bg-[#0b1329]/40 backdrop-blur-md border border-[#1e293b]/50 rounded-xl px-4 text-gray-400 group data-[open=true]:border-cyan-500/40 data-[open=true]:bg-[#111827]/80 transition-all duration-300"
                >
                    <Accordion.Heading>
                        <Accordion.Trigger className="flex items-center justify-between w-full py-4 text-left font-medium text-gray-200 hover:text-white transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                                <span className="text-cyan-400 shrink-0">
                                    {icons[index] || <HelpCircle className="size-4" />}
                                </span>
                                <span className="text-sm md:text-base">{item.question}</span>
                            </div>
                            <Accordion.Indicator className="transition-transform duration-300 text-gray-500 group-data-[open=true]:text-cyan-400 group-data-[open=true]:rotate-180">
                                <ChevronDown className="size-4" />
                            </Accordion.Indicator>
                        </Accordion.Trigger>
                    </Accordion.Heading>

                    <Accordion.Panel>
                        <Accordion.Body className="text-sm text-gray-400 pb-4 leading-relaxed border-t border-[#1e293b]/30 pt-3">
                            {item.answer}
                        </Accordion.Body>
                    </Accordion.Panel>
                </Accordion.Item>
            ))}
        </Accordion>
    );
}