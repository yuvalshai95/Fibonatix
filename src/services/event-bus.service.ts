function on(eventName:string, listener:any) {
    const callListener = ({ detail }:any) => {
        listener(detail)
    }
    window.addEventListener(eventName, callListener)
    return () => {
        window.removeEventListener(eventName, callListener)
    }
}

function emit(eventName:string, data:any) {
    window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
}
export const eventBusService = { on, emit }

export function showUserMsg(txt:string, type = 'info') {
    eventBusService.emit('show-user-msg', { txt, type })
}