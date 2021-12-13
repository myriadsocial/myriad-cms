type ShowMoreProps = {
  onClick: () => void
}

export const ShowMore = (props: ShowMoreProps) => {
	const {onClick} = props

	return (
		<span onClick={onClick} style={{color: '#7342CC', cursor: 'pointer'}}>
			...&nbsp; See More
		</span>
	)
}   