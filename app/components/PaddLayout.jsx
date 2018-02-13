import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import PropTypes from 'prop-types'

import PaddMapPiece from './PaddMapPiece'
import MapLayoutGridConstant from '../MapLayoutGridConstant'
import Constants from '../Constants'
import { PaddSelector } from '../selectors/Padd'
import TRSelector from '../selectors/translate'
import Tr from '../TranslationTable'

import PaddOne from './Padds/PaddOne'
import PaddTwo from './Padds/PaddTwo'
import PaddThree from './Padds/PaddThree'
import PaddFour from './Padds/PaddFour'
import PaddFive from './Padds/PaddFive'
import PaddNonUSA from './Padds/PaddNonUSA'
import ConfidentialIcon from './ConfidentialIcon'

import ElectricitySelector from '../selectors/ElectricitySelector'
import { arrangeBy, binSelector, sortAggregatedLocationsSelector } from '../selectors/data'

const mapPieceTransformStartTop = (top, position, dimensions, mapPieceScale) => top + (position.get('y') * ((mapPieceScale * dimensions.get('height')) + dimensions.get('yAxisPadding')))
const mapPieceTransformStartLeft = (left, position, dimensions, mapPieceScale) => left + (position.get('x') * ((mapPieceScale * dimensions.get('width')) + dimensions.get('xAxisPadding')))

class PaddLayout extends React.Component {
  static propTypes = {
    arrangeBy: PropTypes.string.isRequired,
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
  }
  getPaddColor(value) {
    if (value === -1) { return '#fff' }
    const index = this.props.bins.findIndex(range => range.get(0) <= value && value < range.get(1))
    return Constants.getIn(
      ['styleGuide', 'exportColours', index],
      Constants.getIn(['styleGuide', 'colours', 'ExportDefault']),
    )
  }
  getArrow(orderBy, paddGroupId, left, top, color, confidentialCount = 0) {
    if (typeof paddGroupId === 'undefined' && paddGroupId === '') {
      return null
    }
    orderBy = orderBy === 'location' ? orderBy : 'default'
    const country = this.props.country
    const mapLayoutGrid = MapLayoutGridConstant.getIn(['PaddLayout', country])
    const fontClassName = mapLayoutGrid.getIn(['arrow', 'fontClass'])
    const transformTranslate = mapLayoutGrid.getIn(['arrow', 'orderBy', orderBy, paddGroupId])
    const transformText = mapLayoutGrid.getIn(['arrow', 'textTranslate', paddGroupId])
    const text = this.props.TRSelector(['Padd', country, paddGroupId])
    let confidentialIcon = null
    const style = mapLayoutGrid.get('styles', false)
    // if (style && confidentialCount > 0 && country !== 'ca' && this.props.confidentialityMenu) {
    //   confidentialIcon = (<g transform="translate(145 143)">
    //     <ConfidentialIcon 
    //       styles={style.get('confidentialStyle')}
    //       text="x/50 values confidential"
    //       lineX={0}
    //       lineY={0}
    //       textX={70}
    //       textY={55}
    //       containerX={730}
    //       containerY={780}
    //       xPosition={0}
    //       yPosition={0}/>
    //     </g>)
    // }
    return (<g className={fontClassName} transform={`translate(${left + transformTranslate.get('left')} ${top + transformTranslate.get('top')})`}>
      <text transform={`translate(${transformText.get('left')} ${transformText.get('top')})`}>{text}</text>
      <polygon fill={color} transform="translate(0 140)" points="149.98 18.68 168.81 26.14 187.48 18.66 187.48 17.99 184.09 17.99 184.08 14.51 152.98 14.5 152.95 17.99 149.98 17.99 149.98 18.68" />
      {confidentialIcon}
            </g>)
  }
  renderDefault(props) {
    const paddData = Array
      .from(props.Padd)
      .sort((a, b) => b[1].get('value') - a[1].get('value'))
    let left = 0
    const paddingBetweenSortedElement = 100
    const layout = paddData.reduce((acc, currentValue) => {
      let paddLayout = null
      if (currentValue[0] !== 'ca') {
        const paddGroup = currentValue[1].get('destination')
        const text = props.TRSelector(['Padd', props.country, paddGroup])
        const color = this.getPaddColor(currentValue[1].get('value'))
        switch (paddGroup) {
          case 'PADD I':
            paddLayout = <PaddOne color={color} />
            break
          case 'PADD II':
            paddLayout = <PaddTwo color={color} />
            break
          case 'PADD III':
            paddLayout = <PaddThree color={color} />
            break
          case 'PADD IV':
            paddLayout = <PaddFour color={color} />
            break
          case 'PADD V':
            paddLayout = <PaddFive color={color} />
            break
          case 'Mexico':
          case 'Non-USA':
            paddLayout = <PaddNonUSA color={color} />
            break
        }
        if (paddLayout !== null) {
          paddLayout = (<g key={`${props.arrangeBy}_${currentValue[1].get('destination')}`} transform={`translate(${left} 0)`}>
            {paddLayout}
            { this.getArrow(props.arrangeBy, paddGroup, 0, 0, color, currentValue[1].get('confidentialCount', 0)) }
          </g>)
          acc.push(paddLayout)
          left += paddingBetweenSortedElement
        }
      }

      return acc
    }, [])
    return layout
  }
  renderLocation(props) {
    const mapLayoutGrid = MapLayoutGridConstant.getIn(['PaddLayout', props.country])
    const dimensions = mapLayoutGrid.get('dimensions')
    const styles = mapLayoutGrid.get('styles')
    const mapPieceScale = mapLayoutGrid.get('mapPieceScale')
    const layout = mapLayoutGrid.get('layout').filter(point => point.get('paddGroup') === props.paddGroup)
    const paddGroup = Constants.getIn(['dataloader', 'mapping', 'padd', props.country, props.paddGroup])
    const data = props.Padd.get(paddGroup)
    const color = this.getPaddColor(data.get('value'))
    return (<g transform={`translate(${props.paddingX} ${props.paddingY})`}>
      {layout.map((position, key) => (
        <PaddMapPiece
          key={`paddLayout_${props.country}_${position.get('name')}`}
          originKey={position.get('originKey')}
          dimensions={dimensions}
          styles={styles}
          color={color}
          left={mapPieceTransformStartLeft(props.left, position, dimensions, mapPieceScale)}
          top={mapPieceTransformStartTop(props.top, position, dimensions, mapPieceScale)}
          isLabelRquired={props.arrangeBy === 'location'}
        />
    ))}
      {this.getArrow(
      this.props.arrangeBy,
      this.props.paddGroup,
      this.props.left,
      this.props.top,
      color,
      data.get('confidentialCount', 0),
    )}
  </g>)
  }
  renderPaddMapPiece() {
    if (this.props.arrangeBy === 'location' || this.props.country === 'ca') {
      return this.renderLocation(this.props)
    } else{
      return this.renderDefault(this.props)
    }
  }

  render() {
    return this.renderPaddMapPiece()
  }
}

const mapStateToProps = (state, props) => ({
  arrangeBy: arrangeBy(state, props),
  bins: binSelector(state, props),
  Padd: PaddSelector(state, props),
  TRSelector: TRSelector(state, props),
  confidentialityMenu: state.confidentialityMenu,
  selectedEnergy: state.importExportVisualization,
})

export default connect(mapStateToProps)(PaddLayout)
