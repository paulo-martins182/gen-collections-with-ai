import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Calendar,
  Home,
  Images,
  Inbox,
  Megaphone,
  Search,
  Settings,
  Wallet2,
  WandSparkles,
} from "lucide-react";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthContext } from "../provider";
import ProfileAvatar from "./ProfileAvatar";

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "AI Tools",
    url: "/ai-tools",
    icon: WandSparkles,
  },
  {
    title: "My Collections",
    url: "#",
    icon: Images,
  },
  {
    title: "Upgrade",
    url: "#",
    icon: Wallet2,
  },
  {
    title: "Profile",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { user } = useAuthContext();
  const path = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-4">
          <Image
            src={"/logo.svg"}
            alt="logo"
            width={100}
            height={100}
            className="w-full h-full"
          />
          <h2 className="text-sm text-gray-400 text-center">Build Awesome</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="mt-5 text-center pl-3">
              {items.map((item, index) => (
                // <SidebarMenuItem key={item.title} className='p-2'>
                //     <SidebarMenuButton asChild className=''>
                <a
                  href={item.url}
                  key={index}
                  className={`p-2 text-lg flex gap-2 items-center
                                 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg
                                 ${
                                   path == item.url &&
                                   "bg-gray-100 dark:bg-zinc-800"
                                 }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </a>
                //     </SidebarMenuButton>
                // </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {!!user ? (
          <div className="flex justify-between items-center pt-2 px-4 w-full bg-zinc-700 rounded-lg">
            <h2>Profile</h2>
            <ProfileAvatar />
          </div>
        ) : (
          <Link href={"/login"} className="w-full mb-3">
            <Button className="w-full">Sign In </Button>
          </Link>
        )}
        <h2 className="p-2 text-gray-400 text-sm">Copyright @PauloMartin</h2>
      </SidebarFooter>
    </Sidebar>
  );
}
