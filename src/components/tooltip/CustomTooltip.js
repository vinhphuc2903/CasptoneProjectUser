/* eslint-disable react/jsx-props-no-spreading */
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import React from 'react'
import { styled } from '@mui/material/styles'

export default styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} arrow placement="top" />
))({
  [`& .${tooltipClasses.arrow}`]: {
    color: '#333333',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
    fontSize: '12px',
    lineHeight: '18px',
    backgroundColor: '#333333',
    padding: 10,
  },
})
