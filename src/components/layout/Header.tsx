import Link from "next/link"
import { Flame, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeSwitcher } from "@/components/theme-switcher"

export function Header() {
  const isLoggedIn = true // Mock state
  const streakCount = 0

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-xl mr-4">
          <div className="bg-primary text-primary-foreground p-1 rounded">
             <BookOpen className="h-5 w-5" />
          </div>
          <span className="text-primary">לימוד יומי</span>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
             {/* Left side of header (RTL end) */}
             <div className="flex items-center gap-4">
                 <Badge variant="secondary" className="gap-1 px-3 py-1 text-base">
                    <Flame className="h-4 w-4 text-orange-500 fill-orange-500" />
                    <span>{streakCount}</span>
                 </Badge>

                 <ThemeSwitcher />

                 {isLoggedIn ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/avatars/01.png" alt="@user" />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">User</p>
                            <p className="text-xs leading-none text-muted-foreground">
                              user@example.com
                            </p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Log out</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                 ) : (
                     <Button variant="ghost" asChild>
                        <Link href="/login">Sign In</Link>
                     </Button>
                 )}
             </div>
        </div>
      </div>
    </header>
  )
}
