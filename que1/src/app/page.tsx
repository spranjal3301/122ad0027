"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { testfetchUsers } from "@/lib/axiosClient"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    async function text() {
      const adata=  await testfetchUsers();
      console.log(adata);
    }
      
    text();
    // router.push("/top-users")

  }, [])

  return <>hello uses</>
}
