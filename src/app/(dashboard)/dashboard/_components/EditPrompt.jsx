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
    Select,
    ListBox,
} from "@heroui/react";
import toast from "react-hot-toast";
import { editPrompt } from "@/lib/actions/prompt";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function EditPrompt({ submitBtn, promptId, promptData }) {
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState(promptData?.thumbnail || "");

    const session = useSession();
    const user = session?.data?.user;

    
    const renderTagsValue = () => {
        if (!promptData?.tags) return "";
        if (Array.isArray(promptData.tags)) {
            return promptData.tags.join(", ");
        }
        
        if (typeof promptData.tags === "object") {
            return Object.values(promptData.tags).join(", ");
        }
        return String(promptData.tags);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
        if (!allowedTypes.includes(file.type)) {
            toast.error("Only PNG, JPG, and JPEG images are allowed!");
            e.target.value = "";
            return;
        }

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

    const handleEditPrompt = async (e) => {
        e.preventDefault();

        if (!imageUrl) {
            toast.error("Please upload a thumbnail image before submitting!");
            return;
        }

        const formData = new FormData(e.target);
        const updatedData = Object.fromEntries(formData.entries());
        updatedData.thumbnail = imageUrl;

        try {
            const data = await editPrompt(promptId, updatedData);
            toast.success(data.message || "Prompt updated successfully!");

            if (user?.role) {
                router.push(`/dashboard/${user?.role}/myprompt`);
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || error.message || "Update failed!");
        }
    };

    return (
        <div className="bg-[#030712] text-white min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

            <Form
                className="w-full max-w-2xl bg-[#111827]/40 border border-[#1e293b]/60 shadow-2xl rounded-3xl p-6 sm:p-8 backdrop-blur-md z-10"
                onSubmit={handleEditPrompt}
            >
                <Fieldset>
                    <Fieldset.Legend className="text-xl md:text-2xl font-bold tracking-tight text-white select-none">
                        Edit Prompt
                    </Fieldset.Legend>
                    <Description className="text-gray-400 text-xs mb-6 block">
                        Deploy highly optimized prompt parameters live into the global ecosystem grid.
                    </Description>

                    <FieldGroup className="flex flex-col gap-5">
                        <TextField
                            isRequired
                            name="title"
                            defaultValue={promptData?.title || ""}
                            validate={(value) => value.length < 5 ? "Title must be at least 5 characters" : null}
                        >
                            <Label className="text-gray-300 text-xs font-semibold tracking-wide mb-1">Prompt Title</Label>
                            <Input
                                placeholder="Ultimate Cyberpunk Concept Generator"
                                className="bg-[#030712]/60 border border-[#1e293b]/80 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-all duration-200"
                            />
                            <FieldError className="text-red-400 text-xs mt-1 font-medium" />
                        </TextField>

                        <TextField
                            isRequired
                            name="description"
                            defaultValue={promptData?.description || ""}
                            validate={(value) => value.length < 15 ? "Description must be at least 15 characters" : null}
                        >
                            <Label className="text-gray-300 text-xs font-semibold tracking-wide mb-1">Prompt Description</Label>
                            <TextArea
                                placeholder="Briefly describe what this engineering architecture solves or outputs..."
                                className="bg-[#030712]/60 border border-[#1e293b]/80 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-all duration-200 min-h-[80px]"
                            />
                            <FieldError className="text-red-400 text-xs mt-1 font-medium" />
                        </TextField>

                        <TextField
                            isRequired
                            name="content"
                            defaultValue={promptData?.content || ""}
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
                            <Select defaultValue={promptData?.category || ""} name="category" className="w-full" placeholder="Select a category">
                                <Label className="text-gray-300 text-xs font-semibold tracking-wide mb-1 block">Category</Label>
                                <Select.Trigger className="w-full flex items-center justify-between bg-[#030712]/60 border border-[#1e293b]/80 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan-500 transition-all duration-200 min-h-[42px] h-[42px]">
                                    <Select.Value className="text-white text-sm capitalize" />
                                    <Select.Indicator className="text-gray-400" />
                                </Select.Trigger>
                                <Select.Popover className="bg-[#111827] border border-[#1e293b]/80 text-white rounded-xl overflow-hidden shadow-xl">
                                    <ListBox className="p-1 flex flex-col gap-0.5">
                                        <ListBox.Item id="development" textValue="Development" className="text-white text-sm px-3 py-2 rounded-lg cursor-pointer capitalize data-[hover=true]:bg-cyan-500/20 data-[selected=true]:bg-gradient-to-r data-[selected=true]:from-cyan-500 data-[selected=true]:to-purple-600 outline-none">
                                            development
                                        </ListBox.Item>
                                        <ListBox.Item id="marketing" textValue="Marketing" className="text-white text-sm px-3 py-2 rounded-lg cursor-pointer capitalize data-[hover=true]:bg-cyan-500/20 data-[selected=true]:bg-gradient-to-r data-[selected=true]:from-cyan-500 data-[selected=true]:to-purple-600 outline-none">
                                            marketing
                                        </ListBox.Item>
                                        <ListBox.Item id="writing" textValue="Writing" className="text-white text-sm px-3 py-2 rounded-lg cursor-pointer capitalize data-[hover=true]:bg-cyan-500/20 data-[selected=true]:bg-gradient-to-r data-[selected=true]:from-cyan-500 data-[selected=true]:to-purple-600 outline-none">
                                            writing
                                        </ListBox.Item>
                                        <ListBox.Item id="design" textValue="Design" className="text-white text-sm px-3 py-2 rounded-lg cursor-pointer capitalize data-[hover=true]:bg-cyan-500/20 data-[selected=true]:bg-gradient-to-r data-[selected=true]:from-cyan-500 data-[selected=true]:to-purple-600 outline-none">
                                            design
                                        </ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                            {/* AI Tool Selection */}
                            <Select name="aiTool" className="w-full" placeholder="Select an AI Tool">
                                <Label className="text-gray-300 text-xs font-semibold tracking-wide mb-1 block">AI Tool</Label>
                                <Select.Trigger className="w-full flex items-center justify-between bg-[#030712]/60 border border-[#1e293b]/80 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan-500 transition-all duration-200 min-h-[42px] h-[42px]">
                                    <Select.Value className="text-white text-sm capitalize" />
                                    <Select.Indicator className="text-gray-400" />
                                </Select.Trigger>
                                <Select.Popover className="bg-[#111827] border border-[#1e293b]/80 text-white rounded-xl overflow-hidden shadow-xl">
                                    <ListBox className="p-1 flex flex-col gap-0.5">
                                        <ListBox.Item id="chatgpt" textValue="ChatGPT" className="text-white text-sm px-3 py-2 rounded-lg cursor-pointer capitalize data-[hover=true]:bg-cyan-500/20 data-[selected=true]:bg-gradient-to-r data-[selected=true]:from-cyan-500 data-[selected=true]:to-purple-600 outline-none">
                                            chatgpt
                                        </ListBox.Item>
                                        <ListBox.Item id="gemini" textValue="Gemini" className="text-white text-sm px-3 py-2 rounded-lg cursor-pointer capitalize data-[hover=true]:bg-cyan-500/20 data-[selected=true]:bg-gradient-to-r data-[selected=true]:from-cyan-500 data-[selected=true]:to-purple-600 outline-none">
                                            gemini
                                        </ListBox.Item>
                                        <ListBox.Item id="midjourney" textValue="Midjourney" className="text-white text-sm px-3 py-2 rounded-lg cursor-pointer capitalize data-[hover=true]:bg-cyan-500/20 data-[selected=true]:bg-gradient-to-r data-[selected=true]:from-cyan-500 data-[selected=true]:to-purple-600 outline-none">
                                            midjourney
                                        </ListBox.Item>
                                        <ListBox.Item id="claude" textValue="Claude" className="text-white text-sm px-3 py-2 rounded-lg cursor-pointer capitalize data-[hover=true]:bg-cyan-500/20 data-[selected=true]:bg-gradient-to-r data-[selected=true]:from-cyan-500 data-[selected=true]:to-purple-600 outline-none">
                                            claude
                                        </ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                        </div>

                       
                        <TextField isRequired name="tags" defaultValue={renderTagsValue()}>
                            <Label className="text-gray-300 text-xs font-semibold tracking-wide mb-1">Tags (Comma Separated)</Label>
                            <Input
                                placeholder="react, tailwind, nextjs, framework"
                                className="bg-[#030712]/60 border border-[#1e293b]/80 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-all duration-200"
                            />
                            <Description className="text-gray-500 text-[10px] font-medium mt-1">Separate tags with commas</Description>
                            <FieldError className="text-red-400 text-xs mt-1 font-medium" />
                        </TextField>

                        <div className="flex flex-col gap-1.5">
                            <Label className="text-gray-300 text-xs font-semibold tracking-wide">Thumbnail Image</Label>
                            <div className="relative w-full border border-[#1e293b]/80 bg-[#030712]/60 rounded-xl px-4 py-2.5 flex items-center justify-between gap-4">
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg"
                                    onChange={handleImageUpload}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                    disabled={isUploading}
                                />
                                <span className="text-gray-400 text-sm truncate max-w-[70%]">
                                    {imageUrl ? "Image Ready" : "Choose system thumbnail file..."}
                                </span>
                                <Button
                                    size="sm"
                                    className="bg-[#111827] text-cyan-400 border border-cyan-500/30 text-xs font-semibold rounded-lg pointer-events-none"
                                >
                                    {isUploading ? "Uploading..." : "Browse"}
                                </Button>
                            </div>
                        </div>

                        <RadioGroup defaultValue={promptData?.difficulty || "beginner"} name="difficulty" className="mt-1 flex flex-col gap-1.5">
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

                        <RadioGroup defaultValue={promptData?.visibility || "public"} name="visibility" className="mt-1 flex flex-col gap-1.5">
                            <Label className="text-gray-300 text-xs font-semibold tracking-wide">Visibility</Label>
                            <div className="flex gap-6 items-center w-full mt-1">
                                <Radio value="free" className="text-xs text-gray-300 font-medium">
                                    <div className="flex flex-row items-center gap-2 cursor-pointer">
                                        <Radio.Control><Radio.Indicator className="bg-cyan-500 rounded-full" /></Radio.Control>
                                        <Radio.Content><Label className="text-gray-300 text-xs font-medium cursor-pointer">Public </Label></Radio.Content>
                                    </div>
                                </Radio>
                                <Radio value="premium" className=" text-xs text-gray-300 font-medium">
                                    <div className="flex flex-row items-center gap-2 cursor-pointer">
                                        <Radio.Control><Radio.Indicator className="bg-cyan-500 rounded-full" /></Radio.Control>
                                        <Radio.Content><Label className="text-gray-300 text-xs font-medium cursor-pointer">Premium </Label></Radio.Content>
                                    </div>
                                </Radio>

                            </div>
                        </RadioGroup>
                    </FieldGroup>

                    <Fieldset.Actions className="flex items-center gap-4 mt-8 pt-4 border-t border-t-[#1e293b]/40">
                        <Button
                            type="submit"
                            disabled={isUploading}
                            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold text-sm h-11 rounded-xl shadow-lg shadow-cyan-500/10 hover:opacity-95 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 px-6"
                        >
                            <FloppyDisk className="w-4 h-4" />
                            {isUploading ? "Uploading Metadata..." : `${submitBtn}`}
                        </Button>

                    </Fieldset.Actions>
                </Fieldset>
            </Form>
        </div>
    );
}