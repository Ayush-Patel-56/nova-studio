'use client'
import { useEffect, useState } from 'react'

export function useCountUp(target: number, duration = 1500, active = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    const start = Date.now()

    const tick = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress === 1) clearInterval(tick)
    }, 16)

    return () => clearInterval(tick)
  }, [target, duration, active])

  return count
}
