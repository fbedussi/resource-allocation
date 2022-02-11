import { Id } from './model'

export type NotificationType = 'success' | 'error' | 'info'

export type Notification = {
  id: Id
  type: NotificationType
  autoClose?: boolean
  messageLabelKey: string
  interpolationPayload?: Record<string, string>
}
