import { FileText } from "lucide-react";
import NavLink from "./nav-link";
import Link from "next/link";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function Header() {
    const isLoggedIn = false; // Replace with actual authentication logic
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/10 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] backdrop-saturate-150">
            <div className="container flex items-center gap-8 py-4 lg:px-8 px-2 mx-auto">
                <div className="flex-none">
                    <Link href='/' className="flex items-center gap-2">
                        <FileText className="h-8 w-8 lg:h-10 lg:w-10 text-gray-900 hover:rotate-12 transform transition-all duration-200" />
                        <span className="font-bold text-base lg:text-xl text-gray-900">
                            Sommaire
                        </span>
                    </Link>
                </div>
                
                <div className="flex-1 flex justify-center">
                    <div className="flex items-center gap-8">
                        <NavLink href='/#pricing'  className="text-gray-900">Pricing</NavLink>
                        <SignedIn>
                            <NavLink href='/dashboard'  className="text-gray-900">Your Summaries</NavLink>
                        </SignedIn> 
                    </div>
                </div>

                <div className="flex-none">
                    <SignedIn>
                        <div className="flex items-center">
                            <NavLink 
                                href="/upload" 
                                className="text-gray-900 mr-2 hover:text-gray-900 transition-colors"
                            >
                                Upload a PDF
                            </NavLink>
                            <div className="ml-2">
                                <UserButton 
                                    afterSignOutUrl="/"
                                    appearance={{
                                        elements: {
                                            avatarBox: "w-15 h-15 mt-2"
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </SignedIn>
                    <SignedOut>
                        <NavLink href='/sign-in' className="text-gray-900">SignIn</NavLink>
                    </SignedOut>                
                </div>
            </div>
        </nav>
    );
}