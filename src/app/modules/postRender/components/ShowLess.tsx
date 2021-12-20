type ShowLessProps = {
  onClick: () => void
}

export const ShowLess = (props: ShowLessProps) => {
  const {onClick} = props

  return (
    <span onClick={onClick} style={{color: '#7342CC', cursor: 'pointer'}}>
      See Less
    </span>
  )
}
