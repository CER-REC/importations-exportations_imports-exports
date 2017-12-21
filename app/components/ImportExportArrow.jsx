const React = require('react')

class ImportExportArrow extends React.Component {

  render() {
    //1. get arrow SVG
    //2. fill color
    //3. resize arrow
    //4. relocate arrow
    
    //5. rotate if needed
    let transform = 'rotate(0)'
    if(this.props.arrowPosition == 'down'){
        transform = 'rotate(180)'
    }

    return <polygon fill = {this.props.color} 
                    transform = {transform}
                    points = "30.46 4.09 15.17 11.38 0 4.07 0 3.41 2.75 3.41 2.76 0.01 28.03 0 28.05 3.41 30.47 3.42 30.46 4.09"/>

  }
}

module.exports = ImportExportArrow