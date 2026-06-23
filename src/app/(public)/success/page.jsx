import { redirect } from 'next/navigation'
import { stripe } from '../../../lib/stripe'
import { CheckCircle2, Mail, ArrowRight, Sparkles } from 'lucide-react'
import { createSubscription } from '@/lib/actions/subscription'

export default async function Success({ searchParams }) {
    const { session_id } = await searchParams

    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)')

    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent.payment_method'] // ⚡ payment_method expand করা হয়েছে কার্ড ডিটেইলস পাওয়ার জন্য
    })

    const {
        status,
        customer_details: { email: customerEmail, name: customerName },
        metadata,
    } = session

    if (status === 'open') {
        return redirect('/')
    }

    if (status === 'complete') {
        // ⚡ স্ট্রাইপ সেশন থেকে প্রয়োজনীয় সব পেমেন্ট ইনফরমেশন সংগ্রহ
        const paymentIntent = session.payment_intent;
        const paymentMethod = paymentIntent?.payment_method;



        const subsInfo = {
            email: customerEmail,
            planId: metadata.planId,
            transactionId: paymentIntent?.id || session.id, // ট্রানজেকশন আইডি (Payment Intent ID)
            amount: session.amount_total ? session.amount_total / 100 : 0, // সেন্ট থেকে মেইন কারেন্সিতে রূপান্তর (যেমন: USD)
            currency: session.currency?.toUpperCase(), // কারেন্সি (USD, BDT ইত্যাদি)
            paymentStatus: session.payment_status, // paid, unpaid ইত্যাদি
            cardBrand: paymentMethod?.card?.brand || 'N/A', // কার্ডের ব্র্যান্ড (Visa, Mastercard ইত্যাদি)
            cardLast4: paymentMethod?.card?.last4 || 'N/A', // কার্ডের শেষ ৪ ডিজিট
        }

        const result = await createSubscription(subsInfo)
        if (result) {
            redirect(`${metadata.currentPage}`)
        }


        return (
            <main className="min-h-screen bg-[#020617] text-slate-200 flex items-center justify-center p-4 font-sans selection:bg-purple-500/30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.03),transparent_50%)] pointer-events-none" />

                <section id="success" className="w-full max-w-md bg-[#0f172a]/30 border border-slate-800/60 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl relative text-center backdrop-blur-sm overflow-hidden">
                    {/* টপ গ্লো ইফেক্ট */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

                    {/* সাকসেস আইকন অ্যানিমেশনসহ */}
                    <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)] mb-6 animate-fade-in">
                        <CheckCircle2 size={32} className="stroke-[1.5]" />
                    </div>

                    {/* হেডিং */}
                    <div className="space-y-2 mb-6">
                        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center justify-center gap-2">
                            Payment Success!
                        </h1>
                        <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10 inline-block">
                            Premium Activated
                        </p>
                    </div>

                    {/* কাস্টমার ইনফো কার্ড */}
                    <div className="bg-[#0b0f19]/60 border border-slate-900/50 p-4 rounded-2xl text-left space-y-3 mb-8">
                        {customerName && (
                            <div className="flex flex-col">
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Thank You,</span>
                                <span className="text-sm font-bold text-slate-200 flex items-center gap-1.5 mt-0.5">
                                    {customerName} <Sparkles size={13} className="text-amber-400 fill-amber-400" />
                                </span>
                            </div>
                        )}
                        <div className="flex flex-col">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Confirmation Sent To</span>
                            <span className="text-sm font-medium text-emerald-400 truncate mt-0.5 flex items-center gap-1.5">
                                <Mail size={13} className="text-slate-600" />
                                {customerEmail}
                            </span>
                        </div>
                    </div>

                    {/* মেইন মেসেজ ও সাপোর্ট */}
                    <div className="space-y-6">
                        <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
                            We appreciate your business! Your account has been upgraded instantly. If you have any questions or encounter any issues, please reach out to our team at{' '}
                            <a
                                href="mailto:orders@example.com"
                                className="text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-4 font-medium"
                            >
                                orders@example.com
                            </a>.
                        </p>

                        {/* কল টু অ্যাকশন বাটন */}
                        <a
                            href="/"
                            className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-200 text-black font-bold text-xs sm:text-sm py-3 px-6 rounded-xl transition-all duration-300 active:scale-[0.98] shadow-lg group"
                        >
                            <span>Go to Workspace</span>
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                        </a>
                    </div>
                </section>
            </main>
        )
    }
}