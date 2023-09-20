import { Member, Profile, Server } from "@prisma/client";

export type ServerWithMemberAndProfile = Server & {
  Member: (Member & { profile: Profile })[];
};
