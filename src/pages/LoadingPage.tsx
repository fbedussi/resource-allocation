import React from 'react'
import styled from 'styled-components'

import { CircularProgress } from '../styleguide'

const Wrapper = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
`

const LoadingPage: React.FC = () => {
	return (
		<Wrapper>
			<CircularProgress />
		</Wrapper>
	)
}

export default LoadingPage
