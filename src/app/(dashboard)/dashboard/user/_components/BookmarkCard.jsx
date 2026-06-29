"use client"
import { AlertDialog, Button, Card, Chip } from "@heroui/react";
import { Zap, ShieldCheck, Sparkles, Coins, Users, Flame, Icon, Eye, Delete, Trash, Trash2 } from "lucide-react";
import Link from "next/link";


export default function BookmarkCard({ bookmarkId, promptId, aiTool, category, title, description, onHhandleDeleteBookmark }) {


    return (
        <Card className="w-full bg-[#111827]/40 border border-[#1e293b]/50 p-6 rounded-2xl flex flex-col gap-3 backdrop-blur-sm hover:border-cyan-500/30 hover:bg-[#111827]/60 transition-all duration-300 group">


            {/* Header Section */}
            <Card.Header className="p-0 flex flex-col items-start gap-1 mt-2">

                <div className="flex flex-wrap gap-1.5 items-center">

                    <Chip
                        size="sm"
                        variant="bordered"
                        className="text-[10px] font-semibold text-gray-400 border-gray-800 h-6"
                    >
                        {aiTool}
                    </Chip>
                    <Chip
                        size="sm"
                        variant="bordered"
                        className="text-[10px] font-semibold text-gray-400 border-gray-800 h-6"
                    >
                        {category}
                    </Chip>

                </div>
                <Card.Title className="text-base font-semibold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                    {title}
                </Card.Title>
            </Card.Header>

            {/* Footer Section holding the feature description */}
            <Card.Footer className="p-0 flex flex-col items-start">
                <p className="text-sm text-gray-400 leading-relaxed font-normal tracking-tight text-left">
                    {description}
                </p>

                <div className="flex items-center gap-2 w-full mt-2">

                    <Link href={`/allprompts/${promptId}`} className="flex-[3] w-full">
                        <Button
                            size="sm"
                            className="w-full h-9 rounded-xl bg-[#111827] hover:bg-[#1f2937] text-gray-300 font-semibold text-xs border border-gray-800 hover:border-cyan-500/30 transition-all flex items-center justify-center gap-2"
                        >
                            <Eye size={14} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
                            View Details
                        </Button>
                    </Link>




                    <AlertDialog>
                        <Button
                            size="sm"
                            className="flex-[1] h-9 rounded-xl bg-[#111827] hover:bg-rose-500/10 text-gray-400 hover:text-rose-400 border border-gray-800 hover:border-rose-500/20 transition-all flex items-center justify-center"
                        >
                            <Trash2 size={14} />
                        </Button>
                        <AlertDialog.Backdrop>
                            <AlertDialog.Container>
                                <AlertDialog.Dialog className="sm:max-w-[400px]">
                                    <AlertDialog.CloseTrigger />
                                    <AlertDialog.Header>
                                        <AlertDialog.Icon status="danger" />
                                        <AlertDialog.Heading>Delete Bookmark permanently?</AlertDialog.Heading>
                                    </AlertDialog.Header>
                                    <AlertDialog.Body>
                                        <p>
                                            This will permanently delete <strong>{""}</strong> and all of its
                                            data. This action cannot be undone.
                                        </p>
                                    </AlertDialog.Body>
                                    <AlertDialog.Footer>
                                        <Button slot="close" variant="tertiary">
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={() => onHhandleDeleteBookmark(bookmarkId)}
                                            slot="close" variant="danger">
                                            Delete Bookmark
                                        </Button>
                                    </AlertDialog.Footer>
                                </AlertDialog.Dialog>
                            </AlertDialog.Container>
                        </AlertDialog.Backdrop>
                    </AlertDialog>
                </div>
            </Card.Footer>
        </Card>
    );
}