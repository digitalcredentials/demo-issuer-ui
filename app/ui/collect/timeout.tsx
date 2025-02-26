'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function TimeOut() {
    const router = useRouter()
    useEffect(() => {
        const timer = setTimeout(() => {
            clearTimeout(timer);
            router.push('/expired')
          }, 600000);
      }, [])
    return (<div></div>)
  }