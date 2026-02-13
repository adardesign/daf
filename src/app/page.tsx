import { Header } from "@/components/layout/Header"
import { ProgramTabs } from "@/components/layout/ProgramTabs"
import { Sidebar } from "@/components/layout/Sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, ChevronLeft, ChevronRight, Video } from "lucide-react"
import { DafViewer } from "@/components/DafViewer"
import { HebrewDateDisplay } from "@/components/HebrewDateDisplay"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <div className="flex flex-1 flex-col">
          <ProgramTabs />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/20">
            {/* Main Content Header */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                     <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                     </div>
                     <div className="text-right">
                         <h1 className="text-3xl font-bold tracking-tight">דף היומי</h1>
                         <HebrewDateDisplay />
                     </div>
                </div>
            </div>

            <DafViewer />

            {/* Action Button */}
            <div className="sticky bottom-6 z-30 mx-auto w-full max-w-2xl">
                <Button size="lg" className="w-full h-12 gap-2 bg-green-600 hover:bg-green-700 text-white shadow-xl text-lg font-bold rounded-full">
                    <CheckCircle2 className="h-5 w-5" />
                    סימנתי כנלמד
                </Button>
            </div>
            
            {/* Video Section Placeholder */}
             <div className="mt-8 mb-20">
                <h3 className="text-xl font-bold mb-4">שיעורים ומקורות</h3>
                <Card className="overflow-hidden border-0 shadow-sm bg-blue-50/50 dark:bg-blue-950/10">
                    <CardContent className="p-4 flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-sm">
                                <Video className="h-5 w-5" />
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-sm">שיעור הרב שטיינמן</p>
                                <p className="text-xs text-muted-foreground">וידאו מלא</p>
                            </div>
                         </div>
                         <Button variant="ghost" size="icon" className="text-muted-foreground">
                             <ChevronLeft className="h-4 w-4" />
                         </Button>
                    </CardContent>
                </Card>
            </div>

          </main>
        </div>
        <Sidebar />
      </div>
    </div>
  )
}
