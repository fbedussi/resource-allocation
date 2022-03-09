import {
  addDoc, collection, deleteDoc,
  doc, getDocs, query,
  setDoc, where
} from 'firebase/firestore'

import { BaseQueryApi, QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { createApi } from '@reduxjs/toolkit/query/react'

import { db } from '../backend/init'
import { Company } from '../model/company'
import { Id, RootState } from '../model/model'
import { selectUserId } from '../store/user/selectors'

const COLLECTION_NAME = 'companies'

export const companiesApi = createApi({
  reducerPath: 'companiesApi',
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
    getCompanies: builder.query<Company[], string | void>({
      query: () => async (userId: string) => {
        const q = query(
          collection(db, COLLECTION_NAME),
          where('userId', '==', userId),
        )

        const querySnapshot = await getDocs(q)
        let companies: Company[] = []
        querySnapshot.forEach(doc => {
          const company = doc.data() as Company
          companies.push({ ...company, id: doc.id })
        })
        return companies
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
    addCompany: builder.mutation<
      Company,
      Company
    >({
      query: company => async (userId: Id) => {
        const companyNoId: Omit<Company, 'id'> & { id?: string } = { ...company }
        delete companyNoId.id
        const docRef = await addDoc(collection(db, COLLECTION_NAME), { ...companyNoId, userId })
        return { ...company, id: docRef.id }
      },
      invalidatesTags: [{ type: COLLECTION_NAME, id: 'LIST' }],
    }),
    editCompany: builder.mutation<Company, Company>({
      query: company => async (userId: Id) => {
        try {
          await setDoc(doc(db, COLLECTION_NAME, company.id), company)
          return company
        } catch (e) {
          throw e
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: COLLECTION_NAME, id },
      ],
    }),
    deleteCompany: builder.mutation<true, Id>({
      query: companyId => async (userId: Id) => {
        try {
          await deleteDoc(doc(db, COLLECTION_NAME, companyId))
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
  useGetCompaniesQuery,
  useAddCompanyMutation,
  useEditCompanyMutation,
  useDeleteCompanyMutation,
} = companiesApi

export const useGetCompanyQuery = (companyId: Id) => {
  const { company } = useGetCompaniesQuery(undefined, {
    selectFromResult: ({ data }) => {
      return {
        company: data?.find(({ id }) => id === companyId),
      }
    },
  })
  return company
}
