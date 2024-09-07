import React from 'react'
import { useRouteError } from 'react-router-dom'

const Error = () => {
    const err = useRouteError()
    console.log("Error---",err)
  return (
    <div>
        <h2>Page not found</h2>
        <h3>{err.status} : {err.statusText}</h3>
{/* <h1>{errorRouter.console.error.message}</h1> */}
</div>
  )
}

export default Error