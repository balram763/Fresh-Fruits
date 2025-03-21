import React from 'react'

const Loading = () => {
  return (
    <div className=" container d-flex align-items-center mt-4 justify-content-center" >
          <button className="btn btn-success" type="button" disabled>
    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
    <span role="status">Loading...</span>
  </button>
        </div>
  )
}

export default Loading