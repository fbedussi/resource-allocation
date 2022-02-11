import {
  addDoc, collection, deleteDoc,
  doc, getDocs, query,
  setDoc, where
} from 'firebase/firestore'

import { createApi } from '@reduxjs/toolkit/query/react'

import { db } from '../backend/init'
import { Id } from '../model/model'
import { Project } from '../model/project'

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  tagTypes: ['projects'],
  baseQuery: async (query) => {
    try {
      const data = await query
      return { data }
    } catch (error: any) {
      return { error: error.toString() }
    }
  },
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], string | void>({
      query: async (userId: string) => {
        const q = query(collection(db, "projects"), where("userId", "==", userId));

        const querySnapshot = await getDocs(q);
        let projects: Project[] = []
        querySnapshot.forEach((doc) => {
          const project = doc.data() as Project
          projects.push({ ...project, id: doc.id })
        });
        return projects
      },
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
          [
            ...result.map(({ id }) => ({ type: 'projects', id } as const)),
            { type: 'projects', id: 'LIST' },
          ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'projects', id: 'LIST' }` is invalidated
          [{ type: 'projects', id: 'LIST' }],
    }),
    addProject: builder.mutation<Project, Omit<Project, 'id'> & { userId: string }>({
      query: async (project) => {
        const docRef = await addDoc(collection(db, "projects"), project)
        return { ...project, id: docRef.id }
      },
      invalidatesTags: [{ type: 'projects', id: 'LIST' }],
    }),
    editProject: builder.mutation<Project, Project>({
      query: async (project) => {
        try {
          await setDoc(doc(db, "projects", project.id), project)
          return project
        } catch (e) {
          throw e;
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'projects', id }],
    }),
    deleteProject: builder.mutation<true, Id>({
      query: async (projectId) => {
        try {
          await deleteDoc(doc(db, "projects", projectId))
          return true
        } catch (e) {
          throw e;
        }
      },
      invalidatesTags: (result, error, id) => [{ type: 'projects', id }],
    })
  }),
})

export const {
  useGetProjectsQuery,
  useAddProjectMutation,
  useEditProjectMutation,
  useDeleteProjectMutation
} = projectsApi

export const useGetProjectQuery = (projectId: Id, userId: Id) => {
  const { project } = useGetProjectsQuery(userId, {
    selectFromResult: ({ data }) => ({
      project: data?.find(({ id }) => id === projectId),
    }),
  })
  return project
}
