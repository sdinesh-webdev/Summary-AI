'use client'

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function NavLink({
    href,
    children,
    className,
}: {
    href: string;
    children: React.ReactNode;
    className?: string;
}) {
    const pathname = usePathname();
    const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
    return (
        <Link
            href={href}
            className={cn(
                "relative text-gray-500 font-semibold transition-all duration-300 ease-in-out hover:text-rose-600  after:bg-rose-600 after:transition-all after:duration-300 hover:after:w-full",
                className,
                isActive && 'text-rose-500'
            )}>
            {children}
        </Link>
    );
}