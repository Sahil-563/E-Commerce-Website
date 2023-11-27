import Header from './header.jsx';
import Footer from './footer.jsx';
import React from 'react'

function layout(props) {
  return (
    <>
    <Header/>
        <main>
            {props.children}
        </main>
    <Footer/>
    </>
    
  )
}

export default layout