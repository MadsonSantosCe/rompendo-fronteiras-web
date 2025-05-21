import { Bell, Menu, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSignOut } from "@/hooks/auth/useAuthentication";
import { FullPageLoader } from "./FullPageLoader";
import { UseAuth } from "@/contexts/auth/authProvider";

export default function Header() {
  const { mutateAsync: signOut, isPending } = useSignOut();
  const { user } = UseAuth();

  const handleSignOut = async() => {
    await signOut();
  };

  return isPending ? (
    <FullPageLoader />
  ) : (
    <header className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-900 shadow-sm dark:shadow-md">
      <div className="flex items-center gap-4">
        <Menu className="w-5 h-5 cursor-pointer text-gray-700 dark:text-gray-200" />
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          <span className="text-blue-500">IMERF </span>Online
        </h1>
      </div>

      <div className="flex-1 mx-6 max-w-md hidden sm:block">
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
          <svg
            className="w-5 h-5 text-gray-400 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search"
            className="ml-2 bg-transparent outline-none w-full text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative cursor-pointer hidden sm:block">
          <Bell className="w-5 h-5 text-blue-500 dark:text-blue-400" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            6
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer ml-2 mr-15">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src="https://github.com/MadsonSantosCe.png"
                alt="Madson Santos"
              />
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
            <div className="text-left hidden sm:block">
              <div className="font-medium text-sm text-gray-900 dark:text-white">
                {user?.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Admin
              </div>
            </div>
            <div className="w-6 h-6 ml-2 flex items-center justify-center rounded-full border-1 border-gray-300 dark:border-gray-700 sm:ml-0">
              <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
