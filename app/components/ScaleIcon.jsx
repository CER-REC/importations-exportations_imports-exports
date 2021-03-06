import React from 'react'

import './ScaleIcon.scss'

export const Linked = ({ height = 77.4, ...props }) => {
  const scale = height / 77.4
  return (
    <path
      {...props}
      transform={`${props.transform || ''} scale(${scale})`}
      d="M74.76,14.3,63.09,2.63a9,9,0,0,0-12.73,0L31.09,21.9a3,3,0,0,0,4.24,4.24L54.6,6.87a3,3,0,0,1,4.24,0L70.51,18.54a3,3,0,0,1,0,4.24L51.25,42.05a3,3,0,1,0,4.24,4.24L74.76,27A9,9,0,0,0,74.76,14.3ZM41.7,51.6,22.78,70.51a3.07,3.07,0,0,1-4.24,0L6.87,58.85a3,3,0,0,1,0-4.24L25.79,35.69a3,3,0,0,0-4.24-4.24L2.63,50.36a9,9,0,0,0,0,12.73L14.3,74.76a9,9,0,0,0,12.73,0L45.94,55.84A3,3,0,1,0,41.7,51.6ZM22.52,54.87a3,3,0,0,0,4.24,0L54.87,26.76a3,3,0,1,0-4.24-4.24L22.52,50.63A3,3,0,0,0,22.52,54.87Z"
    />
  )
}

export const Broken = ({ height = 77.4, ...props }) => {
  const scale = height / 77.4
  return (
    <g
      {...props}
      transform={`${props.transform || ''} scale(${scale})`}
    >
      <path d="M63.42,2.62a9,9,0,0,0-12.7,0l-15.1,15.1a9,9,0,0,0,0,12.7l1.2,1.2a3,3,0,1,0,4.3-4.1l-1.2-1.2a3,3,0,0,1,0-4.2l15-15.2a3.1,3.1,0,0,1,4.2,0l11,11a3,3,0,0,1,0,4.2L55,37.22a3.1,3.1,0,0,1-4.2,0l-1.3-1.3a3,3,0,0,0-4.2,4.2l1.2,1.3a9,9,0,0,0,12.7,0l15.2-15.1a9,9,0,0,0,0-12.7Z" />
      <path d="M40.22,45.32a3,3,0,1,0-4.3,4.2l1.2,1.2a3,3,0,0,1,0,4.2l-15,15.2a3,3,0,0,1-4.2,0l-11-11a3,3,0,0,1,0-4.2L22,39.82a3,3,0,0,1,4.2,0l1.3,1.3a3,3,0,0,0,4.2-4.2l-1.2-1.3a9,9,0,0,0-12.7,0L2.62,50.72a9,9,0,0,0,0,12.7l11,11a9,9,0,0,0,12.7,0l15.1-15.1a9,9,0,0,0,0-12.7Z" />
      <path d="M55.62,51.42a3,3,0,0,0-4.2,4.2l14.7,14.7a3,3,0,0,0,4.2-4.2Z" />
      <path d="M6.72,10.92l14.7,14.7a3,3,0,0,0,4.2-4.2L10.92,6.72a3,3,0,0,0-4.2,4.2Z" />
    </g>
  )
}

export const ToggleLinked = ({ height = 15.5, ...props }) => {
  const scale = height / 15.5
  return (
    <g
      className="ScaleIconToggleLinked"
      {...props}
      transform={`${props.transform || ''} scale(${scale})`}
    >
      <circle cx="7.7" cy="7.7" r="7.2" />
      <line x1="5.9" y1="9.5" x2="9.6" y2="5.9" />
      <path d="M9.6,8.3l2.3-2.4a.8.8,0,0,0,0-1.1L10.6,3.5a.8.8,0,0,0-1.1,0L7.1,5.9" />
      <path d="M8.3,9.5,6,11.9a.8.8,0,0,1-1.1,0L3.5,10.6a.8.8,0,0,1,0-1.1L5.9,7.1" />
    </g>
  )
}

export const ToggleUnlinked = ({ height = 15.5, ...props }) => {
  const scale = height / 15.5
  return (
    <g
      className="ScaleIconToggleUnlinked"
      {...props}
      transform={`${props.transform || ''} scale(${scale})`}
    >
      <path className="b" d="M2.6,2.6a7.2,7.2,0,0,1,10.2,0,7.2,7.2,0,0,1,0,10.3" />
      <path className="b" d="M2.6,2.6a7.2,7.2,0,0,0,0,10.2,7.2,7.2,0,0,0,10.3,0" />
      <line x1="4.1" y1="4.1" x2="5.9" y2="5.9" />
      <line x1="9.7" y1="9.7" x2="11.5" y2="11.5" />
      <path d="M9,7.9a.8.8,0,0,0,1.1,0L12,6a.8.8,0,0,0,0-1.1L10.7,3.6a.8.8,0,0,0-1.1,0L7.7,5.5a.8.8,0,0,0,0,1.1" />
      <path d="M7.9,9a.8.8,0,0,1,0,1.1L6,12a.8.8,0,0,1-1.1,0L3.6,10.7a.8.8,0,0,1,0-1.1L5.4,7.7a.8.8,0,0,1,1.1,0" />
    </g>
  )
}
