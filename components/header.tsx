import UserMenu from "./user-menu";
import { getSession } from "@/lib/session";

export default async function Header() {
  const session = await getSession();

  return (
    <header>
      <div className="container">
        <UserMenu session={session} />
      </div>
    </header>
  );
}
