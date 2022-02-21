import { Id } from './model'

export type Role = '' | 'developer' | 'project manager'

export type Status = 'incoming' | 'onduty' | 'outgoing' | 'resigned'

export type Person = {
  id: Id
  name: string
  surname: string
  role: Role
  projects: { projectId: Id, allocation: number }[]
  status: Status
  externalCompany?: string
}
