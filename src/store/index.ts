import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

import app from 'features/App/reducer'
import userData from 'features/UserData/reducer'
import favoritesReducer from 'features/Favorites/reducer'
import type { T_RootState } from './types'


const reducer = combineReducers({
  app,
  userData,
  favoritesReducer,
})

const store = configureStore({ reducer })

export default store


export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<T_RootState> = useSelector