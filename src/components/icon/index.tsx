import React from "react"
import { css } from '@emotion/core'
import { clockwiseRotationAnimation, counterClockwiseRotationAnimation } from '../../styles/globals'
type IconProps = {
  icon: string
  viewBox?: number,
  color?: string
  size?: string
  heightRatio?: number
  isClockWiseRotation?: boolean
  isCounterClockwiseRotation?: boolean
}

const Icon = ({viewBox = 24,  heightRatio = 1, size = '24px', ...props}: IconProps) => {
  const { color, icon, isClockWiseRotation, isCounterClockwiseRotation } = props
  return (
    <svg css={[
      isClockWiseRotation && clockwiseRotationAnimation,
      isCounterClockwiseRotation && counterClockwiseRotationAnimation,
      css`
      width: ${size};
      height: ${parseInt(size) * heightRatio }px;
    `,
    ]} viewBox={`0 0 ${viewBox} ${viewBox}`}>
      <path fill={color} d={icon} fillRule='evenodd'/>
    </svg>
  )
}

export default Icon