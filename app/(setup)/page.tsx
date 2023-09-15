import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initialProfile";
import { FC } from "react";
import { redirect } from "next/navigation";
import IntialModal from "@/components/modals/initial-modal";

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

  return <IntialModal />;
};

export default SetupPage;
