import React from 'react'
import styled from 'styled-components'

const Fsplayer = () => {
    return (
        <StyledFsplayer className='left'>
            Full screen player coming soon...
        </StyledFsplayer>
    )
}

const StyledFsplayer = styled.div`
position:relative;
  width: 100%;
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  `

export default Fsplayer
