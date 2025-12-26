import UserHeader from "./UserHeader";
import Link from "next/link";

export default function ManagerHeader({ user }) {
    return (
        <>
            <UserHeader user={user} />
            <div className="px-4 py-2 bg-gray-50 border-b">
                <Link href="/manager-panel">Manager Panel</Link>
            </div>
        </>
    );
}
