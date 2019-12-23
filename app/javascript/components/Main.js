import React from "react"
import PropTypes from "prop-types"
import Header from './Header'
import Editor from './Editor';


const Main = (props) => {
  return(
    <div>
      <Header /> 
      <Editor />
    </div>
  )
}


export default Main