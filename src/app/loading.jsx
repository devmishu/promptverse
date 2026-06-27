"use client";
import React from "react";
import { ScaleLoader } from "react-spinners";

export default function Loading() {
    return (
        <main className="min-h-screen w-full bg-[#030712] text-white flex flex-col items-center justify-center relative overflow-hidden px-4">
            <ScaleLoader
                color="#06b6d4"
                height={40}
                width={6}
            />
        </main>
    );
}