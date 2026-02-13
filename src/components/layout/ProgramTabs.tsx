import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { BookOpen, Scroll, Book, FileText, Layers } from "lucide-react"

const programs = [
  { id: "daf-yomi", name: "דף היומי", icon: BookOpen, color: "text-blue-600" },
  { id: "rambam", name: "רמב״ם יומי", icon: Scroll, color: "text-green-600" },
  { id: "chok", name: "חוק לישראל", icon: Book, color: "text-purple-600" },
  { id: "tanach", name: "תנ״ך יומי", icon: FileText, color: "text-teal-600" },
  { id: "mishnah", name: "משנה יומית", icon: Layers, color: "text-orange-600" },
]

export function ProgramTabs() {
  return (
    <div className="w-full border-b bg-background/95 backdrop-blur z-40 sticky top-14">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-full items-center gap-2 p-2 sm:justify-start lg:justify-center">
            {/* justify-center might be better if few items, but ScrollArea implies many */}
          {programs.map((program) => (
            <Button
              key={program.id}
              variant={program.id === "daf-yomi" ? "default" : "outline"}
              className={`flex items-center gap-2 rounded-full px-4 ${program.id === "daf-yomi" ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}`}
            >
              <program.icon className={`h-4 w-4 ${program.id === "daf-yomi" ? "text-white" : program.color}`} />
              <span>{program.name}</span>
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
