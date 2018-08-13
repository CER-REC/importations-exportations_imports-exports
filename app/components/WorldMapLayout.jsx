import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import PropTypes from 'prop-types'

import MapPiece from './MapPiece'
import MapLayoutGridConstant from '../MapLayoutGridConstant'
import Constants from '../Constants'
import Tr from '../TranslationTable'
import TrSelector from '../selectors/translate'
import { visualizationSettings } from '../selectors/visualizationSettings'

import { setSelection } from '../actions/visualizationSettings'
import './ElectricityMapLayout.scss'

import { getMapLayout } from '../selectors/worldMapLayout'
import { binSelector } from '../selectors/data'

import { handleInteractionWithTabIndex, analyticsReporter } from '../utilities'

const emptyMap = new Immutable.Map()

const mapPieceTransformStartXaxis = (position, dimensions, mapPieceScale) =>
  position.get('x') *
    ((mapPieceScale * dimensions.get('width')) + dimensions.get('xAxisPadding'))
const mapPieceTransformStartYaxis = (position, dimensions, mapPieceScale) =>
  position.get('y') *
    ((mapPieceScale * dimensions.get('height')) + dimensions.get('yAxisPadding'))

class WorldMapLayout extends React.Component {
  static propTypes = {
    selection: PropTypes.instanceOf(Immutable.Map).isRequired,
    onMapPieceClick: PropTypes.func.isRequired,
    layout: PropTypes.instanceOf(Immutable.Map).isRequired,
    bins: PropTypes.instanceOf(Immutable.List).isRequired,
    Tr: PropTypes.func.isRequired,
    unit: PropTypes.string.isRequired,
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
  }

  onClick = (country, continentKey) => {
    const { selection } = this.props
    let continents = [continentKey]
    if (selection.get('country') === country) {
      const originKeyExists = selection.get('continents').indexOf(continentKey)
      if (originKeyExists === -1) {
        continents = selection.get('continents').concat(continentKey)
      } else {
        continents = selection.get('continents').delete(originKeyExists)
      }
    }
    /** Analytics reporting: start */
    const eventDetail = `${continentKey}`
    analyticsReporter(
      Constants.getIn(['analytics', 'category', 'mapPiece']),
      Constants.getIn(['analytics', 'action', 'clicked']),
      eventDetail,
    )
    /** Analytics reporting: Finish */
    const filteredData = Constants.getIn(['dataloader', 'mapping', 'continent']).filter(point => continents.includes(point))
    const origins = filteredData.keySeq().toArray()
    this.props.onMapPieceClick({
      country,
      continents,
      origins,
    })
  }
  isMapPieceSelected(key, country) {
    const isSelected = this.props.selection.get('continents').indexOf(key)
    if (isSelected !== -1) { return true }
    return this.props.selection.getIn(['destinations', country], new Immutable.List()).has(key)
  }
  isSelected() {
    const length = this.props.selection.get('continents').count()
    return (length > 0)
  }

  renderMapPiece() {
    // Data from constant file
    const type = 'crudeOilImports'

    // fetching nested values
    const mapLayoutGrid = MapLayoutGridConstant.getIn([type, this.props.country])
    const dimensions = mapLayoutGrid.get('dimensions')
    let styles = mapLayoutGrid.get('styles')
    const { layout } = this.props
    let mapPieceScale = mapLayoutGrid.get('mapPieceScale')

    const isSelected = this.isSelected()
    return layout
      .get('tilePositions')
      .sortBy((_, key) => key)
      .map((position, key) => {
        const humanName = this.props.Tr(['country', this.props.country, key])
        const value = layout.getIn(['values', key], emptyMap)
        if (key === 'otherCountries') {
          mapPieceScale = mapLayoutGrid.get('mapPieceScaleVariant')
          styles = mapLayoutGrid.get('stylesVariant')
        }
        if (key === 'southAmerica') {
          mapPieceScale = mapLayoutGrid.get('mapPieceScale')
          styles = mapLayoutGrid.get('styles')
        }
        return (
          <g key={`mapPieceKey_${this.props.country}_${key}`}>
            <g
              className="mappiece"
              {...handleInteractionWithTabIndex(
                layout.getIn(['tabIndexes', key]),
                this.onClick,
                this.props.country,
                key,
              )}
              aria-label={this.props.Tr(
                'mapTileLabel',
                humanName,
                value.get('imports', 0).toLocaleString(),
                value.get('exports', 0).toLocaleString(),
                this.props.unit,
              )}
            >
              <MapPiece
                value={value}
                confidential={layout.getIn(['confidential', key], emptyMap)}
                missing={layout.getIn(['missing', key], emptyMap)}
                totalPoints={layout.getIn(['totalPoints', key], emptyMap)}
                tilePosition={layout.getIn(['tilePositions', key], emptyMap)}
                dimensions={dimensions}
                legends={MapLayoutGridConstant.getIn([type, 'legends'])}
                bins={this.props.bins}
                styles={styles}
                scaleMappiece={mapPieceScale}
                isMapPieceSelected={this.isMapPieceSelected(key, this.props.country)}
                isSelected={isSelected}
                mapPieceStyleClass="mapPieceText"
                overrideArroWPosition
                overrideTextPosition
                isOrigin={(this.props.selection.get('country') === this.props.country)}
                x1={mapPieceTransformStartXaxis(position, dimensions, mapPieceScale)}
                y1={mapPieceTransformStartYaxis(position, dimensions, mapPieceScale)}
                containerX={this.props.left}
                containerY={this.props.top}
                country={this.props.country}
                name={humanName}
              />
            </g>
          </g>
        )
      })
      .toArray()
  }
  render() {
    return (
      <g>
        {this.renderMapPiece()}
      </g>
    )
  }
}

const mapDispatchToProps = { onMapPieceClick: setSelection }

const mapStateToProps = (state, props) => ({
  layout: getMapLayout(state, props),
  selection: visualizationSettings(state, props).get('selection'),
  bins: binSelector(state, props),
  Tr: TrSelector(state, props),
  unit: visualizationSettings(state, props).get('amount'),
  viewport: state.viewport,
})

export default connect(mapStateToProps, mapDispatchToProps)(WorldMapLayout)
