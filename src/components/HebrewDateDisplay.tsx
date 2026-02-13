'use client'
import { useEffect, useState } from 'react'
import { HDate } from '@hebcal/core'

export function HebrewDateDisplay() {
  const [dateStr, setDateStr] = useState<string>('')

  useEffect(() => {
    // Calculate date on client to match user's timezone
    const now = new HDate()
    setDateStr(now.render('he'))
  }, [])

  return <p className="text-muted-foreground">{dateStr}</p>
}
