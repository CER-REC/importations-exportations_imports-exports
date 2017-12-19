const Immutable = require('immutable')

const DataLoader = Immutable.fromJS({
  electricity:{
    ca:{
      YT: {
        name: 'YT',
        importData: 299,
        exportData: 99
      },
      NT: {
        name: 'NT',
        importData: 400,
        exportData: 99998
      },
      NU: {
        name: 'NU',
        importData: 1000,
        exportData: 999998
      },
      NF: {
        name: 'NF',
        importData: 50,
        exportData: 10999998
      },
      PE: {
        name: 'PE',
        importData: 220,
        exportData: 20000010
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
        importData: 1015,
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
    },
    us: {
      VT: { name: 'VT', importData: 10, exportData: 20 },
      ME: { name: 'ME', importData: 11, exportData: 20 },
      AK: { name: 'AK', importData: 20, exportData: 10},
      WA: { name: 'WA', importData: 10105, exportData:10 },
      MT: { name: 'MT', importData: 223, exportData:10 },
      ND: { name: 'ND', importData: 332, exportData:10 },
      MN: { name: 'MN', importData: 43210, exportData:10 },
      WI: { name: 'WI', importData: 532, exportData:10 },
      MI: { name: 'MI', importData: 732, exportData:10 },
      NY: { name: 'NY', importData: 932, exportData:10 },
      MA: { name: 'MA', importData: 100203, exportData:10 },
      NH: { name: 'NH', importData: 10103, exportData:10 },
      ID: { name: 'ID', importData:22310, exportData: 2 },
      WY: { name: 'WY', importData:323, exportData: 2 },
      SD: { name: 'SD', importData:41023, exportData: 2 },
      IA: { name: 'IA', importData:51023, exportData: 2 },
      IL: { name: 'IL', importData:632, exportData: 2 },
      IN: { name: 'IN', importData:71056, exportData: 2 },
      OH: { name: 'OH', importData:8632, exportData: 2 },
      PA: { name: 'PA', importData:932, exportData: 2 },
      NJ: { name: 'NJ', importData:10023, exportData: 2 },
      RI: { name: 'RI', importData:101023, exportData: 2 },
      HI: { name: 'HI', importData: 2023 , exportData: 3 },
      OR: { name: 'OR', importData: 10456 , exportData: 3 },
      NV: { name: 'NV', importData: 210532 , exportData: 3 },
      CO: { name: 'CO', importData: 31023 , exportData: 3 },
      NE: { name: 'NE', importData: 41032 , exportData: 3 },
      MO: { name: 'MO', importData: 53102 , exportData: 3 },
      KY: { name: 'KY', importData: 63210 , exportData: 3 },
      WV: { name: 'WV', importData: 72310 , exportData: 3 },
      VA: { name: 'VA', importData: 8103 , exportData: 3 },
      MD: { name: 'MD', importData: 92310 , exportData: 3 },
      CT: { name: 'CT', importData: 1002310 , exportData: 3 },
      CA: { name: 'CA', importData: 21032 , exportData: 4 },
      UT: { name: 'UT', importData: 31023 , exportData: 4 },
      OK: { name: 'OK', importData: 4532, exportData: 4 },
      KS: { name: 'KS', importData: 6230 , exportData: 4 },
      AR: { name: 'AR', importData: 7023 , exportData: 4 },
      TN: { name: 'TN', importData: 810456 , exportData: 4 },
      NC: { name: 'NC', importData: 923105 , exportData: 4 },
      SC: { name: 'SC', importData: 1002310 , exportData: 4 },
      DE: { name: 'DE', importData: 10101032 , exportData: 4 },
      AZ: { name: 'AZ', importData: 43102 , exportData: 5 },
      NM: { name: 'NM', importData: 51032 , exportData: 5 },
      LA: { name: 'LA', importData: 63102 , exportData: 5 },
      MS: { name: 'MS', importData: 73210 , exportData: 5 },
      AL: { name: 'AL', importData: 82310 , exportData: 5 },
      GA: { name: 'GA', importData: 91032 , exportData: 5 },
      TX: { name: 'TX', importData: 53102 , exportData: 6 },
      FL: { name: 'FL', importData: 91023 , exportData: 6 },
    }
  }
})

module.exports = DataLoader