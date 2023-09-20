import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { FC } from "react";
import NavigationAction from "./navigation-action";

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
    </div>
  );
};

export default NavigationSidebar;
