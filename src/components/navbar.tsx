"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import { Search, PlusCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export function Navbar() {
    const pathname = usePathname()
    const stateuser = useSelector((state: any) => state.auth.user)
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        setUser(stateuser)
    }, [stateuser])

    return (
        <nav className="sticky top-0 z-50 bg-black border-b border-slate-800/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Brand */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2" prefetch={false}>
                            <div className="h-8 w-8 rounded-full overflow-hidden border border-slate-700">
                                <Image 
                                    src="https://avatars.githubusercontent.com/u/184518998?s=200&v=4" 
                                    alt="QnA Logo" 
                                    width={32} 
                                    height={32}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <span className="text-xl font-bold text-slate-100">QnA</span>
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-6 ml-6">
                        <Link 
                            href="/" 
                            className={`text-sm font-medium transition-colors ${
                                pathname === "/" 
                                    ? "text-slate-100" 
                                    : "text-slate-400 hover:text-slate-300"
                            }`}
                        >
                            Home
                        </Link>
                        <Link 
                            href="/questions" 
                            className={`text-sm font-medium transition-colors ${
                                pathname.startsWith("/questions") && !pathname.includes("/new")
                                    ? "text-slate-100" 
                                    : "text-slate-400 hover:text-slate-300"
                            }`}
                        >
                            Questions
                        </Link>
                        {user && (
                            <Link 
                                href="/questions/new" 
                                className={`text-sm font-medium transition-colors flex items-center ${
                                    pathname === "/questions/new" 
                                        ? "text-slate-100" 
                                        : "text-slate-400 hover:text-slate-300"
                                }`}
                            >
                                <PlusCircle size={14} className="mr-1" />
                                Ask Question
                            </Link>
                        )}
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-md mx-4 hidden md:block">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="w-full pl-10 bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-slate-700 rounded-full"
                            />
                        </div>
                    </div>

                    {/* Auth Section */}
                    <div className="flex items-center">
                        {user ? (
                            <div className="flex items-center bg-slate-900 rounded-full p-1 border border-slate-800">
                                <Avatar className="cursor-pointer bg-slate-800 h-8 w-8">
                                    <AvatarImage src={user.avatar || "/default-avatar.png"} alt="Profile" />
                                    <AvatarFallback className="text-slate-300">
                                        {user.name?.charAt(0) || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="px-2 font-medium text-slate-300 text-sm">{user.username}</span>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Button 
                                    asChild 
                                    variant="ghost" 
                                    className="text-slate-300 hover:bg-slate-900 hover:text-slate-100"
                                >
                                    <Link href="/login" prefetch={false}>
                                        Sign In
                                    </Link>
                                </Button>
                                <Button 
                                    asChild 
                                    variant="outline" 
                                    className="bg-black border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-slate-100"
                                >
                                    <Link href="/register" prefetch={false}>
                                        Sign Up
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <Button 
                            variant="ghost" 
                            className="text-slate-300 hover:bg-slate-900/50"
                        >
                            <svg 
                                className="h-6 w-6" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M4 6h16M4 12h16M4 18h16" 
                                />
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    )
} 