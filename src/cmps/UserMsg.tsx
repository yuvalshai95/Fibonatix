import { useState, useEffect, useRef, Fragment } from 'react'

// Services
import { eventBusService } from '../services/event-bus.service'

// Icons
import { MdOutlineClose } from 'react-icons/md'

type message = {
    txt:string,
    type:string
}

export function UserMsg() {
    const [msg, setMsg] = useState<message| null>(null);
    const timeoutId:any = useRef();

    useEffect(() => {
        const removeEvent = eventBusService.on('show-user-msg', (msg:message) => {
            setMsg({ ...msg })
            if (timeoutId.current) clearTimeout(timeoutId.current)
            timeoutId.current = setTimeout(() => {
                setMsg(null)
            }, 3000)
        })

        return () => {
            removeEvent()
            clearTimeout(timeoutId.current)
        }
    }, [])

    const onCloseMsg = () => {
        clearTimeout(timeoutId.current)
        setMsg(null)
    }

    if (!msg) return <Fragment></Fragment>
    return (
        <section className={`user-msg ${msg.type}`}>
            <button
                className="close-btn"
                onClick={onCloseMsg}
            >
                <MdOutlineClose className='close-icon' />
            </button>
            {msg.txt}
        </section>
    )
}