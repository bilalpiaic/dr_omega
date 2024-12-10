import { useChat } from 'ai/react';
import MessageBox from './messageBox';
type Props = {
    reportData: string
}

const ChatComponent = (reportData: Props) => {
    const { messages, input , handleInputChange, handleSubmit} = useChat();
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

        </div>
    )
}

export default ChatComponent


