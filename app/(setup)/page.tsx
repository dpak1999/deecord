import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initialProfile";
import { FC } from "react";
import { redirect } from "next/navigation";

interface SetupPageProps {}

const SetupPage: FC<SetupPageProps> = async ({}) => {
  const profile = await initialProfile();
  const server = await db.server.findFirst({
    where: {
      Member: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <div>SetupPage</div>;
};

export default SetupPage;
