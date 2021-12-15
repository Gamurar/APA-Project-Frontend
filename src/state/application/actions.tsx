import { createAction } from '@reduxjs/toolkit'

export enum ApplicationModal {
  ADD_STRING,
}

export const setOpenModal = createAction<ApplicationModal | null>('application/setOpenModal')
