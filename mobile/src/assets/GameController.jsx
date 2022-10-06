import * as React from "react"

const GameController = (props) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.875 8.438h2.5M5.625 8.438h2.5M6.875 7.188v2.5M13.438 4.352l-6.875.023a4.07 4.07 0 0 0-4 3.36v0l-1.282 6.57a2.187 2.187 0 0 0 3.704 1.93v0L8.36 12.5l5.078-.023a4.062 4.062 0 0 0 0-8.125v0Z"
      stroke="#fff"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m17.438 7.711 1.28 6.594a2.188 2.188 0 0 1-3.702 1.93v0l-3.375-3.75"
      stroke="#fff"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default GameController
