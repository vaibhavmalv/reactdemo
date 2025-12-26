import UserHeader from "./UserHeader";
import Link from "next/link";

export default function AdminHeader({ user }) {
    return (
        <>
            <UserHeader user={user} />
        </>
    );
}
