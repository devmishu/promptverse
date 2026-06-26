"use client";

import { useState } from "react";
import { FloppyDisk } from "@gravity-ui/icons";
import {
    Button,
    Description,
    FieldError,
    FieldGroup,
    Fieldset,
    Form,
    Input,
    Label,
    TextArea,
    TextField,
    Radio,
    RadioGroup,
} from "@heroui/react";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { createprompt } from "@/lib/actions/prompt";
import { useRouter } from "next/navigation";



export default function AddPrompt({ submitBtn }) {
    const [isUploading, setIsUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const session = useSession();
    const user = session?.data?.user

    const router = useRouter();

    // Handle ImgBB Direct Upload with Robust Error Boundary
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // ImgBB API Key (আপনার API Key এখানে বসাবেন অথবা environment variable ব্যবহার করবেন)
        const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

        const formData = new FormData();
        formData.append("image", file);

        try {
            setIsUploading(true);
            const loadingToast = toast.loading("Uploading thumbnail image to ImgBB...");

            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                setImageUrl(result.data.display_url);
                toast.success("Thumbnail uploaded successfully!", { id: loadingToast });
            } else {
                throw new Error(result.error?.message || "ImgBB upload rejected.");
            }
        } catch (error) {
            console.error("Image Upload Failed:", error);
            toast.error("Image upload failed. Please try a different image.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleAddPrompt = async (e) => {
        e.preventDefault();

        if (!imageUrl) {
            toast.error("Please upload a thumbnail image before submitting!");
            return;
        }

        const formData = new FormData(e.target);
        const promptData = Object.fromEntries(formData.entries());

        const { title, description, content, category, aiTool, difficulty, visibility } = promptData;

        // Appending requirements parameters
        const promptPayload = {
            userId: user?.id,
            title,
            description,
            content,
            category,
            aiTool,
            tags: promptData.tags ? promptData.tags.split(",").map(tag => tag.trim()) : [],
            difficulty,
            visibility,
            thumbnail: imageUrl,
            copyCount: 0,
            status: "pending",
        };

        console.log("Final Prompt Payload Architecture:", promptPayload);

        try {


            const data = await createprompt(promptPayload);


            console.log(data);

            toast.success(`${data.message}`);
            router.push(`/dashboard/${user?.role}/myprompt`);

        } catch (error) {
            console.error("create prompt failed:", error);
            toast.error("create prompt failed:", error);
        }
    };



    return (
        <div className="bg-[#030712] text-white min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">

            {/* Background Ambient Cosmic Glow Layer */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

            <Form
                className="w-full max-w-2xl bg-[#111827]/40 border border-[#1e293b]/60 shadow-2xl rounded-3xl p-6 sm:p-8 backdrop-blur-md z-10"
                onSubmit={handleAddPrompt}
            >
                <Fieldset>
                    <Fieldset.Legend className="text-xl md:text-2xl font-bold tracking-tight text-white select-none">
                        Add New Prompt
                    </Fieldset.Legend>
                    <Description className="text-gray-400 text-xs mb-6 block">
                        Deploy highly optimized prompt parameters live into the global ecosystem grid.
                    </Description>

                    <FieldGroup className="flex flex-col gap-5">

                        {/* Prompt Title Input */}
                        <TextField
                            isRequired
                            name="title"
                            validate={(value) => value.length < 5 ? "Title must be at least 5 characters" : null}
                        >
                            <Label className="text-gray-300 text-xs font-semibold tracking-wide mb-1">Prompt Title</Label>
                            <Input
                                placeholder="Ultimate Cyberpunk Concept Generator"
                                className="bg-[#030712]/60 border border-[#1e293b]/80 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-all duration-200"
                            />
                            <FieldError className="text-red-400 text-xs mt-1 font-medium" />
                        </TextField>

                        {/* Prompt Description Input */}
                        <TextField
                            isRequired
                            name="description"
                            validate={(value) => value.length < 15 ? "Description must be at least 15 characters" : null}
                        >
                            <Label className="text-gray-300 text-xs font-semibold tracking-wide mb-1">Prompt Description</Label>
                            <TextArea
                                placeholder="Briefly describe what this engineering architecture solves or outputs..."
                                className="bg-[#030712]/60 border border-[#1e293b]/80 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-all duration-200 min-h-[80px]"
                            />
                            <FieldError className="text-red-400 text-xs mt-1 font-medium" />
                        </TextField>

                        {/* Prompt Content Input */}
                        <TextField
                            isRequired
                            name="content"
                            validate={(value) => value.length < 20 ? "Prompt operational instructions are too short" : null}
                        >
                            <Label className="text-gray-300 text-xs font-semibold tracking-wide mb-1">Prompt Content</Label>
                            <TextArea
                                placeholder="Act as a professional software engineer... [Paste exact prompt content here]"
                                className="bg-[#030712]/60 border border-[#1e293b]/80 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-all duration-200 min-h-[120px] font-mono text-cyan-400 placeholder:font-sans"
                            />
                            <FieldError className="text-red-400 text-xs mt-1 font-medium" />
                        </TextField>

                        {/* Two Column Grid layout for Selectors */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* Category Selection */}
                            <TextField isRequired name="category">
                                <Label className="text-gray-300 text-xs font-semibold tracking-wide mb-1">Category</Label>
                                <Input
                                    placeholder="e.g. Web Development, Copywriting"
                                    className="bg-[#030712]/60 border border-[#1e293b]/80 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-all duration-200"
                                />
                                <FieldError className="text-red-400 text-xs mt-1 font-medium" />
                            </TextField>

                            {/* AI Tool Selection */}
                            <TextField isRequired name="aiTool">
                                <Label className="text-gray-300 text-xs font-semibold tracking-wide mb-1">AI Tool</Label>
                                <Input
                                    placeholder="e.g. ChatGPT, Midjourney, Claude"
                                    className="bg-[#030712]/60 border border-[#1e293b]/80 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-all duration-200"
                                />
                                <FieldError className="text-red-400 text-xs mt-1 font-medium" />
                            </TextField>

                        </div>

                        {/* Tags Config Matrix */}
                        <TextField isRequired name="tags">
                            <Label className="text-gray-300 text-xs font-semibold tracking-wide mb-1">Tags (Comma Separated)</Label>
                            <Input
                                placeholder="react, tailwind, nextjs, framework"
                                className="bg-[#030712]/60 border border-[#1e293b]/80 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-all duration-200"
                            />
                            <Description className="text-gray-500 text-[10px] font-medium mt-1">Separate tags with commas</Description>
                            <FieldError className="text-red-400 text-xs mt-1 font-medium" />
                        </TextField>

                        {/* Image Upload Interface to ImgBB Matrix */}
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-gray-300 text-xs font-semibold tracking-wide">Thumbnail Image</Label>
                            <div className="relative w-full border border-[#1e293b]/80 bg-[#030712]/60 rounded-xl px-4 py-2.5 flex items-center justify-between gap-4">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                    disabled={isUploading}
                                />
                                <span className="text-gray-400 text-sm truncate max-w-[70%]">
                                    {imageUrl ? "Image Selected & Uploaded" : "Choose system thumbnail file..."}
                                </span>
                                <Button
                                    size="sm"
                                    className="bg-[#111827] text-cyan-400 border border-cyan-500/30 text-xs font-semibold rounded-lg pointer-events-none"
                                >
                                    {isUploading ? "Uploading..." : "Browse"}
                                </Button>
                            </div>

                        </div>

                        {/* Difficulty Level Selection */}
                        <RadioGroup defaultValue="beginner" name="difficulty" className="mt-1 flex flex-col gap-1.5">
                            <Label className="text-gray-300 text-xs font-semibold tracking-wide">Difficulty Level</Label>
                            <div className="flex flex-wrap gap-6 items-center w-full mt-1">
                                <Radio value="beginner" className="text-xs text-gray-300 font-medium">
                                    <div className="flex flex-row items-center gap-2 cursor-pointer">
                                        <Radio.Control><Radio.Indicator className="bg-cyan-500 rounded-full" /></Radio.Control>
                                        <Radio.Content><Label className="text-gray-300 text-xs font-medium cursor-pointer">Beginner</Label></Radio.Content>
                                    </div>
                                </Radio>
                                <Radio value="intermediate" className="text-xs text-gray-300 font-medium">
                                    <div className="flex flex-row items-center gap-2 cursor-pointer">
                                        <Radio.Control><Radio.Indicator className="bg-cyan-500 rounded-full" /></Radio.Control>
                                        <Radio.Content><Label className="text-gray-300 text-xs font-medium cursor-pointer">Intermediate</Label></Radio.Content>
                                    </div>
                                </Radio>
                                <Radio value="pro" className="text-xs text-gray-300 font-medium">
                                    <div className="flex flex-row items-center gap-2 cursor-pointer">
                                        <Radio.Control><Radio.Indicator className="bg-cyan-500 rounded-full" /></Radio.Control>
                                        <Radio.Content><Label className="text-gray-300 text-xs font-medium cursor-pointer">Pro Tier</Label></Radio.Content>
                                    </div>
                                </Radio>
                            </div>
                        </RadioGroup>

                        {/* Visibility Mode Switch Option */}
                        <RadioGroup defaultValue="public" name="visibility" className="mt-1 flex flex-col gap-1.5">
                            <Label className="text-gray-300 text-xs font-semibold tracking-wide">Visibility </Label>
                            <div className="flex gap-6 items-center w-full mt-1">
                                <Radio value="free" className="text-xs text-gray-300 font-medium">
                                    <div className="flex flex-row items-center gap-2 cursor-pointer">
                                        <Radio.Control><Radio.Indicator className="bg-cyan-500 rounded-full" /></Radio.Control>
                                        <Radio.Content><Label className="text-gray-300 text-xs font-medium cursor-pointer">Free</Label></Radio.Content>
                                    </div>
                                </Radio>
                                <Radio value="premium" className="text-xs text-gray-300 font-medium">
                                    <div className="flex flex-row items-center gap-2 cursor-pointer">
                                        <Radio.Control><Radio.Indicator className="bg-cyan-500 rounded-full" /></Radio.Control>
                                        <Radio.Content><Label className="text-gray-300 text-xs font-medium cursor-pointer">Premium</Label></Radio.Content>
                                    </div>
                                </Radio>
                            </div>
                        </RadioGroup>

                    </FieldGroup>

                    {/* Core Controls Actions System */}
                    <Fieldset.Actions className="flex items-center gap-4 mt-8 pt-4 border-t border-[#1e293b]/40">
                        <Button
                            type="submit"
                            disabled={isUploading}
                            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold text-sm h-11 rounded-xl shadow-lg shadow-cyan-500/10 hover:opacity-95 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 px-6"
                        >
                            <FloppyDisk className="w-4 h-4" />
                            {isUploading ? "Uploading Metadata..." : `${submitBtn}`}
                        </Button>
                        <Button
                            type="reset"
                            variant="secondary"
                            className="bg-[#111827] hover:bg-[#1e293b] border border-[#1e293b] text-gray-400 font-semibold text-sm h-11 rounded-xl transition-all px-6 cursor-pointer"
                        >
                            Reset Matrix
                        </Button>
                    </Fieldset.Actions>
                </Fieldset>
            </Form>
        </div>
    );
}