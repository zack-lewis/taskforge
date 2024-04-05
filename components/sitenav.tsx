import Link from "next/link";

export default function SiteNav() {
  return (
    <nav className="flex flex-col text-xl justify-center px-4">
      <Link href="/">Dashboard</Link>
      <Link href="/projects">Projects</Link>
      <Link href="/tasks">Tasks</Link>
      <hr />
      <Link href="/admin">Admin</Link>
      <Link href="/admin/users">Users</Link>
      <Link href="/admin/teams">Teams</Link>
    </nav>
  );
}
