import UserMenu from "./user-menu";
import { getSession } from "@/lib/session";

export default async function Header() {
  const session = await getSession();

  return (
    <header>
      <div className="container mx-auto py-2">
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full lg:w-auto">
            <UserMenu session={session} />
          </div>
        </div>
      </div>
    </header>
  );
}
