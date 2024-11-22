import { Box, Paper } from "@mui/material";

function Block({sx = {}, children}) {
  return (
    <Box sx = {theme => ({
      ...theme.typography.body2,
      padding: 2,
      textAlign: 'center',
      width: '100%',
      height: '100%',
      borderRadius: '15px',
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.primary.secondary,
      position: 'relative',
      transition: '0.5s all ease',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)',
      ...sx
    })}>{children}</Box>
  )
}

export default Block