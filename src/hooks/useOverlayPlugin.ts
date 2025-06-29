import { useEffect } from 'react'
import type { EventMap } from '../types/overlay'

interface UseOverlayPluginProps {
  onMessage: EventMap['LogLine']
}

const useOverlayPlugin = ({ onMessage }: UseOverlayPluginProps) => {
  useEffect(() => {
    window.addOverlayListener('LogLine', onMessage)
    window.startOverlayEvents()
    return () => window.removeOverlayListener('LogLine', onMessage)
  }, [onMessage])
}

export default useOverlayPlugin
