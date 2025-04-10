import { Chat } from "@/components/chat";
import { Header } from "@/components/header";
import { Providers } from "@/components/providers";
import { nanoid } from '@/lib/utils'
import { Toaster } from "react-hot-toast";

export default function ChatbotPage() {

  const id = nanoid()

  return (
    <div>
      <Toaster />
      <Providers attribute="class" defaultTheme="system" enableSystem>
        <div className="flex min-h-screen flex-col">
          {/* @ts-ignore */}
          <Header />
          <main className="flex flex-1 flex-col bg-muted/50">
            <Chat id={id} />
          </main>
        </div>
      </Providers>
    </div>
  );
}
