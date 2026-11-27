"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Dashboard", icon: "◈" },
  { href: "/new", label: "New Project", icon: "✦" },
  { href: "/settings", label: "Settings & API keys", icon: "⚙" },
];

export function Nav() {
  const path = usePathname();
  return (
    <aside className="sidebar">
      <Link href="/" className="brand">
        <div className="brand-mark" />
        <div>
          <b>Neon Shadow</b>
          <span>Studio</span>
        </div>
      </Link>
      <nav className="nav stack" style={{ gap: 4 }}>
        {links.map((l) => {
          const active = l.href === "/" ? path === "/" || path.startsWith("/projects") : path.startsWith(l.href);
          return (
            <Link key={l.href} href={l.href} className={active ? "active" : ""}>
              <span style={{ width: 16, textAlign: "center" }}>{l.icon}</span>
              {l.label}
            </Link>
          );
        })}
      </nav>
      <div className="foot">Story → Script → Scenes → Images → Animation → Voice → Sound → Final video</div>
    </aside>
  );
}
