import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame, BookOpen, Scroll, Book, FileText, Layers } from "lucide-react"

export function Sidebar() {
    return (
        <aside className="hidden w-[300px] flex-col gap-4 p-4 md:flex border-l">
            {/* Card A: General Streak */}
            <Card className="bg-orange-50/50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800 shadow-sm">
                <CardHeader className="items-center pb-2">
                    <div className="rounded-full bg-orange-100 p-3 dark:bg-orange-900 ring-1 ring-orange-200 dark:ring-orange-800">
                        <Flame className="h-8 w-8 text-orange-600 dark:text-orange-400 fill-orange-600 dark:fill-orange-400" />
                    </div>
                    <CardTitle className="text-xl font-bold text-center mt-2">רצף כללי</CardTitle>
                    <p className="text-sm text-muted-foreground text-center">כל תוכניות הלימוד</p>
                </CardHeader>
                <CardContent className="text-center">
                    <div className="rounded-lg bg-white/50 p-4 dark:bg-black/20 border border-orange-200 dark:border-orange-800 mb-4">
                        <p className="text-sm text-muted-foreground mb-1">רצף נוכחי</p>
                        <p className="text-4xl font-bold text-orange-600 dark:text-orange-400">0</p>
                        <p className="text-xs text-muted-foreground mt-1">ימים ברצף</p>
                    </div>
                     <div className="grid grid-cols-2 gap-2">
                        <div className="text-center p-2 bg-muted/50 rounded-md border border-border/50">
                             <p className="text-xs text-muted-foreground">סהכ ימים</p>
                             <p className="font-bold">0</p>
                        </div>
                         <div className="text-center p-2 bg-muted/50 rounded-md border border-border/50">
                             <p className="text-xs text-muted-foreground">רצף הכי ארוך</p>
                             <p className="font-bold">0</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Card B: Context-Aware Program Streak */}
            {/* Assuming Daf Yomi is selected by default */}
            <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-base font-medium">דף היומי</CardTitle>
                    <div className="bg-blue-100 dark:bg-blue-900 p-1.5 rounded-md">
                        <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-4 bg-white/50 rounded-lg dark:bg-black/20 border border-blue-200 dark:border-blue-800 mb-4">
                        <p className="text-xs text-muted-foreground mb-1">רצף נוכחי</p>
                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">0</p>
                    </div>
                     <div className="grid grid-cols-2 gap-2">
                        <div className="text-center p-2 bg-muted/50 rounded-md border border-border/50">
                             <p className="text-xs text-muted-foreground">סהכ</p>
                             <p className="font-bold">0</p>
                        </div>
                         <div className="text-center p-2 bg-muted/50 rounded-md border border-border/50">
                             <p className="text-xs text-muted-foreground">הכי ארוך</p>
                             <p className="font-bold">0</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            
            {/* Card C: All Programs Summary */}
            <Card className="shadow-sm">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">כל התוכניות</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-2">
                     <div className="flex items-center justify-between p-2 rounded-md bg-muted/30 hover:bg-muted/60 cursor-pointer transition-colors border border-transparent hover:border-border/50">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-100 dark:bg-blue-900/50 p-1.5 rounded-md">
                                <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="text-sm font-medium">דף היומי</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-orange-50 dark:bg-orange-950/30 px-2 py-0.5 rounded-full border border-orange-100 dark:border-orange-900">
                             <Flame className="h-3 w-3 text-orange-500 fill-orange-500" />
                             <span className="text-xs font-bold text-orange-600 dark:text-orange-400">0</span>
                        </div>
                     </div>
                      <div className="flex items-center justify-between p-2 rounded-md bg-muted/30 hover:bg-muted/60 cursor-pointer transition-colors border border-transparent hover:border-border/50">
                        <div className="flex items-center gap-3">
                            <div className="bg-green-100 dark:bg-green-900/50 p-1.5 rounded-md">
                                <Scroll className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>
                            <span className="text-sm font-medium">רמב״ם יומי</span>
                        </div>
                         <div className="flex items-center gap-1.5 bg-orange-50 dark:bg-orange-950/30 px-2 py-0.5 rounded-full border border-orange-100 dark:border-orange-900">
                             <Flame className="h-3 w-3 text-orange-500 fill-orange-500" />
                             <span className="text-xs font-bold text-orange-600 dark:text-orange-400">0</span>
                        </div>
                     </div>
                      <div className="flex items-center justify-between p-2 rounded-md bg-muted/30 hover:bg-muted/60 cursor-pointer transition-colors border border-transparent hover:border-border/50">
                        <div className="flex items-center gap-3">
                            <div className="bg-purple-100 dark:bg-purple-900/50 p-1.5 rounded-md">
                                <Book className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            <span className="text-sm font-medium">חוק לישראל</span>
                        </div>
                         <div className="flex items-center gap-1.5 bg-orange-50 dark:bg-orange-950/30 px-2 py-0.5 rounded-full border border-orange-100 dark:border-orange-900">
                             <Flame className="h-3 w-3 text-orange-500 fill-orange-500" />
                             <span className="text-xs font-bold text-orange-600 dark:text-orange-400">0</span>
                        </div>
                     </div>
                </CardContent>
            </Card>
        </aside>
    )
}
