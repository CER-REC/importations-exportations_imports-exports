const React = require('react')

class ImportExportArrow extends React.Component {

  render() {
    let transform = 'rotate(0)'
    if(this.props.type == 'import'){
        transform = `rotate(180, 18.5, ${this.props.arrowSpacing})`
    }
    transform = transform +' scale(1.2)'

    return <polygon fill = {this.props.color} 
                    transform = {transform}
                    points = "30.46 4.09 15.17 11.38 0 4.07 0 3.41 2.75 3.41 2.76 0.01 28.03 0 28.05 3.41 30.47 3.42 30.46 4.09"/>

  }
}

module.exports = ImportExportArrow