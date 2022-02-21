import { Id, IsoDate } from './model'

export type ProjectBe = {
	id: Id
	name: string
	status: 'discovery' | 'in progress' | 'TBD'
	pmUserId: Id
	startDate: IsoDate
}

export type ProjectStatus = 'discovery' | 'in progress' | 'TBD'

export type Project = {
	id: Id
	name: string
	status: ProjectStatus
	// pm: {
	//   userId: Id
	//   name: string
	// }
	startDate: IsoDate
}
