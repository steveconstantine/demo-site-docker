import { useCallback } from 'react'

import { useMappedState, useDispatch } from 'redux-react-hook'

type Dependencies = Readonly<any[]>

export function useReduxState<R>(
  selector: (state: Store.Global) => R,
  dependencies: Dependencies = []
): [R, Store.Dispatch] {
  // Get the Redux dispatch fn via hook
  const dispatch = useDispatch()
  // Create an fn that will only rerun if dependencies change.
  // The fn will call our selector with global state and return a slice of it.
  const mapState = useCallback(selector, dependencies)
  // Subscribe to updates and return the sliced state and dispatcher
  return [useMappedState(mapState), dispatch]
}
