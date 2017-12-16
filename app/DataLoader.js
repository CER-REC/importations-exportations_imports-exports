const Immutable = require('immutable')

const DataLoader = Immutable.fromJS({
  electricity:{
    ca:{
      YT: {
        name: 'YT',
        importData: 299,
        exportData: 4987
      },
      NT: {
        name: 'NT',
        importData: 400,
        exportData: 7895
      },
      NU: {
        name: 'NU',
        importData: 100,
        exportData: 3658
      },
      NF: {
        name: 'NF',
        importData: 50,
        exportData: 6985
      },
      PE: {
        name: 'PE',
        importData: 220,
        exportData: 4785
      },
      BC: {
        name: 'BC',
        importData: 300,
        exportData: 3659
      },
      NS: {
        name: 'NS',
        importData: 440,
        exportData: 4875
      },
      SK: {
        name: 'SK',
        importData: 290,
        exportData: 4596
      },
      MB: {
        name: 'MB',
        importData: 520,
        exportData: 549
      },
      ON: {
        name: 'ON',
        importData: 115,
        exportData: 1324
      },
      QC: {
        name: 'QC',
        importData: 78,
        exportData: 4689
      },
      NB: {
        name: 'NB',
        importData: 98,
        exportData: 1354
      },
      AB: {
        name: 'AB',
        importData: 25,
        exportData: 1548
      }
    }
  }
})

module.exports = DataLoader