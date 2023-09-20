import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { FC } from "react";
import NavigationAction from "./navigation-action";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import NavigationItem from "./navigation-item";
import { ModeToggle } from "../mode-toggel";
import { UserButton } from "@clerk/nextjs";

interface NavigationSidebarProps {}

const NavigationSidebar: FC<NavigationSidebarProps> = async ({}) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findMany({
    where: {
      Member: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full py-3 dark:bg-[#1e1f22]">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="w-full flex-1">
        {server.map((s) => (
          <div key={s.id} className="mb-4">
            <NavigationItem id={s.id} imageUrl={s.imageUrl} name={s.name} />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{ elements: { avatarBox: "h-[48px] w-[48px]" } }}
        />
      </div>
    </div>
  );
};

export default NavigationSidebar;
