// import { Link } from '@mui/material'
import { Link } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function LinkComponent({params, parentDirection, condition}) {
    const navigateAddress = parentDirection + '/' + params.id
    const navigate = useNavigate()
  return (
    <Link underline="always"             
    onClick={(event) => {
        event.stopPropagation();
        console.log('condition : ', condition)
        condition && navigate(navigateAddress)
    }}
    sx = {{ 
        color: theme => theme.palette.mode == 'dark' ? '#c9d5ff' : '#040085',
        fontWeight: '400',
        cursor: 'pointer'
        // textDecoration: "underline"
     }}>
    {params.value}
    </Link>
  )
}

export const renderLink = ({params, DIRECTION, condition}) => {
    if (params?.value == null) {
    return '';
  }
    return <LinkComponent params = {params} parentDirection  = {DIRECTION} condition = {condition}/>
}

export default LinkComponent
