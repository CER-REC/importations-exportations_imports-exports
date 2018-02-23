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

import { handleInteraction } from '../utilities'

import ElectricitySelector from '../selectors/ElectricitySelector'
import { arrangeBy, binSelector, sortAggregatedLocationsSelector, selection } from '../selectors/data'
import { setSelection } from '../actions/visualizationSettings'

const mapPieceTransformStartTop = (top, position, dimensions, mapPieceScale) => top + (position.get('y') * ((mapPieceScale * dimensions.get('height')) + dimensions.get('yAxisPadding')))
const mapPieceTransformStartLeft = (left, position, dimensions, mapPieceScale) => left + (position.get('x') * ((mapPieceScale * dimensions.get('width')) + dimensions.get('xAxisPadding')))

class PaddLayout extends React.Component {
  static propTypes = {
    arrangeBy: PropTypes.string.isRequired,
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    confidentialityMenu: PropTypes.bool.isRequired,
    selectedEnergy: PropTypes.string.isRequired,
  }
  getColorIndex(value){
    return this.props.bins.findIndex(range => range.get(0) <= value && value < range.get(1))
  }
  getPaddColor(value) {
    if (value === -1) { return '#fff' }
    const index = this.getColorIndex(value)
    return Constants.getIn(
      ['styleGuide', 'exportColours', index],
      Constants.getIn(['styleGuide', 'colours', 'ExportDefault']),
    )
  }
  getArrow(orderBy, paddGroupId, left, top, color, confidentialCount = 0, totalCount) {
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

    let paddVCrudeOilconfidentialIcon = null
    let paddVCrudeOilcontainerX = this.props.left + left - 72
    let paddVCrudeOilcontainerY = this.props.top + top - 66
    if (this.props.arrangeBy === 'exports') {
      paddVCrudeOilcontainerX = this.props.left + left + 393
      paddVCrudeOilcontainerY = this.props.top + top + 123
    }
    const style = mapLayoutGrid.get('styles', false)
    if (style && confidentialCount > 0 && country !== 'ca'
      && this.props.confidentialityMenu
      && this.props.selectedEnergy === 'crudeOil'
      && paddGroupId === 'PADD V') {
      paddVCrudeOilconfidentialIcon = (<g transform="translate(145 143)">
        <ConfidentialIcon
          styles={style.get('confidentialStyle')}
          text={`${confidentialCount} / ${totalCount} values confidential`}
          containerX={paddVCrudeOilcontainerX}
          containerY={paddVCrudeOilcontainerY}
          lineX={102}
          lineY={40}
          textX={40}
          textY={40}
          xPosition={30}
          yPosition={0}
          name="paddVCrudeOilConfidentiality"
        />
      </g>)
    }

    let paddIIICrudeOilconfidentialIcon = null
    let paddIIICrudeOilcontainerX = this.props.left + left + 100
    let paddIIICrudeOilcontainerY = this.props.top + top - 66
    if (this.props.arrangeBy === 'exports') {
      paddIIICrudeOilcontainerX = this.props.left + left + 504
      paddIIICrudeOilcontainerY = this.props.top + top + 123
    }
    if (style && confidentialCount > 0 && country !== 'ca'
      && this.props.confidentialityMenu
      && this.props.selectedEnergy === 'crudeOil'
      && paddGroupId === 'PADD III') {
      paddIIICrudeOilconfidentialIcon = (<g transform="translate(145 143)">
        <ConfidentialIcon
          styles={style.get('confidentialStyle')} 
          text={`${confidentialCount} / ${totalCount} values confidential`}
          containerX={paddIIICrudeOilcontainerX}
          containerY={paddIIICrudeOilcontainerY}
          lineX={102}
          lineY={40}
          textX={40}
          textY={40}
          xPosition={30}
          yPosition={0}
          name="paddIIICrudeOilConfidentiality"
        />
      </g>)
    }

    let paddICrudeOilconfidentialIcon = null
    let paddICrudeOilcontainerX = this.props.left + left + 245
    let paddICrudeOilcontainerY = this.props.top + top - 66
    if (this.props.arrangeBy === 'exports') {
      paddICrudeOilcontainerX = this.props.left + left + 277
      paddICrudeOilcontainerY = this.props.top + top + 123
    }
    if (style && confidentialCount > 0 && country !== 'ca'
      && this.props.confidentialityMenu
      && this.props.selectedEnergy === 'crudeOil'
      && paddGroupId === 'PADD I') {
      paddICrudeOilconfidentialIcon = (<g transform="translate(145 143)">
        <ConfidentialIcon
          styles={style.get('confidentialStyle')} 
          text={`${confidentialCount} / ${totalCount} values confidential`}
          containerX={paddICrudeOilcontainerX}
          containerY={paddICrudeOilcontainerY}
          lineX={102}
          lineY={40}
          textX={40}
          textY={40}
          xPosition={30}
          yPosition={0}
          name="paddICrudeOilConfidentiality"
        />
      </g>)
    }

    let paddNonUSACrudeOilconfidentialIcon = null
    let paddNonUSACrudeOilcontainerX = this.props.left + left + 405
    let paddNonUSACrudeOilcontainerY = this.props.top + top - 140
    if (this.props.arrangeBy === 'imports' || this.props.arrangeBy === 'exports') {
      paddNonUSACrudeOilcontainerX = this.props.left + left + 603
      paddNonUSACrudeOilcontainerY = this.props.top + top + 123
    }
    if (style && confidentialCount > 0 && country !== 'ca'
      && this.props.confidentialityMenu
      && this.props.selectedEnergy === 'crudeOil'
      && paddGroupId === 'Non-USA') {
      paddNonUSACrudeOilconfidentialIcon = (<g transform="translate(145 143)">
        <ConfidentialIcon
          styles={style.get('confidentialStyle')}
          text={`${confidentialCount} / ${totalCount} values confidential`}
          containerX={paddNonUSACrudeOilcontainerX}
          containerY={paddNonUSACrudeOilcontainerY}
          lineX={102}
          lineY={40}
          textX={40}
          textY={40}
          xPosition={30}
          yPosition={0}
          name="paddNonUSACrudeOilConfidentiality"
        />
      </g>)
    }


    let paddIIINGLconfidentialIcon = null
    let paddIIINGLcontainerX = this.props.left + left + 182
    let paddIIINGLcontainerY = this.props.top + top - 49
    if (this.props.arrangeBy === 'imports' || this.props.arrangeBy === 'exports') {
      paddIIINGLcontainerX = this.props.left + left + 568
      paddIIINGLcontainerY = this.props.top + top + 69
    }
    if (style && confidentialCount > 0 && country !== 'ca'
      && this.props.confidentialityMenu
      && this.props.selectedEnergy === 'naturalGasLiquids'
      && paddGroupId === 'PADD III') {
      paddIIINGLconfidentialIcon = (<g transform="translate(145 143)">
        <ConfidentialIcon
          styles={style.get('confidentialStyle')}
          text={`${confidentialCount} / ${totalCount} values confidential`}
          containerX={paddIIINGLcontainerX}
          containerY={paddIIINGLcontainerY}
          lineX={102}
          lineY={40}
          textX={40}
          textY={40}
          xPosition={30}
          yPosition={0}
          name="paddIIINGLConfidentiality"
        />
      </g>)
    }

    let paddIVNGLconfidentialIcon = null
    let paddIVNGLcontainerX = this.props.left + left + 9
    let paddIVNGLcontainerY = this.props.top + top - 320
    if (this.props.arrangeBy === 'imports' || this.props.arrangeBy === 'exports') {
      paddIVNGLcontainerX = this.props.left + left + 443
      paddIVNGLcontainerY = this.props.top + top + 69
    }
    if (style && confidentialCount > 0 && country !== 'ca'
      && this.props.confidentialityMenu
      && this.props.selectedEnergy === 'naturalGasLiquids'
      && paddGroupId === 'PADD IV') {
      paddIVNGLconfidentialIcon = (<g transform="translate(145 143)">
        <ConfidentialIcon
          styles={style.get('confidentialStyle')}
          text={`${confidentialCount} / ${totalCount} values confidential`}
          containerX={paddIVNGLcontainerX}
          containerY={paddIVNGLcontainerY}
          lineX={102}
          lineY={40}
          textX={40}
          textY={40}
          xPosition={30}
          yPosition={0}
          name="paddIVNGLConfidentiality"
        />
      </g>)
    }

    let paddVNGLconfidentialIcon = null
    let paddVNGLcontainerX = this.props.left + left - 7
    let paddVNGLcontainerY = this.props.top + top - 50
    if (this.props.arrangeBy === 'imports' || this.props.arrangeBy === 'exports') {
      paddVNGLcontainerX = this.props.left + left + 318
      paddVNGLcontainerY = this.props.top + top + 69
    }
    if (style && confidentialCount > 0 && country !== 'ca'
      && this.props.confidentialityMenu
      && this.props.selectedEnergy === 'naturalGasLiquids'
      && paddGroupId === 'PADD V') {
      paddVNGLconfidentialIcon = (<g transform="translate(145 143)">
        <ConfidentialIcon
          styles={style.get('confidentialStyle')}
          text={`${confidentialCount} / ${totalCount} values confidential`}
          containerX={paddVNGLcontainerX}
          containerY={paddVNGLcontainerY}
          lineX={102}
          lineY={40}
          textX={40}
          textY={40}
          xPosition={30}
          yPosition={0}
          name="paddVNGLConfidentiality"
        />
      </g>)
    }

    let paddMexicoNGLconfidentialIcon = null
    let paddMexicoNGLcontainerX = this.props.left + left + 477
    let paddMexicoNGLcontainerY = this.props.top + top - 125
    if (this.props.arrangeBy === 'imports' || this.props.arrangeBy === 'exports') {
      paddMexicoNGLcontainerX = this.props.left + left + 687
      paddMexicoNGLcontainerY = this.props.top + top + 69
    }
    if (style && confidentialCount > 0 && country !== 'ca'
      && this.props.confidentialityMenu
      && this.props.selectedEnergy === 'naturalGasLiquids'
      && paddGroupId === 'Mexico') {
      paddMexicoNGLconfidentialIcon = (<g transform="translate(145 143)">
        <ConfidentialIcon
          styles={style.get('confidentialStyle')}
          text={`${confidentialCount} / ${totalCount} values confidential`}
          containerX={paddMexicoNGLcontainerX}
          containerY={paddMexicoNGLcontainerY}
          lineX={102}
          lineY={40}
          textX={40}
          textY={40}
          xPosition={30}
          yPosition={0}
          name="paddMexicoConfidentiality"
        />
      </g>)
    }

    let canadaconfidentialIcon = null
    if (style && confidentialCount > 0 && country === 'ca'
      && this.props.confidentialityMenu) {
      canadaconfidentialIcon = (<g transform="translate(145 143)">
        <ConfidentialIcon
          styles={style.get('confidentialStyle')}
          text={`${confidentialCount} / ${totalCount} values confidential`}
          containerX={this.props.left + left + 140}
          containerY={this.props.top + top - 7}
          lineX={102}
          lineY={40}
          textX={40}
          textY={40}
          xPosition={36}
          yPosition={12}
          name="canadaConfidentiality"
        />
      </g>)
    }

    return (<g className={fontClassName} transform={`translate(${left + transformTranslate.get('left')} ${top + transformTranslate.get('top')})`}>
      <text transform={`translate(${transformText.get('left')} ${transformText.get('top')})`}>{text}</text>
      <polygon fill={color} transform="translate(0 140)" points="149.98 18.68 168.81 26.14 187.48 18.66 187.48 17.99 184.09 17.99 184.08 14.51 152.98 14.5 152.95 17.99 149.98 17.99 149.98 18.68" />
      {paddVCrudeOilconfidentialIcon}
      {paddIIICrudeOilconfidentialIcon}
      {paddICrudeOilconfidentialIcon}
      {paddNonUSACrudeOilconfidentialIcon}

      {paddIIINGLconfidentialIcon}
      {paddIVNGLconfidentialIcon}
      {paddVNGLconfidentialIcon}
      {paddMexicoNGLconfidentialIcon}

      {canadaconfidentialIcon}
            </g>)
  }

  getOpacityOfPadd(props, paddGroup){
    if(props.country !== props.selctionState.get('country')){return 1}
    if(props.selctionState.get('origins').count() === 0){return 1}
    return props.selctionState.get('origins').includes(paddGroup)? 1 : 0.5
  }

  onPaddClick( props, paddGroup ) {
    const { selctionState } = props
    let origins = []
    let country = props.country
    if (selctionState.get('country') === country) {
      const paddGroupExists = selctionState.get('origins').indexOf(paddGroup)
      if (paddGroupExists === -1) {
        origins = selctionState.get('origins').push(paddGroup).toJS()
      } else {
        origins = selctionState.get('origins').delete(paddGroupExists)
        if(origins.count() === 0){
          country = null
        }
      }
    } else {
      origins = [paddGroup]
    }

    props.savePaddState({
      country,
      origins,
    })
  }

  renderDefault(props) {
    const paddData = Array
      .from(props.Padd)
      .sort((a, b) => b[1].get('value') - a[1].get('value'))
    let left = 0
    const paddingBetweenSortedElement = 80
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
          paddLayout = (<g className="paddLayout" fillOpacity={this.getOpacityOfPadd(props, paddGroup)}  key={`${props.arrangeBy}_${currentValue[1].get('destination')}`} transform={`translate(${left} 0)`}
              {...handleInteraction(this.onPaddClick, props, paddGroup)}
            >
            {paddLayout}
            { this.getArrow(props.arrangeBy, paddGroup, 0, 0, color, currentValue[1].get('confidentialCount', 0), currentValue[1].get('totalCount'), 0) }
          </g>)
          acc.push(paddLayout)
          left += paddingBetweenSortedElement
        }
      }

      return acc
    }, [])
    return layout
  }
  getMapPieceTextColor(value){
    const index = this.getColorIndex(value)
    switch(index){
      case 2:
      case 3:
      case 4:
        return 'mapPieceWhiteText'
      default: 
        return 'mapPieceText'
    }
  }
  renderLocation(props) {
    const mapLayoutGrid = MapLayoutGridConstant.getIn(['PaddLayout', props.country])
    const dimensions = mapLayoutGrid.get('dimensions')
    const styles = mapLayoutGrid.get('styles')
    const mapPieceScale = mapLayoutGrid.get('mapPieceScale')
    const layout = mapLayoutGrid.get('layout').filter(point => point.get('paddGroup') === props.paddGroup)
    const paddGroup = Constants.getIn(['dataloader', 'mapping', 'padd', props.country, props.paddGroup])
    const data = props.Padd.get(paddGroup)
    if(data){
    const color = this.getPaddColor(data.get('value'))
    return (<g className="paddLayout" fillOpacity={this.getOpacityOfPadd(props, paddGroup)}
      {...handleInteraction(this.onPaddClick, props, paddGroup)}
        >
        <filter id="paddOutline">
          <feMorphology operator="dilate" in="SourceAlpha" radius="1.5"/>
          <feColorMatrix result="recolored" type="matrix" values="-1 0 0 1 0, 0 -1 0 1 0, 0 0 -1 1 0, 0 0 0 1 0"/>
          <feMerge>
            <feMergeNode in="recolored"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <g filter="url(#paddOutline)" >
        {layout.map((position, key) => (
          <PaddMapPiece
            key={`paddLayout_${props.country}_${position.get('name')}`}
            originKey={position.get('originKey')}
            dimensions={dimensions}
            styles={styles}
            color={color}
            left={mapPieceTransformStartLeft(props.left, position, dimensions, mapPieceScale)}
            top={mapPieceTransformStartTop(props.top, position, dimensions, mapPieceScale)}
            mapPieceStyleClass={this.getMapPieceTextColor(data.get('value'))}
            isLabelRquired={props.arrangeBy === 'location'}
          />
        ))}
        </g>
        {this.getArrow(
        this.props.arrangeBy,
        this.props.paddGroup,
        this.props.left,
        this.props.top,
        color,
        data.get('confidentialCount', 0),
        data.get('totalCount', 0),
      )}
    </g>)
    }
    return null
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

const mapDispatchToProps = { savePaddState: setSelection }

const mapStateToProps = (state, props) => ({
  selctionState: selection(state, props),
  arrangeBy: arrangeBy(state, props),
  bins: binSelector(state, props),
  Padd: PaddSelector(state, props),
  TRSelector: TRSelector(state, props),
  confidentialityMenu: state.confidentialityMenu,
  selectedEnergy: state.importExportVisualization,
  expandCollapseConfidentiality: state.expandCollapseConfidentiality,
})

export default connect(mapStateToProps, mapDispatchToProps)(PaddLayout)
