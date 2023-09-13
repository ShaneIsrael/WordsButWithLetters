import React from 'react'
import PropTypes from 'prop-types'
import PageWrapper from '../components/wrappers/PageWrapper'
import { Grid, Sheet, styled } from '@mui/joy'

const boardData = {
  pyramid: [[21, 20, 8, 4, 9, 18], [10, 7, 14, 5, 19], [3, 2, 17, 11], [16, 1, 15], [6, 12], [13]],
  solution: [4, 3, 0, 2, 0, 0],
  pathSum: 51,
  freeSlot: [3, 1],
}

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
  ...theme.typography['body-sm'],
  padding: theme.spacing(1),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  // borderRadius: 4,
  // border: '1px solid #00000040',
  color: theme.vars.palette.text.secondary,
  width: 75,
  height: 75,
}))

const Pyramid = (props) => {
  return (
    <PageWrapper>
      <Sheet sx={{ background: '#00000040', padding: '10px', width: 550 }}>
        {boardData.pyramid.map((row) => (
          <Grid
            container
            flexGrow={1}
            gap={'1px'}
            marginBottom={'1px'}
            flexDirection="row"
            width="100%"
            justifyContent="center"
          >
            {row.map((value) => (
              <Grid>
                <Item>{value}</Item>
              </Grid>
            ))}
          </Grid>
        ))}
      </Sheet>
    </PageWrapper>
  )
}

Pyramid.propTypes = {}

export default Pyramid
