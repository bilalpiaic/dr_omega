"use client"
import ChatComponent from '@/components/ChatComponent'
import { ModeToggle } from '@/components/modetoggle'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import ReportComponent from '@/components/ui/reportComponent'
import { useToast } from '@/hooks/use-toast'
import { Upload } from 'lucide-react'
import React, { useState } from 'react'

type Props = {}

const HomeComponent = (props: Props) => {
  const [reportData, setReportData] = useState("")
  const { toast } = useToast();

  const onReportConfirmation = (data: string) => {
    setReportData(data);
    toast({
      description: "Updated!",
    });
  }

  return (
    <div className='grid-h-screen w-full'>
      <div className='flex flex-col'>
        <header className='sticky top-0 z-10 h-[57px] bg-background flex items-center justify-between gap-1 border-b px-4'>
          <h1 className='text-xl flex font-semibold text-[#D90013]'>Dr</h1>
          <h1 className='text-xl flex font-semibold text-[#D90013]'>Omega</h1>
          <div className='w-full flex flex-row justify-end gap-2'>
            <ModeToggle />
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant={'outline'} size={'icon'} className='md:hidden'><Upload /></Button>
              </DrawerTrigger>
              <DrawerContent className='h-[80vh]'>
                <ReportComponent onReportConfirmation={onReportConfirmation} />
              </DrawerContent>
            </Drawer>
          </div>
        </header>
        <main className='main-tag grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3'>
          <div className='hidden md:block'>
            <ReportComponent onReportConfirmation={onReportConfirmation} />
          </div>
          <div className='lg:col-span-2'>
            <ChatComponent reportData={reportData} />
          </div>
        </main>
      </div>
    </div>
  )
}

export default HomeComponent;
