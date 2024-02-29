import { ClerkProvider } from '@clerk/nextjs'
import {Toaster} from "sonner"
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (        
    <ClerkProvider>
      <Toaster />
      {children}
    </ClerkProvider>
  )
}