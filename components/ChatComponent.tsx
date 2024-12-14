import { useChat } from 'ai/react';
import MessageBox from './messageBox';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { CornerDownLeft, Loader2 } from 'lucide-react';
type Props = {
    reportData: string
}

const ChatComponent = (reportData: Props) => {
    const { messages, input , handleInputChange, handleSubmit, isLoading} = useChat({
        api: "api/medichatgemini"
    });
    return (
        <div className='h-full grid-flow-col  bg-muted/50 relative flex flex-col min-h-[50vh] rounded-xl p-4 gap-4'> 
        
            <div className=" text-xl ">Chat Section</div>
            <div className="flex-1"></div>
           <div className='flex flex-col gap-4'>
            {
                messages.map((m,idx)=>{
                    return <MessageBox key={idx} role={m.role} content={m.content} />
                })
            }
           </div>
           <form className='relative overflow-hidden rounded-lg border border-background'
           onSubmit={(event)=>{
            event.preventDefault();
            handleSubmit(event, {
                data:{
                    reportData: reportData
                }
            })
           }}
           >
            <Textarea value={input} onChange={handleInputChange} className='min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0'  placeholder='Type your query here....' />
            <div className='flex items-center p-3 pt-0'>
                <Button disabled={isLoading}  type='submit' size={"sm"} className='ml-auto'>{isLoading ? "Analizing...":"3. Ask"}
                 {isLoading ? <Loader2 className='size-3.5 animate-spin' />: <CornerDownLeft className='size-3.5 ' />}   
                </Button>
            </div>
           </form>

        </div>
    )
}

export default ChatComponent


