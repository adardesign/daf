'use client'

import { useEffect, useState } from 'react'
import { getTodaysDaf, DafYomiInfo } from '@/lib/daf'
import { Card, CardContent } from '@/components/ui/card'

export function DafViewer() {
  const [dafInfo, setDafInfo] = useState<DafYomiInfo | null>(null)

  useEffect(() => {
    setDafInfo(getTodaysDaf())
  }, [])

  if (!dafInfo) {
    return <div className="text-center p-10">טוען דף יומי...</div>
  }

  // Parse Hebrew name to separate Tractate and Daf if possible, or just use it
  // dafInfo.hebrewName is typically "מסכת דף" (e.g. "ברכות ב")
  const parts = dafInfo.hebrewName.split(' ')
  const hebrewMasechta = parts.slice(0, parts.length - 1).join(' ')
  const hebrewDaf = parts[parts.length - 1]

  return (
    <div className="flex flex-col gap-6">
        {/* Banner / Current Tractate Info */}
        <div className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white shadow-lg">
             <div className="flex items-center justify-between">
                 <div className="text-right">
                     <p className="text-sm font-medium opacity-80 mb-1">דף</p>
                     <h2 className="text-6xl font-extrabold tracking-tighter">{dafInfo.daf}</h2>
                 </div>
                 <div className="text-left">
                     <p className="text-sm font-medium opacity-80 mb-1">מסכת</p>
                     <h2 className="text-4xl font-extrabold tracking-tight">{hebrewMasechta || dafInfo.hebrewName}</h2>
                 </div>
             </div>
        </div>

        {/* Viewer */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
             <Card className="overflow-hidden shadow-sm border-0">
                 <CardContent className="p-0 aspect-[2/3] relative bg-white dark:bg-zinc-900 border rounded-t-lg">
                     <img 
                        src={`https://www.dafyomi.org/edafnew/${dafInfo.masechta}/${dafInfo.daf}a.jpg`} 
                        alt={`${dafInfo.englishName} ${dafInfo.daf}a`}
                        className="w-full h-full object-contain"
                     />
                 </CardContent>
                 <div className="p-3 text-center text-sm font-medium border-x border-b rounded-b-lg bg-background">עמוד א</div>
             </Card>
             <Card className="overflow-hidden shadow-sm border-0">
                 <CardContent className="p-0 aspect-[2/3] relative bg-white dark:bg-zinc-900 border rounded-t-lg">
                     <img 
                        src={`https://www.dafyomi.org/edafnew/${dafInfo.masechta}/${dafInfo.daf}b.jpg`} 
                        alt={`${dafInfo.englishName} ${dafInfo.daf}b`}
                        className="w-full h-full object-contain"
                     />
                 </CardContent>
                 <div className="p-3 text-center text-sm font-medium border-x border-b rounded-b-lg bg-background">עמוד ב</div>
             </Card>
        </div>
    </div>
  )
}
