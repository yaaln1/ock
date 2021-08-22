import { useCallback } from 'react'
// хук для вывода всплывающего сообщения

export const useMessage = () => {
    return useCallback((text) => {
        if (window.M && text) {
            window.M.toast({ html: text })
        }
    }, [])
}