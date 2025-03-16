"use client"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

// UI Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// Icons
import { 
  Search, 
  Home, 
  MessageSquare,
  UserCircle, 
  Menu, 
  LogOut
} from "lucide-react"

export function NavBar() {
  const stateuser = useSelector((state: any) => state.auth.user)
  const [user, setUser] = useState<any>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setUser(stateuser)
  }, [stateuser])

  // Only include pages that actually exist in the project
  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Questions", href: "/questions", icon: MessageSquare },
  ]

  const isActive = (path: string) => {
    return pathname === path || (path !== "/" && pathname?.startsWith(path))
  }

  return (
    <div className="sticky top-0 z-40 w-full">
      {/* Main Horizontal Navbar */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 shadow-md">
        <div className="container mx-auto px-6">
          <div className="flex h-20 items-center justify-between">
            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="mr-2 text-white hover:bg-white/10">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-72 border-r-purple-200">
                  <div className="flex flex-col h-full">
                    <div className="p-6 border-b border-purple-100/20 bg-gradient-to-r from-indigo-600 to-purple-600">
                      <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                        <div className="h-10 w-10 rounded-md overflow-hidden mr-3 border border-white/20">
                          <Image 
                            src="https://avatars.githubusercontent.com/u/184518998?s=200&v=4" 
                            alt="Coders Forum Logo" 
                            width={40} 
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="text-xl font-bold text-white">Coders Forum</span>
                      </Link>
                    </div>
                    <nav className="flex-1 overflow-auto py-4">
                      {navItems.map((item) => {
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center px-6 py-4 text-base ${
                              isActive(item.href)
                                ? "bg-purple-50 text-purple-700 font-medium"
                                : "text-slate-700 hover:bg-purple-50/50"
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Icon className="h-5 w-5 mr-4" />
                            {item.name}
                          </Link>
                        )
                      })}
                    </nav>
                    {user && (
                      <div className="border-t border-slate-200 p-6">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3 border-2 border-purple-200">
                            <AvatarImage src={user.avatar || "/default-avatar.png"} alt={user.username} />
                            <AvatarFallback className="bg-purple-100 text-purple-700">{user.username?.charAt(0) || 'U'}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-base font-medium truncate">{user.username}</p>
                            <p className="text-sm text-slate-500 truncate">
                              {user.email || "user@example.com"}
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full mt-4 border-slate-300 text-slate-700 hover:bg-slate-100"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Log out
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="h-10 w-10 rounded-md overflow-hidden mr-3 border border-white/20">
                  <Image 
                    src="https://avatars.githubusercontent.com/u/184518998?s=200&v=4" 
                    alt="Coders Forum Logo" 
                    width={40} 
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-xl font-bold text-white hidden md:inline-block">Coders Forum</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-5 py-2 text-sm rounded-md transition-colors ${
                      isActive(item.href)
                        ? "bg-white/10 text-white font-medium"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            {/* Search and User Profile */}
            <div className="flex items-center space-x-6">
              <div className="relative hidden md:block w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search questions..."
                  className="w-full h-10 pl-10 rounded-full bg-white/10 border-white/20 text-white placeholder:text-purple-200 focus:bg-white/20 focus:border-white/30"
                />
              </div>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 rounded-full hover:bg-white/10 p-1">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8 border-2 border-white/20">
                          <AvatarImage src={user.avatar || "/default-avatar.png"} alt={user.username} />
                          <AvatarFallback className="bg-purple-100 text-purple-700">{user.username?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-white hidden lg:inline-block">{user.username}</span>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 mt-1">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user.username}</p>
                        <p className="text-xs text-slate-500 truncate">
                          {user.email || "user@example.com"}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <UserCircle className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600 cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex space-x-3">
                  <Button asChild variant="ghost" className="text-white hover:bg-white/10 border border-white/20">
                    <Link href="/register">Sign Up</Link>
                  </Button>
                  <Button asChild variant="default" className="bg-white text-purple-700 hover:bg-white/90">
                    <Link href="/login">Login</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Submenu for mobile (shown below the main navbar) */}
      <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search questions..."
            className="w-full h-10 pl-10 rounded-md border-slate-200 dark:border-slate-700"
          />
        </div>
      </div>
    </div>
  )
}
