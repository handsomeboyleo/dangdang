import store from "./store";
import { useSelector, TypedUseSelectorHook } from 'react-redux'

type RootState = ReturnType<typeof store.getState>

export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector
