import { css } from 'styled-components'

const generateStyles = position => {
  let positionSpecificCss

  switch (position) {
    case 'right':
      positionSpecificCss = css`
        width: 3rem;
        height: 100%;
        top: 0;
        right: 0;
        border-right: 0.6rem solid #808080;
        cursor: ew-resize;
      `
      break

    case 'left':
      positionSpecificCss = css`
        width: 3rem;
        height: 100%;
        top: 0;
        left: 0;
        border-left: 0.6rem solid #808080;
        cursor: ew-resize;
      `
      break

    case 'top':
      positionSpecificCss = css`
        width: 100%;
        height: 3rem;
        top: 0;
        border-top: 0.6rem solid #808080;
        cursor: ns-resize;
      `
      break

    case 'bottom':
      positionSpecificCss = css`
        width: 100%;
        height: 3rem;
        bottom: 0;
        border-bottom: 0.6rem solid #808080;
        cursor: ns-resize;
      `
      break

    case 'top-left':
      positionSpecificCss = css`
        width: 3rem;
        height: 3rem;
        top: 0;
        left: 0;
        border-top: 0.6rem solid #808080;
        border-left: 0.6rem solid #808080;
        cursor: nw-resize;
      `
      break

    case 'top-right':
      positionSpecificCss = css`
        width: 3rem;
        height: 3rem;
        top: 0;
        right: 0;
        border-top: 0.6rem solid #808080;
        border-right: 0.6rem solid #808080;
        cursor: nesw-resize;
      `
      break

    case 'bottom-right':
      positionSpecificCss = css`
        width: 3rem;
        height: 3rem;
        bottom: 0;
        right: 0;
        border-bottom: 0.6rem solid #808080;
        border-right: 0.6rem solid #808080;
        cursor: nwse-resize;
      `
      break

    case 'bottom-left':
      positionSpecificCss = css`
        width: 3rem;
        height: 3rem;
        bottom: 0;
        left: 0;
        border-bottom: 0.6rem solid #808080;
        border-left: 0.6rem solid #808080;
        cursor: nesw-resize;
      `
      break

    default:
      positionSpecificCss = ''
      console.error('Invalid handle type!')
      break
  }

  return positionSpecificCss
}

export default generateStyles
