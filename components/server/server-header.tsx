"use client";
import { ServerWithMemberAndProfile } from "@/types";
import { MemberRole } from "@prisma/client";
import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";

interface ServerHeaderProps {
  server: ServerWithMemberAndProfile;
  role?: MemberRole;
}

const ServerHeader: FC<ServerHeaderProps> = ({ role, server }) => {
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="w-full text-base font-semibold px-3 flex items-center h-12 border-neutral-200 border-b-2 dark:border-neutral-800 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
          {server.name}
          <ChevronDown className="h-5 w-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
        {isModerator && (
          <DropdownMenuItem className="text-indigo-600 dark:text-indigo-400 py-2 px-3 cursor-pointer text-sm">
            Invite People
            <UserPlus className="h-5 w-5 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem className="py-2 px-3 cursor-pointer text-sm">
            Server Settings
            <Settings className="h-5 w-5 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem className="py-2 px-3 cursor-pointer text-sm">
            Manage Members
            <Users className="h-5 w-5 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem className="py-2 px-3 cursor-pointer text-sm">
            Create Channel
            <PlusCircle className="h-5 w-5 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem className="py-2 px-3 cursor-pointer text-sm text-rose-500">
            Delete Server
            <Trash className="h-5 w-5 ml-auto" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem className="py-2 px-3 cursor-pointer text-sm text-rose-500">
            Leave Server
            <LogOut className="h-5 w-5 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;
