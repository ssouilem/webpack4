export default function clientMiddleware () {
  return ({ dispatch, getState }) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState)
      }

      const { promise, types, ...rest } = action
      if (!promise) {
        return next(action)
      }

      const [REQUEST, SUCCESS, FAILURE] = types
      next({ ...rest, type: REQUEST })

      const actionPromise = promise
      // console.log('actionPromise' + JSON.stringify(actionPromise))
      actionPromise.then(
        (result) => next({ ...rest, result, type: SUCCESS }),
        (error) => next({ ...rest, error, type: FAILURE })
      ).catch((error) => {
        console.log('catch' + error)
        next({ ...rest, error, type: FAILURE })
      })

      return actionPromise
    }
  }
}
