"use client";

import { Avatar, Button, AlertDialog } from "@heroui/react";
import { Trash2, Calendar, ShieldCheck } from "lucide-react";

export default function UserManagementTable({ users = [], onHandleChangeRole, onHandleDeleteUser }) {


    return (
        <div className="w-full bg-[#111827]/20 border border-[#1e293b]/50 rounded-3xl backdrop-blur-md p-6 shadow-2xl relative overflow-hidden">

            {/* Table Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                        <ShieldCheck className="text-cyan-400 size-5" />
                        User Access Registry
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">Manage global accounts permissions and active subscription ranks.</p>
                </div>
            </div>

            {/* Clean Custom Table Wrapper to prevent removeWrapper & isBordered errors */}
            <div className="w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <table className="w-full min-w-[900px] border-collapse text-left">
                    <thead>
                        <tr className="bg-[#030712]/80 border-b border-[#1e293b]/40">
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4">Profile Details</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4">Email Address</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4">Subscription</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4">Role Level</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4">Registered Date</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-b border-[#1e293b]/20 hover:bg-[#111827]/30 transition-colors group">

                                {/* Column 1: Profile */}
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar
                                            src={user.image}
                                            name={user.name ? user.name.charAt(0).toUpperCase() : "U"}
                                            className="w-9 h-9 border border-cyan-500/20 text-cyan-400 font-bold bg-[#111827] text-xs"
                                        />
                                        <span className="font-semibold text-sm text-gray-200 tracking-wide">
                                            {user.name}
                                        </span>
                                    </div>
                                </td>

                                {/* Column 2: Email */}
                                <td className="py-4 px-4">
                                    <span className="text-sm text-gray-400 font-medium">{user.email}</span>
                                </td>

                                {/* Column 3: Subscription */}
                                <td className="py-4 px-4">
                                    <span className={`inline-flex items-center justify-center px-3 py-1 text-[10px] font-bold tracking-widest rounded-full border shadow-sm ${user.subscription === "PREMIUM"
                                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                                        : "bg-amber-500/10 border-amber-500/30 text-amber-500"
                                        }`}>
                                        {user.subscription}
                                    </span>
                                </td>

                                {/* Column 4: Select Role Dropdown (Strict Role Full-String Fix) */}

                                <td className="py-4 px-4 w-44">
                                    <div className="relative inline-block w-[140px]">
                                        <select
                                            aria-label="User Management Role Selection"
                                            value={user.role || "user"}
                                            onChange={(e) => {
                                                const selectedRole = e.target.value;
                                                if (selectedRole && onHandleChangeRole) {
                                                    onHandleChangeRole(user.id, selectedRole);
                                                }
                                            }}
                                            className="w-full bg-[#030712]/60 border border-[#1e293b]/80 hover:border-cyan-500/50 rounded-xl h-9 text-gray-200 text-xs font-medium px-3 appearance-none cursor-pointer focus:outline-none focus:border-cyan-500/50 transition-colors duration-200"
                                        >
                                            <option value="user" className="bg-[#030712] text-gray-300">User</option>
                                            <option value="creator" className="bg-[#030712] text-gray-300">Creator</option>
                                            <option value="admin" className="bg-[#030712] text-gray-300">Admin</option>
                                        </select>

                                        {/* কাস্টম ড্রপডাউন ডাউন-অ্যারো আইকন */}
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                </td>


                                {/* Column 5: Registered Date */}
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                                        <Calendar className="size-3.5 text-gray-500" />
                                        {user.registeredDate}
                                    </div>
                                </td>

                                {/* Column 6: Actions */}
                                <td className="py-4 px-4 text-center">


                                    <AlertDialog>
                                        <Button
                                            isIconOnly
                                            size="sm"
                                            variant="light"
                                            className="text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl"
                                            aria-label="Delete User Account"
                                        >
                                            <Trash2 className="size-4" />
                                        </Button>
                                        <AlertDialog.Backdrop>
                                            <AlertDialog.Container>
                                                <AlertDialog.Dialog className="sm:max-w-[400px]">
                                                    <AlertDialog.CloseTrigger />
                                                    <AlertDialog.Header>
                                                        <AlertDialog.Icon status="danger" />
                                                        <AlertDialog.Heading>Delete User permanently?</AlertDialog.Heading>
                                                    </AlertDialog.Header>
                                                    <AlertDialog.Body>
                                                        <p>
                                                            This will permanently delete <strong>{user?.name}</strong> and all of its
                                                            data. This action cannot be undone.
                                                        </p>
                                                    </AlertDialog.Body>
                                                    <AlertDialog.Footer>
                                                        <Button slot="close" variant="tertiary">
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            onClick={() => onHandleDeleteUser(user?.id)}
                                                            slot="close" variant="danger">
                                                            Delete User
                                                        </Button>
                                                    </AlertDialog.Footer>
                                                </AlertDialog.Dialog>
                                            </AlertDialog.Container>
                                        </AlertDialog.Backdrop>
                                    </AlertDialog>

                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}