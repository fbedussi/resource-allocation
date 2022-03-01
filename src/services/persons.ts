import {
  addDoc, collection, deleteDoc,
  doc, getDocs, query,
  setDoc, where
} from 'firebase/firestore'

import { BaseQueryApi, QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { createApi } from '@reduxjs/toolkit/query/react'

import { db } from '../backend/init'
import { Id, RootState } from '../model/model'
import { Person, Role } from '../model/person'
import { selectUserId } from '../store/user/selectors'

const COLLECTION_NAME = 'persons'

export const personsApi = createApi({
  reducerPath: 'personsApi',
  tagTypes: [COLLECTION_NAME],
  baseQuery: async <T>(query: (userId: Id) => T, api: BaseQueryApi): Promise<QueryReturnValue<T, string, {}>> => {
    const state = api.getState() as RootState
    const userId = selectUserId(state)

    try {
      const data = await query(userId)
      return { data }
    } catch (error: any) {
      return { error: error.toString() }
    }
  },
  endpoints: builder => ({
    getPersons: builder.query<Person[], string | void>({
      query: () => async (userId: string) => {
        const q = query(
          collection(db, COLLECTION_NAME),
          where('userId', '==', userId),
        )

        const querySnapshot = await getDocs(q)
        let persons: Person[] = []
        querySnapshot.forEach(doc => {
          const project = doc.data() as Person
          persons.push({ ...project, id: doc.id })
        })
        return persons
      },
      providesTags: result =>
        // is result available?
        result
          ? // successful query
          [
            ...result.map(
              ({ id }) => ({ type: COLLECTION_NAME, id } as const),
            ),
            { type: COLLECTION_NAME, id: 'LIST' },
          ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'projects', id: 'LIST' }` is invalidated
          [{ type: COLLECTION_NAME, id: 'LIST' }],
    }),
    addPerson: builder.mutation<Person, Person>({
      query: person => async (userId: Id) => {
        const personNoId: Omit<Person, 'id'> & { id?: string } = { ...person }
        delete personNoId.id
        const docRef = await addDoc(collection(db, COLLECTION_NAME), { ...personNoId, userId })
        return { ...person, id: docRef.id }
      },
      invalidatesTags: [{ type: COLLECTION_NAME, id: 'LIST' }],
    }),
    editPerson: builder.mutation<Person, Person>({
      query: project => async (userId: Id) => {
        try {
          await setDoc(doc(db, COLLECTION_NAME, project.id), project)
          return project
        } catch (e) {
          throw e
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: COLLECTION_NAME, id },
      ],
    }),
    deletePerson: builder.mutation<true, Id>({
      query: id => async (userId: Id) => {
        try {
          await deleteDoc(doc(db, COLLECTION_NAME, id))
          return true
        } catch (e) {
          throw e
        }
      },
      invalidatesTags: (result, error, id) => [{ type: COLLECTION_NAME, id }],
    }),
  }),
})

export const {
  useGetPersonsQuery,
  useAddPersonMutation,
  useEditPersonMutation,
  useDeletePersonMutation,
} = personsApi

export const useGetPersonQuery = (personId: Id) => {
  const { project } = useGetPersonsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      project: data?.find(({ id }) => id === personId),
    }),
  })
  return project
}

export const useGetProjectPersonsQuery = (projectId: Id, role?: Role) => {
  const { persons } = personsApi.useGetPersonsQuery(undefined, {
    selectFromResult: ({ data }) => {
      return {
        persons: data?.filter(person => person.projects.some(personsProject => personsProject.projectId === projectId) && role ? person.role === role : true),
      }
    },
  })
  return persons
}

// export const selectPersonsResult = personsApi.endpoints.getPersons.select()


// export const selectAllPersons = createSelector(
//   selectPersonsResult,
//   result => result?.data ?? []
// )

// const mergeProjectsInPersons = (persons: Person[], projects: Project[]) => persons.map(person => ({
//   ...person,
//   projects: person.projects.map(({ projectId, allocation }) => {
//     const project = projects.find(project => project.id === projectId)

//     return project ? {
//       ...project,
//       allocation,
//     } : undefined
//   })
// }))

// export const selectAllUsers = createSelector(
//   selectAllPersons,
//   selectAllProjects,
//   mergeProjectsInPersons,
// )

// export const useGetPersonsWithProjectsQuery = (userId: Id) => {
//   const persons = useGetPersonsQuery(userId)
//   const projects = useGetProjectsQuery(userId)

//   return {
//     error: persons.error || projects.error,
//     isLoading: persons.isLoading || projects.isLoading,
//     data: persons.data && projects.data && mergeProjectsInPersons(persons.data, projects.data)
//   }
// }
