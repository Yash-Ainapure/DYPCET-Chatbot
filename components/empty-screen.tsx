import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: 'Ask what all things you chatbot can do',
    message: `Hello!, tell me what all things you can do for me? also list them.`
  },
  {
    heading: 'Ask for your attendance',
    message: 'Give me the attandance for roll number 102: \n'
  },
  {
    heading: 'ask for your timetable',
    message: `Give me the time table for 1st year CSE branch: \n`
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Welcome to DYPCET AI Assistant
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          This is an open source AI chatbot app built with{' '}
          <ExternalLink href="https://nextjs.org">Next.js</ExternalLink> and <ExternalLink href="https://groq.com/">Groq AI</ExternalLink>
        </p>
        <p className="leading-normal text-muted-foreground">
          You can start a conversation here or try the following examples:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
