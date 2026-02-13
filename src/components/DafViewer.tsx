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
    return <div className="p-10 text-center">טוען דף יומי...</div>
  }

  // Parse Hebrew name to separate Tractate and Daf if possible, or just use it
  // dafInfo.hebrewName is typically "מסכת דף" (e.g. "ברכות ב")

  const hebrewMasechta = dafInfo.hebrewName.split("דף")?.[0]?.trim() || dafInfo.hebrewName
  return (
    <div className="flex flex-col gap-6">
      {/* Banner / Current Tractate Info */}
      <div className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="text-right">
            <p className="mb-1 text-sm font-medium opacity-80">מסכת</p>
            <h2 className="text-6xl font-extrabold tracking-tighter">
              {hebrewMasechta}
            </h2>
          </div>
          <div className="text-left">
            <p className="mb-1 text-sm font-medium opacity-80">דף</p>
            <h2 className="text-6xl font-extrabold tracking-tighter">
              {dafInfo.hebDaf}
            </h2>
          </div>
        </div>
      </div>

      {/* Viewer */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <Card className="overflow-hidden border-0 shadow-sm">
          <CardContent className="relative aspect-[2/3] rounded-t-lg border bg-white p-0 dark:bg-zinc-900">
            <img
              src={`https://www.dafyomi.org/edafnew/${dafInfo.masechta}/${dafInfo.daf}a.jpg`}
              alt={`${dafInfo.englishName} ${dafInfo.daf}a`}
              className="h-full w-full object-contain"
            />
          </CardContent>
          <div className="bg-background rounded-b-lg border-x border-b p-3 text-center text-sm font-medium">
            עמוד א
          </div>
        </Card>
        <Card className="overflow-hidden border-0 shadow-sm">
          <CardContent className="relative aspect-[2/3] rounded-t-lg border bg-white p-0 dark:bg-zinc-900">
            <img
              src={`https://www.dafyomi.org/edafnew/${dafInfo.masechta}/${dafInfo.daf}b.jpg`}
              alt={`${dafInfo.englishName} ${dafInfo.daf}b`}
              className="h-full w-full object-contain"
            />
          </CardContent>
          <div className="bg-background rounded-b-lg border-x border-b p-3 text-center text-sm font-medium">
            עמוד ב
          </div>
        </Card>
      </div>
    </div>
  )
}
