import {
  addDoc, collection, deleteDoc,
  doc, getDocs, query,
  setDoc, where
} from 'firebase/firestore'
import { useSelector } from 'react-redux'

import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { createApi } from '@reduxjs/toolkit/query/react'

import { db } from '../backend/init'
import { Id } from '../model/model'
import { Person } from '../model/person'
import { Project } from '../model/project'
import { selectUserId } from '../store/user/selectors'

const COLLECTION_NAME = 'projects'

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  tagTypes: [COLLECTION_NAME],
  baseQuery: async <T>(query: T): Promise<QueryReturnValue<T, string, {}>> => {
    try {
      const data = await query
      return { data }
    } catch (error: any) {
      return { error: error.toString() }
    }
  },
  endpoints: builder => ({
    getProjects: builder.query<Project[], string | void>({
      query: async (userId: string) => {
        const q = query(
          collection(db, COLLECTION_NAME),
          where('userId', '==', userId),
        )

        const querySnapshot = await getDocs(q)
        let projects: Project[] = []
        querySnapshot.forEach(doc => {
          const project = doc.data() as Project
          projects.push({ ...project, id: doc.id })
        })
        return projects
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
    addProject: builder.mutation<
      Project,
      Omit<Project, 'id'> & { userId: string }
    >({
      query: async project => {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), project)
        return { ...project, id: docRef.id }
      },
      invalidatesTags: [{ type: COLLECTION_NAME, id: 'LIST' }],
    }),
    editProject: builder.mutation<Project, Project>({
      query: async project => {
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
    deleteProject: builder.mutation<true, Id>({
      query: async projectId => {
        try {
          await deleteDoc(doc(db, COLLECTION_NAME, projectId))
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
  useGetProjectsQuery,
  useAddProjectMutation,
  useEditProjectMutation,
  useDeleteProjectMutation,
} = projectsApi

export const useGetProjectQuery = (projectId: Id) => {
  const userId = useSelector(selectUserId)

  const { project } = useGetProjectsQuery(userId, {
    selectFromResult: ({ data }) => {
      return {
        project: data?.find(({ id }) => id === projectId),
      }
    },
  })
  return project
}

export const useGetPersonProjectsQuery = (person: Person) => {
  const userId = useSelector(selectUserId)

  const { projects } = useGetProjectsQuery(userId, {
    selectFromResult: ({ data }) => {
      return {
        projects: data?.filter(({ id }) => person.projects.some(({ projectId }) => projectId === id)),
      }
    },
  })
  return projects
}

// export const selectProjectsResult = projectsApi.endpoints.getProjects.select()

// export const selectAllProjects = createSelector(
//   selectProjectsResult,
//   result => result?.data ?? []
// )
