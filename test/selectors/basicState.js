import { fromJS } from 'immutable'

export default {
  importExportVisualization: 'electricity',
  visualizationSettings: {
    electricity: fromJS({
      arrangeBy: 'location',
      amount: 'MW.h',
      activity: 'imports',
    }),
  },
  data: fromJS({
    electricity: {
      'MW.h': [
        { test: true },
      ],
      CAN$: [
        { test: false },
      ],
    },
    crudeOil: {
      'thousand m3/d': [
        { run: 'away' },
      ],
    },
  }),
}
