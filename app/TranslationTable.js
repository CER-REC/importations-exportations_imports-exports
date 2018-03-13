import { fromJS } from 'immutable'

const TranslationTable = fromJS({
  theLegendValues: {
    importations: {
      en: 'IMP',
      fr: 'IMP.',
    },
    exportations: {
      en: 'EXP',
      fr: 'EXP.',
    },
  },

  socialBar: {
    aboutThisProject: {
      en: 'About this project',
      fr: 'Le projet',
    },
    methodology: {
      en: 'Methodology',
      fr: 'Méthodologie',
    },
    resetVisualization: {
      en: 'Reset Visualization',
      fr: 'Réinitialisation de la visualisation',
    },
  },

  methodologyLinks: {
    en: 'data/Export-Import-Data-Methodology-EN.pdf',
    fr: 'data/Export-Import-Data-Methodology-FR.pdf',
  },

  aboutWindow: {
    heading: {
      en: 'ABOUT THIS PROJECT',
      fr: 'LE PROJET',
    },
    p1: {
      en: 'This online tool portrays imports and exports of energy products to and from Canada. It is part of the National Energy Board’s (NEB) Data Visualization Initiative (DVI). The DVI is a three-year initiative to transform how the NEB structures and shares data. The objective is to enable evidence-based decision making and remove barriers to understanding Canada’s energy and pipeline systems through the use of user-friendly interactive visualizations.',
      fr: 'Cet outil en ligne trace un portrait des importations au Canada et des exportations du Canada des produits énergétiques. Il fait partie de l’initiative de visualisation des données de l’Office national de l’énergie. Échelonnée sur trois ans, cette initiative vise à transformer la manière dont l’Office structure et diffuse ses données. Elle a pour objectif de favoriser un processus décisionnel fondé sur la preuve et de faciliter la compréhension des questions liées aux réseaux énergétiques et pipeliniers du Canada, grâce à des visualisations interactives, faciles à utiliser.',
    },
    p2: {
      en: 'This visualization show quarterly energy trade data between Canada and the USA since 1985, with the exception of electricity data which is available back to 1990.',
      fr: 'Cette visualisation présente les données trimestrielles sur le commerce de l’énergie entre le Canada et les États-Unis depuis 1985, à l’exception des données concernant l’électricité, qui ne sont disponibles que depuis 1990.',
    },
    p3: {
      en: 'If you want to use the data for research and undertake your own review, all the data is downloadable and shareable. The chart images are also downloadable, and if you are interested in the source code for the visualizations, it is available on the government’s Open Government portal:',
      fr: 'Si vous souhaitez utiliser les données pour vos recherches ou pour en faire votre propre analyse, vous pouvez les télécharger et les partager. Il en est de même pour les graphiques. Quant au code source des visualisations, il est accessible sur le portail du « gouvernement ouvert » à l’adresse',
    },
    governmentPortalLink: {
      en: 'open.canada.ca',
      fr: 'ouvert.canada.ca',
    },
    p4: {
      en: 'We hope we are hitting the mark. Your feedback is essential.',
      fr: 'Nous espérons avoir atteint notre objectif. Votre rétroaction est essentielle.',
    },
    p5_1: {
      en: 'Email us with your comments and ideas:  ',
      fr: 'Vous pouvez nous la faire parvenir, ainsi que vos suggestions, à l’adresse ',
    },
    emailLink: {
      en: 'energyindesign@neb-one.gc.ca',
      fr: 'conceptionenergie@neb-one.gc.ca',
    },
    p5_2: {
      en: '. We look forward to hearing from you.',
      fr: '. Votre opinion compte.',
    },
    contributors: {
      en: 'CONTRIBUTORS',
      fr: 'LES CONTRIBUTEURS',
    },
    dataSource: {
      en: 'DATA SOURCE',
      fr: 'SOURCE DES DONNÉES',
    },
    dataNamesfromNEB: {
      en: 'Paul Mortenson',
      fr: 'Paul Mortenson',
    },
    coordination: {
      en: 'COORDINATION',
      fr: 'COORDINATION',
    },
    nebCoordinators: {
      en: 'Annette Hester (Concept and Coordination); Katherine Murphy (Project Manager)',
      fr: 'Annette Hester (concept et conception et coordination); Katherine Murphy (gestionnaire de projet)',
    },
    dataVisualization: {
      en: 'DATA VISUALIZATION',
      fr: 'VISUALISATION DES DONNÉES',
    },
    leadDesignResearch: {
      en: 'LEAD DESIGN RESEARCH',
      fr: 'RECHERCH CONCEPTUELLE SOUS LA DIRECTION',
    },
    leadDesigners: {
      en: 'Sheelagh Carpendale and Wesley Willett, iLab, University of Calgary.',
      fr: 'Sheelagh Carpendale et Wesley Willett, iLab, Université de Calgary',
    },
    design: {
      en: 'DESIGN',
      fr: 'CONCEPTION',
    },
    designers: {
      en: 'Bon Adriel Aseniero, Peter Buk, Søren Knudsen, Doris Kosminsky, Claudia Maurer, Lien Quach, Jo Vermeulen, Jagoda Walny Nix, and Mieka West.',
      fr: 'Bon Adriel Aseniero, Peter Buk, Søren Knudsen, Doris Kosminsky, Claudia Maurer, Lien Quach, Jo Vermeulen, Jagoda Walny Nix, et Mieka West.',
    },
    leadTechnical: {
      en: 'LEAD TECHNICAL',
      fr: 'CHEF TECHNIQUE',
    },
    vizworx: {
      en: 'VizworX Inc.',
      fr: 'VizworX Inc.',
    },
    technical: {
      en: 'TECHNICAL',
      fr: 'PERSONNEL TECHNIQUE',
    },
    technicalTeam: {
      en: 'Spenser Jones, Charlie Cheung, Rahul Kamal Bhaskar, Patrick King, Andy LePage and Ben Cousins',
      fr: 'Spenser Jones, Charlie Cheung, Rahul Kamal Bhaskar, Patrick King, Andy LePage et Ben Cousins',
    },
    attributions: {
      en: 'ATTRIBUTIONS',
      fr: 'LICENCES DE TIERS',
    },
    map: {
      en: 'MAP',
      fr: 'CARTE',
    },
    map_1: {
      en: 'Map showing provinces and territories reporting 2009 swine flu (H1N1) cases in Canada by Fonadier ',
      fr: 'Carte produite par Fonadier illustrant les provinces et territoires selon les signalements de cas de grippe A (H1N1), tirée de',
    },
    map_2: {
      en: 'Wikimedia Commons',
      fr: 'Wikimedia Commons',
    },
    map_3: {
      en: ' (Re-coloured and rotated from original.)',
      fr: ' (L’original a été recoloré et pivoté.)',
    },
    closeWindow: {
      en: 'Close About Window',
      fr: 'Close About Window',
    },
  },

  dataDownloadModal: {
    title: {
      en: 'DATA DOWNLOAD',
      fr: 'TÉLÉCHARGEMENT DE DONNÉES',
    },
    subtext: {
      en: 'The data used to create this visualization is open data available for you to download. Click the icon to save the data file to your computer.',
      fr: "Les données pour cette visualisation sont disponibles au public. Cliquer l'icône pour les télécharger sur le vote appareil.",
    },
  },

  mainMenuBar: {
    electricity: {
      en: 'Electricity',
      fr: 'Électricité',
    },
    crudeOil: {
      en: 'Crude Oil',
      fr: 'Pétrole brut',
    },
    naturalGas: {
      en: 'Natural Gas',
      fr: 'Gaz naturel',
    },
    naturalGasLiquids: {
      en: 'Natural Gas Liquids',
      fr: 'Liquides de gaz naturel',
    },
    refinedPetroleumProducts: {
      en: 'Refin. Petroleum Prod.',
      fr: 'Prod. pétroliers rafinn.',
    },
  },

  importExportMenu: {
    imports: {
      en: 'IMPORTS',
      fr: 'IMPORTATIONS',
    },
    and: {
      en: 'and',
      fr: 'et',
    },
    exports: {
      en: 'EXPORTS',
      fr: 'EXPORTATIONS',
    },
    importsOnly: {
      en: 'IMPORTS only',
      fr: 'IMPORTATIONS seulement',
    },
    exportsOnly: {
      en: 'EXPORTS only',
      fr: 'EXPORTATIONS seulement',
    },
  },

  menu: {
    and: {
      en: 'and',
      fr: 'et',
    },

    /* TODO: We can't translate 'of' this way. It needs to be...
    d'Électricité
    de Pétrole brut
    de Gaz naturel
    de Liquides de gaz naturel
    de Prod. pétroliers rafinn.
    */

    of: {
      en: 'of',
      fr: 'd’',
    },
    activity: {
      options: {
        imports: {
          en: 'Imports',
          fr: 'Importations',
        },
        exports: {
          en: 'Exports',
          fr: 'Exportations',
        },
        importsExports: {
          en: 'Imports and Exports',
          fr: 'Importations et exportations',
        },
        importsForReexport: {
          en: 'Temporary Imports',
          fr: 'Importations temporaires',
        },
        exportsForReimport: {
          en: 'Temporary Exports',
          fr: 'Exportations temporaires',
        },
      },
    },
    arrangeBy: {
      prefix: {
        en: 'arranged by',
        fr: 'selon le',
      },
      options: {
        location: {
          en: 'LOCATION',
          fr: 'LIEU',
        },
        imports: {
          en: 'MOST IMPORTS',
          fr: 'PLUS D’IMPORTATIONS',
        },
        exports: {
          en: 'MOST EXPORTS',
          fr: 'PLUS D’EXPORTATIONS',
        },
        amount:{
          en: 'AMOUNT',
          fr: 'QUANTITÉ',
        },
        stack: {
          en: 'STACK',
          fr: 'GRAPHIQUE UNIE',
        },
        split: {
          en: 'SPLIT',
          fr: 'GRAPHIQUES SÉPARÉES',
        },
      },
    },
    amount: {
      prefix: {
        en: 'showing',
        fr: 'avec',
      },
      options: {
        CAN$: {
          en: 'PRICE (CAN$)',
          fr: 'PRIX ($ CAN)',
        },
        'CAN$/MW.h': {
          en: 'PRICE (CAN$/MW.h)',
          fr: 'PRIX ($ CAN/MWh)',
        },
        'CN$/GJ': {
          en: 'PRICE (CN$/GJ)',
          fr: 'PRIX ($ CAN/GJ)',
        },
        'm3/d': {
          en: 'AMOUNT (m³/d)',
          fr: 'QUANTITÉ (m³/j)',
        },
        'MW.h': {
          en: 'AMOUNT (MW.h)',
          fr: 'QUANTITÉ (MWh)',
        },
        'thousand m3/d': {
          en: 'AMOUNT (10³m³/d)',
          fr: 'QUANTITÉ (10³m³/j)',
        },
      },
    },
    subtype: {
      prefix: {
        en: 'of',
        fr: 'de',
      },
      options: {
        Butane: {
          en: 'BUTANE',
          fr: 'BUTANE',
        },
        Propane: {
          en: 'PROPANE',
          fr: 'PROPANE',
        },
        '': {
          en: 'Butane and Propane',
          fr: 'Butane et Propane',
        },
      },
    },
  },

  explanationShown: {
    en: 'EXPLANATIONS',
    fr: 'EXPLICATIONS',
  },

  confidentialityShown: {
    en: 'CONFIDENTIALITY',
    fr: 'CONFIDENTIALITÉ',
  },

  valuesConfidential: {
    en: 'values confidential',
    fr: 'valeurs confidentiel',
  },

  amounts: {
    CAN$: { en: 'CAN$', fr: '$ CAN' },
    'CAN$/MW.h': { en: 'CAN$/MW.h', fr: '$ CAN/MWh' },
    'CN$/GJ': { en: 'CN$/GJ', fr: '$ CAN/GJ' },
    'm3/d': { en: 'm³/d', fr: 'm³/j' },
    'MW.h': { en: 'MW.h', fr: 'MWh' },
    'thousand m3/d': { en: '10³m³/d', fr: '10³m³/j' },
  },

  mainHeading: {
    imports: {
      en: 'Imports',
      fr: 'Importations',
    },
    ampersand: {
      en: ' & ',
      fr: ' & ',
    },
    exports: {
      en: ' Exports ',
      fr: ' Exportations ',
    },
    base: {
      en: 'of Energy Products to and from Canada',
      fr: 'de produits énergétiques du Canada',
    },
  },

  explanations: {
    amount: {
      en: 'Electricity is measured in MWh (Megawatt hour). The typical Ontario household uses a little less than 10 MWh per year. CAN$ denotes the total revenue. CAN$/MWh denotes the weighted average price per Megawatt hour.',
      fr: 'La quantité d’électricité est indiquée en MWh (mégawattheures). Un ménage ontarien type utilise moins de 10 MWh d’électricité par année. $ CA désigne le total des revenus. $ CA/MWh désigne le prix moyen pondéré par mégawattheure.',
    },
    timeSeek: {
      en: 'Drag these handles to select a different time period.',
      fr: 'Faites glisser les poignées pour sélectionner une autre période.',
    },
    importExport: {
      en: 'Click the + to explore different options',
      fr: 'Cliquez sur « + » pour d’autres options d’exploration.',
    },
    playButton: {
      en: 'Press the play button to animate one quarter at a time.',
      fr: 'Cliquez sur Lecture pour animer un trimestre à la fois.',
    },
    confidentiality: {
      en: 'Some values have been excluded from this visualization because of data confidentiality rules. Click to see where these values occur or find out more in the methodology.',
      fr: 'Certaines valeurs ont été exclues de cette visualisation en raison de règles de confidentialité. Cliquez ici pour voir où ces valeurs apparaissent ou pour obtenir plus d’information sur la méthodologie.',
    },
    electricityConfidentiality: {
      en: 'Electricity data is available publicly with the origins, destinations, volumes, and prices aggregated monthly by permit number. An exception is that there are no prices provided for Manitoba Hydro contract-specific permits due to a legal requirement and the NEB’s confidentiality rules.',
      fr: 'Les données sur l’électricité sont accessibles au public. Elles précisent les points d’origine et de destination, la quantité et le prix, de manière agrégée mensuellement, par numéro de permis. Il y a une exception à cette règle : aucune valeur n’est indiquée pour les permis propres à un contrat en particulier de Manitoba Hydro en raison d’une obligation juridique et des règles de l’Office en matière de confidentialité.',
    },
    barChartExport: {
      en: 'Each blue bar shows the total electricity that Canadian regions exported during a single quarter.',
      fr: 'Chaque barre bleue montre la quantité totale d’électricité que les régions canadiennes ont exportée au cours d’un trimestre.',
    },
    washingtonArrow: {
      en: 'The up arrow shows the total electricity that Canadian regions imported from Washington during the time period selected above.',
      fr: 'La flèche orientée vers le haut montre la quantité totale d’électricité importée de l’État de Washington par les régions canadiennes pendant la période sélectionnée dans le diagramme à barres ci-dessus.',
    },
    powerpool: {
      en: 'A power pool is a grouping of states that imports and exports electricity as a unit. Individual states may also have additional imports and exports.',
      fr: 'Un réseau commun est un regroupement d’états américains qui importe et exporte de l’électricité conjointement. Chacun des états du regroupement peut également importer et exporter de l’électricité individuellement.',
    },
    barChartImport: {
      en: 'Each orange bar shows the total electricity that Canadian regions imported during a single quarter.',
      fr: 'Chaque barre orange montre la quantité totale d’électricité que les régions canadiennes ont importée au cours d’un trimestre.',
    },
    reset: {
      en: 'This data visualization shows Canadian imports and exports of electricity. Click the pink dots to guide you through how to read the data.',
      fr: 'Les données interactives montrent les importations et les exportations canadiennes d’électricité. Cliquez sur les points roses pour obtenir de l’aide pour lire les données.',
    },
    resetCrudeOil: {
      en: "This data visualization shows Canada's quarterly exports of crude oil. Click the pink dots to guide you through how to read the data.",
      fr: 'Les données interactives montrent les exportations de pétrole brut du Canada par trimestre. Cliquez sur les points roses pour obtenir de l’aide pour lire les données.',
    },
    canadaPaddCrudeOil: {
      en: 'The colour of this region and its down arrow shows the total amount of crude oil that Canada exported during the time period selected in the bar chart below.',
      fr: 'La couleur de la région et de la flèche orientée vers le bas correspondante indique le volume total de pétrole brut exporté par le Canada pendant la période sélectionnée dans le diagramme à barres ci-après.',
    },
    paddICrudeOil: {
      en: 'The colour of this region and its down arrow shows the total crude oil that Canada exported to the PADD I region of the U.S.A. during the time period selected above.',
      fr: 'La couleur de la région et de la flèche orientée vers le bas correspondante indique le volume total de pétrole brut exporté vers la région PADD I des États-Unis pendant la période sélectionnée plus haut.',
    },
    barCrude: {
      en: 'These bars show the proportions of heavy vs light crude oil exported per quarter.',
      fr: 'Les barres montrent les exportations de pétrole brut lourd par rapport à celles de pétrole brut léger, par trimestre.',
    },
    blueBarCrude: {
      en: 'Each blue bar shows the total crude oil that Canada exported during a single quarter.',
      fr: 'Chaque barre bleue montre la quantité totale de pétrole brut exportée par le Canada au cours d’un trimestre.',
    },
    amountCrude: {
      en: 'Crude oil is measured in 10³ m³/d (thousand cubic metres per day), which is 6290 barrels per day.',
      fr: 'La quantité de pétrole brut est indiquée en milliers de m³/j (milliers de mètres cubes par jour), ce qui correspond à 6 290 barils par jour.  ',
    },
    padd: {
      en: 'PADD stands for Petroleum Administration for Defense District. The US is divided into 5 districts which are commonly used for analysis of regional supply and demand dynamics.',
      fr: 'PADD signifie Petroleum Administration for Defense District. Les États-Unis sont divisés en cinq districts PADD aux fins d’analyse de la dynamique de l’offre et de la demande régionales.',
    },
    linkedDataIcon: {
      en: "Click here to scale each chart's y-axis independently. This is useful to zoom in when the bars on one side are much smaller than on the other side.",
      fr: 'Cliquez ici pour établir l’échelle de l’axe des ordonnées de chacun des diagrammes. Cette fonction est utile pour grossir l’image lorsque les barres sont beaucoup plus courtes d’un côté que de l’autre.',
    },
    newBrunswickArrow: {
      en: 'The down arrow shows the total electricity that New Brunswick exported to U.S. states during the time period selected below.',
      fr: 'La flèche orientée vers le bas montre la quantité totale d’électricité que le Nouveau-Brunswick a exportée vers des États américains pendant la période sélectionnée dans le diagramme à barres ci-après.',
    },
    britishColumbiaArrow: {
      en: 'The up arrow shows the total electricity that British Columbia imported from U.S. states during the time period selected below.',
      fr: 'La flèche orientée vers le haut montre la quantité totale d’électricité importée des États américains par la Colombie-Britannique pendant la période sélectionnée dans le diagramme à barres ci-après.',
    },
    timelineRange: {
      en: 'Drag this line up and down to read the values of the y-axis at different heights.',
      fr: 'Faites glisser la ligne vers le haut ou vers le bas pour voir les différentes valeurs de l’axe des ordonnées.',
    },
    vermontArrow: {
      en: 'The down arrow shows the total electricity that Canadian regions exported to Vermont during the time period selected above.',
      fr: 'La flèche orientée vers le bas montre la quantité totale d’électricité que les régions canadiennes ont exportée vers le Vermont pendant la période sélectionnée dans le diagramme à barres ci-dessus.',
    },
    resetNaturalGas: {
      en: 'This data visualization shows imports and exports of natural gas at ports along the Canada-USA border. Click the pink dots to guide you through how to read the data.',
      fr: 'Les données interactives montrent les importations et les exportations de gaz naturel en provenance et à destination de ports situés le long de la frontière canado-américaine. Cliquez sur les points roses pour obtenir de l’aide pour lire les données.',
    },
    orangeBarNaturalGas: {
      en: 'Orange bars show the total natural gas that Canada imported in a single quarter; blue bars show exports.',
      fr: 'Les barres oranges montrent la quantité totale de gaz naturel importée par le Canada au cours d’un trimestre. Les barres bleues montrent les exportations.',
    },
    EmersonNaturalGas: {
      en: 'Up arrows show the total imports of natural gas into Canada at a port during the time selected in the bar chart above. Down arrows show exports.',
      fr: 'Les flèches orientées vers le haut montrent la quantité totale de gaz naturel importé par le Canada via un port pendant la période sélectionnée dans le diagramme à barres ci-dessus. Les flèches orientées vers le bas montrent les exportations.',
    },
    EmersonTempImpNaturalGas: {
      en: 'Up arrows show the total temporary imports of natural gas into Canada at a port during the time selected in the bar chart above. Down arrows show re-exports of temporary exports.',
      fr: 'Les flèches orientées vers le haut montrent la quantité totale de gaz naturel importé temporairement par le Canada via un port pendant la période sélectionnée dans le diagramme à barres ci-dessus. Les flèches orientées vers le bas montrent les exportations de gaz naturel importé temporairement.',
    },
    EmersonTempExpNaturalGas: {
      en: 'Down arrows show the total temporary exports of natural gas into Canada at a port during the time selected in the bar chart above. Up arrows show re-imports of temporary exports.',
      fr: 'Les flèches orientées vers le bas montrent la quantité totale de gaz naturel exporté temporairement vers le Canada via un port pendant la période sélectionnée dans le diagramme à barres ci-dessus. Les flèches orientées vers le haut montrent les importations de gaz naturel exporté temporairement.',
    },
    portNaturalGas: {
      en: 'Select ports to see their location on the map.',
      fr: 'Sélectionnez un port pour voir son emplacement sur la carte.',
    },
    importExportMenuNaturalGas: {
      en: 'Imports and exports are products that have entered or left Canada for consumption or refinement. Temporary imports are products that have been transported through Canada but will be returning back to the United States. This is often due to pipelines that travel into and out of Canada. Temporary exports are products that are transported from Canada to the United States but return to Canada.',
      fr: 'Font partie des importations et des exportations les produits qui sont entrés au Canada ou qui en sont sortis à des fins de consommation ou de raffinage. Font partie des importations temporaires les produits américains destinés aux États-Unis mais ayant transité par le Canada du fait de la configuration de l’infrastructure pipelinière. Font partie des exportations temporaires les produits canadiens destinés au Canada mais ayant transité par les États-Unis.',
    },
    amountNaturalGas: {
      en: 'Natural gas is measured in 10³ m³/d, which is 35,314 cubic feet. $CAN/GJ is the weighted average price per gigajoule of natural gas. The average Albertan household uses approximately 120 GJs of natural gas per year.',
      fr: 'La quantité de gaz naturel est indiquée en millier de m³/j, ce qui correspond à 35 314 pieds cubes par jour. $ CA/GJ indique le prix moyen pondéré du gaz naturel par gigajoule. Le ménage albertain moyen consomme environ 120 GJ de gaz naturel par année. (lien dans la colonne K)',
    },
    resetNaturalGasLiquids: {
      en: 'This data visualization shows imports of Natural Gas Liquids (NGLs) from the USA into Canadian regions (top) and exports of NGLs from Canada into regions of the USA called PADDs (bottom). Click the pink dots to guide you through how to read the data.',
      fr: 'Les données interactives montrent les importations de liquides de gaz naturel (« LGN ») en provenance des États-Unis et à destination des régions canadiennes (haut) et les exportations de LGN du Canada à destination de régions PADD des États-Unis (bas). Cliquez sur les points roses pour obtenir de l’aide pour lire les données.',
    },
    albertaArrowNaturalGasLiquids: {
      en: 'The up arrow shows the total NGLs that Alberta imported from the USA during the time period selected in the bar chart below.',
      fr: 'La flèche orientée vers le haut montre la quantité totale de LGN importée des États-Unis par l’Alberta pendant la période sélectionnée dans le diagramme à barres ci-après.',
    },
    atlqNaturalGasLiquids: {
      en: 'The Atlantic regions and Quebec are grouped due to confidentiality rules that prevent reporting of data when minimal companies are reporting in a region. Learn more about our confidentiality rules in our methodology.',
      fr: 'Les régions de l’Atlantique et du Québec sont regroupées en raison de règles de confidentialité qui interdisent la publication de données relatives à une région ne comptant que peu de sociétés. La méthode fait état des règles de confidentialité.',
    },
    orangeBarNaturalGasLiquids: {
      en: 'Each orange bar shows the total amount of natural gas liquids that Canada imported during a single quarter.',
      fr: 'Chaque barre orange montre la quantité totale de liquides de gaz naturel importée par le Canada au cours d’un trimestre.',
    },
    blueBarNaturalGasLiquids: {
      en: 'Each blue bar shows the total amount of natural gas liquids that Canada exported during a single quarter.',
      fr: 'Chaque barre bleue montre la quantité totale de liquides de gaz naturel exportée par le Canada au cours d’un trimestre.',
    },
    paddINaturalGasLiquids: {
      en: "The colour of this region and its arrow shows the total amount of natural gas liquids that Canada exported to the USA's PADD I region during the time period selected in the bar chart above.",
      fr: 'La couleur de la région et de la flèche correspondante indique la quantité totale de liquides de gaz naturel exportée par le Canada vers la région PADD I des États-Unis pendant la période sélectionnée dans le diagramme à barres ci-dessus.',
    },
    amountNaturalGasLiquids: {
      en: 'Natural gas liquids production is measured in 10³ m³/d (thousand cubic metres per day), which equals 6290 barrels per day.',
      fr: 'La production de liquides de gaz naturel est indiquée en milliers de m³/j (milliers de mètres cubes par jour), ce qui correspond à 6 290 barils par jour.',
    },
    resetRefinedPetroleumProducts: {
      en: 'This data visualization shows Canada’s quarterly exports of refined petroleum products (RPPs). Click the pink dots to guide you through how to read the data.',
      fr: 'Les données interactives montrent les exportations de produits pétroliers raffinés (« PPR ») du Canada par trimestre. Cliquez sur les points roses pour obtenir de l’aide pour lire les données.',
    },
    arrangeByRefinedPetroleumProducts: {
      en: 'Switch between seeing the different types of refined petroleum products stacked in one bar chart or as individual bar charts.',
      fr: 'Passez d’un type de produit pétrolier raffiné à l’autre dans une barre de diagramme ou dans un diagramme à barres séparées.',
    },
    amountRefinedPetroleumProducts: {
      en: 'Refined petroleum product flow is measured in 10³ m³/d (thousand cubic metres per day), which is 6290 barrels per day.',
      fr: 'La quantité de produits pétroliers raffinés est indiquée en milliers de m³/j (milliers de mètres cubes par jour), ce qui correspond à 6 290 barils par jour.',
    },
    confidentialValuesRefinedPetroleumProducts: {
      en: 'With only 13 refineries in Canada the data for RPPs is often deemed confidential as individual companies may become identifiable which could have a negative financial impact. Learn more in our methodology.',
      fr: 'Parce que le Canada ne compte que 13 raffineries, les données relatives aux produits pétroliers raffinés sont souvent confidentielles afin qu’il ne soit pas possible d’identifier une société en particulier, ce qui pourrait avoir une incidence financière négative sur elle.  La méthode contient de plus amples renseignements.',
    },
    barsRefinedPetroleumProducts: {
      en: 'Bars are pointed downwards because they represent exports from Canada.',
      fr: 'Les barres sont orientées vers le bas parce qu’elles représentent les exportations du Canada.',
    },
  },

  mainSubheading: {
    en: 'This visualization shows the quarterly energy trade data between Canada and the USA for various energy sources.',
    fr: 'Cette visualisation illustre les données trimestrielles sur les échanges énergétiques entre le Canada et les États-Unis pour diverses sources d’énergie.',
  },
  resetLabel: {
    en: 'reset',
    fr: 'réinitialisation',
  },

  socialBarText: {
    about: {
      en: 'about',
      fr: 'à propos de la',
    },
    methodology: {
      en: 'methodology',
      fr: 'méthodologie',
    },
    downloadData: {
      en: 'download data',
      fr: 'téléchargement de données',
    },
    downloadImage: {
      en: 'download image',
      fr: 'téléchargement d’images',
    },
  },

  applicationPath: {
    en: '/imports-exports/',
    fr: '/importations-exportations/',
  },

  visualizationPaths: {
    electricity: {
      en: 'electricity',
      fr: 'électricité',
    },
    crudeOil: {
      en: 'crude-oil',
      fr: 'pétrole-brut',
    },
    naturalGas: {
      en: 'natural-gas',
      fr: 'gaz-naturel',
    },
    naturalGasLiquids: {
      en: 'natural-gas-liquids',
      fr: 'liquides-de-gaz-naturel',
    },
    refinedPetroleumProducts: {
      en: 'refined-petroleum-products',
      fr: 'produits-pétroliers-raffinés',
    },
  },

  imageDownload: {
    en: 'Image Download',
    fr: 'Téléchargement d’image',
  },

  saveImage: {
    en: 'Save Image',
    fr: 'Télécharger l’image',
  },

  bitlyShare: {
    en: 'Visit this interactive visualization:',
    fr: 'TODO',
  },

  downloadable: {
    csv: {
      en: 'data.csv',
      fr: 'data.csv',
    },
  },

  formatNumberUnit: {
    en: ['', 'K', 'M', 'B'],
    fr: ['', 'k', 'M', 'G'],
  },

  confidentialCount: {
    en: '$0 of $1 values Confidential',
    fr: '$0 sur $1 valeurs confidentiel',
  },
  missingCount: {
    en: '$0 of $1 entries missing information',
    fr: '$0 sur $1 entrées manquant des données',
  },
  detailBreakDown: {
    electricity: {
      defaultText: {
        en: 'This visualization shows imports to Canada and exports from Canada between the years $0 and $1. Drag the timeline bar to change. Click a region to view details.',
        fr: 'Cette visualisation illustre les importations et les exportations du Canada de $0 à $1. Faites glisser la ligne du temps pour modifier les années. Cliquez sur une province pour des précisions à ce sujet.',
      },
      exports: {
        header: {
          type: {
            en: 'Exports',
            fr: 'Exportations',
          },
          action: {
            en: 'from',
            fr: 'de',
          },
          adjective: {
            en: 'selected',
            fr: 'ces',
          },
          place: {
            en: 'Regions',
            fr: 'Régions',
          },
        },
        body: {
          action: {
            en: 'to',
            fr: 'à',
          },
        },
      },
      imports: {
        header: {
          type: {
            en: 'Imports',
            fr: 'Importations',
          },
          action: {
            en: 'to',
            fr: 'par',
          },
          adjective: {
            en: 'selected',
            fr: 'ces',
          },
          place: {
            en: 'Regions',
            fr: 'Régions',
          },
        },
        body: {
          action: {
            en: 'from',
            fr: 'de',
          },
        },
      },
    },
    crudeOil: {
      defaultText: {
        en: 'Data not available when map is filtered',
        fr: 'Ces données ne sont pas disponibles quand un filtre est actif',
      },
      transport: {
        type: {
          en: 'Exports',
          fr: 'Exportations',
        },
        action: {
          en: 'by',
          fr: 'à',
        },
        header: {
          type: {
            en: '',
            fr: '',
          },
          action: {
            en: 'Mode of Transportation',
            fr: 'Mode de transport',
          },
          adjective: {
            en: '',
            fr: '',
          },
          place: {
            en: '',
            fr: '',
          },
        },
      },
      productSubtype: {
        header: {
          type: {
            en: '',
            fr: '',
          },
          action: {
            en: 'Type of Crude',
            fr: 'Type de pétrole brut',
          },
          adjective: {
            en: '',
            fr: '',
          },
          place: {
            en: '',
            fr: '',
          },
        },
      },
      exports: {
        header: {
          type: {
            en: 'Exports',
            fr: 'Exportations',
          },
          action: {
            en: 'to',
            fr: 'par',
          },
          adjective: {
            en: '',
            fr: '',
          },
          place: {
            en: 'PADDS',
            fr: 'PADDS',
          },
        },
        body: {
          action: {
            en: 'to',
            fr: 'à',
          },
        },
      },
      imports: {
        header: {
          type: {
            en: 'Imports',
            fr: 'Importations',
          },
          action: {
            en: 'to',
            fr: 'par',
          },
          adjective: {
            en: 'selected',
            fr: 'ces',
          },
          place: {
            en: 'Regions',
            fr: 'Régions',
          },
        },
        body: {
          action: {
            en: 'from',
            fr: 'de',
          },
        },
      },
    },
    naturalGasLiquids: {
      defaultText: {
        en: 'This visualization shows imports to Canada and exports from Canada between the years $0 and $1. Drag the timeline bar to change. Click a region to view detail',
        fr: 'Cette visualisation illustre les importations et les exportations du Canada de $0 à $1. Faites glisser la ligne du temps pour modifier les années. Cliquez sur une région pour des précisions à ce sujet.',
      },
      exports: {
        header: {
          type: {
            en: 'Exports',
            fr: 'Exportations',
          },
          action: {
            en: 'from',
            fr: 'de',
          },
          adjective: {
            en: '',
            fr: '',
          },
          place: {
            en: 'CAN',
            fr: 'CAN',
          },
        },
        body: {
          action: {
            en: '',
            fr: '',
          },
        },
      },
      imports: {
        header: {
          type: {
            en: 'Imports',
            fr: 'Importations',
          },
          action: {
            en: 'to',
            fr: 'par',
          },
          adjective: {
            en: '',
            fr: '',
          },
          place: {
            en: 'CAN',
            fr: 'CAN',
          },
        },
        body: {
          action: {
            en: '',
            fr: '',
          },
        },
      },
    },
  },
  subType: {
    Butane: {
      en: 'BUTANE',
      fr: 'BUTANE',
    },
    Propane: {
      en: 'PROPANE',
      fr: 'PROPANE',
    },
    propaneButane: {
      en: 'Butane and Propane',
      fr: 'Butane et propane',
    },
  },

  country: {
    ca: {
      '': {
        en: 'Missing Region',
        fr: 'Région non disponible',
      },
      YT: {
        en: 'Yukon',
        fr: 'Yukon',
      },
      NT: {
        en: 'Northwest Territories',
        fr: 'Territoires du Nord-Ouest',
      },
      NU: {
        en: 'Nunavut',
        fr: 'Nunavut',
      },
      NL: {
        en: 'Newfoundland and Labrador',
        fr: 'Terre-Neuve-et-Labrador',
      },
      PE: {
        en: 'Prince Edward Island',
        fr: 'Île-du-Prince-Édouard',
      },
      BC: {
        en: 'British Columbia',
        fr: 'Colombie-Britannique',
      },
      AB: {
        en: 'Alberta',
        fr: 'Alberta',
      },
      SK: {
        en: 'Saskatchewan',
        fr: 'Saskatchewan',
      },
      MB: {
        en: 'Manitoba',
        fr: 'Manitoba',
      },
      ON: {
        en: 'Ontario',
        fr: 'Ontario',
      },
      QC: {
        en: 'Québec',
        fr: 'Québec',
      },
      NB: {
        en: 'New Brunswick',
        fr: 'Nouveau-Brunswick',
      },
      NS: {
        en: 'Nova Scotia',
        fr: 'Nouvelle-Écosse',
      },
      'ATL-Q': {
        en: 'Atlantic Regions\nand Quebec',
        fr: 'Régions atlantiques\n et le Québec',
      },
    },
    us: {
      '': {
        en: 'Missing State',
        fr: 'État non disponible',
      },
      AL: {
        en: 'Alabama',
        fr: 'Alabama',
      },
      AK: {
        en: 'Alaska',
        fr: 'Alaska',
      },
      AZ: {
        en: 'Arizona',
        fr: 'Arizona',
      },
      AR: {
        en: 'Arkansas',
        fr: 'Arkansas',
      },
      CA: {
        en: 'California',
        fr: 'Californie',
      },
      CO: {
        en: 'Colorado',
        fr: 'Colorado',
      },
      CT: {
        en: 'Connecticut',
        fr: 'Connecticut',
      },
      DE: {
        en: 'Delaware',
        fr: 'Delaware',
      },
      FL: {
        en: 'Florida',
        fr: 'Floride',
      },
      GA: {
        en: 'Georgia',
        fr: 'Georgie',
      },
      HI: {
        en: 'Hawaii',
        fr: 'Hawaï',
      },
      ID: {
        en: 'Idaho',
        fr: 'Idaho',
      },
      IL: {
        en: 'Illinois',
        fr: 'Illinois',
      },
      IN: {
        en: 'Indiana',
        fr: 'Indiana',
      },
      IA: {
        en: 'Iowa',
        fr: 'Iowa',
      },
      KS: {
        en: 'Kansas',
        fr: 'Kansas',
      },
      KY: {
        en: 'Kentucky',
        fr: 'Kentucky',
      },
      LA: {
        en: 'Louisiana',
        fr: 'Louisiane',
      },
      ME: {
        en: 'Maine',
        fr: 'Maine',
      },
      MD: {
        en: 'Maryland',
        fr: 'Maryland',
      },
      MA: {
        en: 'Massachusetts',
        fr: 'Massachusetts',
      },
      MI: {
        en: 'Michigan',
        fr: 'Michigan',
      },
      MN: {
        en: 'Minnesota',
        fr: 'Minnesota',
      },
      MS: {
        en: 'Mississippi',
        fr: 'Mississippi',
      },
      MO: {
        en: 'Missouri',
        fr: 'Missouri',
      },
      MT: {
        en: 'Montana',
        fr: 'Montana',
      },
      NE: {
        en: 'Nebraska',
        fr: 'Nebraska',
      },
      NV: {
        en: 'Nevada',
        fr: 'Nevada',
      },
      NH: {
        en: 'New Hampshire',
        fr: 'New Hampshire',
      },
      NJ: {
        en: 'New Jersey',
        fr: 'New Jersey',
      },
      NM: {
        en: 'New Mexico',
        fr: 'Nouveau-Mexique',
      },
      NY: {
        en: 'New York',
        fr: 'New York',
      },
      NC: {
        en: 'North Carolina',
        fr: 'Caroline du Nord',
      },
      ND: {
        en: 'North Dakota',
        fr: 'Dakota du Nord',
      },
      OH: {
        en: 'Ohio',
        fr: 'Ohio',
      },
      OK: {
        en: 'Oklahoma',
        fr: 'Oklahoma',
      },
      OR: {
        en: 'Oregon',
        fr: 'Oregon',
      },
      PA: {
        en: 'Pennsylvania',
        fr: 'Pennsylvanie',
      },
      RI: {
        en: 'Rhode Island',
        fr: 'Rhode Island',
      },
      SC: {
        en: 'South Carolina',
        fr: 'Caroline du Sud',
      },
      SD: {
        en: 'South Dakota',
        fr: 'Dakota du Sud',
      },
      TN: {
        en: 'Tennessee',
        fr: 'Tennessee',
      },
      TX: {
        en: 'Texas',
        fr: 'Texas',
      },
      UT: {
        en: 'Utah',
        fr: 'Utah',
      },
      VT: {
        en: 'Vermont',
        fr: 'Vermont',
      },
      VA: {
        en: 'Virginia',
        fr: 'Virginie',
      },
      WA: {
        en: 'Washington',
        fr: 'Washington',
      },
      WV: {
        en: 'West Virginia',
        fr: 'Virginie-Occidentale',
      },
      WI: {
        en: 'Wisconsin',
        fr: 'Wisconsin',
      },
      WY: {
        en: 'Wyoming',
        fr: 'Wyoming',
      },
    },
    powerpool: {
      'NE-ISO': {
        en: 'New England-ISO',
        fr: 'Nouvelle-Angleterre ISO',
      },
      'MN/ND': {
        en: 'Minn / N. Dakota',
        fr: 'Minn. / Dakota N.',
      },
      PJMPP: {
        en: 'Pennsylvania Jersey Maryland Power Pool',
        fr: 'Réseau commun Pennsylvanie NJ Maryland',
      },
      powerPools: {
        en: 'Power Pools',
        fr: "Réseau d'électricité",
      },
    },
  },
  Padd: {
    ca: {
      ca: {
        en: 'CANADA',
        fr: 'CANADA',
      },
    },
    us: {
      'PADD I': {
        en: 'PADD I',
        fr: 'PADD I',
      },
      'PADD II': {
        en: 'PADD II',
        fr: 'PADD II',
      },
      'PADD III': {
        en: 'PADD III',
        fr: 'PADD III',
      },
      'PADD IV': {
        en: 'PADD IV',
        fr: 'PADD IV',
      },
      'PADD V': {
        en: 'PADD V',
        fr: 'PADD V',
      },
      'Non-USA': {
        en: 'NON-USA',
        fr: 'HORS É.-U.',
      },
      Mexico: {
        en: 'MEXICO',
        fr: 'MEXIQUE',
      },
    },
  },
  unabbreviated: {
    mainMenuBar: {
      refinedPetroleumProducts: {
        en: 'Refined Petroleum Products',
        fr: 'Produits pétroliers raffinés',
      },
    },
  },

  mapTileLabel: {
    en: '$0 imports $1 $3 and exports $2 $3',
    fr: '$0 imporations $1 $3 et exportations $2 $3',
  },
  legendMapTiles: {
    electricity: {
      ca: {
        imports: {
          label: {
            en: 'imports into Canada',
            fr: 'importations au Canada',
          },
        },
        exports: {
          label: {
            en: 'exports from Canada',
            fr: 'exportations du Canada',
          },
        },
        stateOrProvince: {
          en: 'region',
          fr: 'région',
        },
      },
      us: {
        imports: {
          label: {
            en: 'imports from USA',
            fr: 'importations des États-Unis',
          },
        },
        exports: {
          label: {
            en: 'exports into USA',
            fr: 'exportations aux États-Unis',
          },
        },
        stateOrProvince: {
          en: 'state',
          fr: 'état',
        },
      },
    },
    crudeOil: {
      exports: {
        label: {
          en: 'exports into US PADD',
          fr: 'exportations au PADD',
        },
        bottomText: {
          en: 'PADD',
          fr: 'PADD',
        },
        topText: {
          en: 'CANADA',
          fr: 'CANADA',
        },
      },
    },
    naturalGasLiquids: {
      ca: {
        imports: {
          label: {
            en: 'imports from Canada',
            fr: 'importations du Canada',
          },
        },
        exports: {
          label: {
            en: 'exports into Canada',
            fr: 'exportations au Canada',
          },
        },
        stateOrProvince: {
          en: 'region',
          fr: 'région',
        },
      },
      us: {
        exports: {
          label: {
            en: 'exports into US PADD',
            fr: 'exportations au PADD',
          },
          bottomText: {
            en: 'PADD',
            fr: 'PADD',
          },
        },
      },
    },
    naturalGas: {
      importsExports: {
        imports: {
          label: {
            en: 'imports into Canada',
            fr: 'importations au Canada',
          },
        },
        exports: {
          label: {
            en: 'exports from Canada',
            fr: 'exportations du Canada',
          },
        },
        stateOrProvince: {
          en: 'port',
          fr: 'port',
        },
      },

      importsForReexport: {
        imports: {
          label: {
            en: 'temporary imports into\nCanada',
            fr: 'importations temporaires\ndu Canada',
          },
        },
        exports: {
          label: {
            en: 're-exports (of temporary\nimports) from Canada',
            fr: "ré-exportations (d'importations\ntemporaires) au Canada",
          },
        },
        stateOrProvince: {
          en: 'port',
          fr: 'port',
        },
      },

      exportsForReimport: {
        imports: {
          label: {
            en: 're-imports (of temporary\nexports) into Canada',
            fr: "ré-importations (d'exportations\ntemporaires) au Canada",
          },
        },
        exports: {
          label: {
            en: 'temporary exports from\nCanada',
            fr: 'exportations temporaires\ndu Canada',
          },
        },
        stateOrProvince: {
          en: 'port',
          fr: 'port',
        },
      },

    },
  },

  chartOptions: {
    scaleLinked: {
      en: 'y-axis scales equal',
      fr: 'axes « y » liés',
    },
    scaleUnlinked: {
      en: 'y-axis scales unequal',
      fr: 'axes « y » indépendants',
    },
    timelineGroup: {
      year: {
        en: 'by YEAR',
        fr: 'par ANNÉE',
      },
      quarter: {
        en: 'by QUARTER',
        fr: 'par TRIMESTRE',
      },
    },
  },

  detailTotal: {
    total: {
      en: 'Total',
      fr: 'Total',
    },
  },

  timelinePlay: {
    start: {
      en: 'Start timeline playback',
      fr: 'Début de la ligne de temps',
    },
    stop: {
      en: 'Stop timeline playback',
      fr: 'Fin de la ligne de temps',
    },
  },

  timelineSeek: {
    label: {
      en: '$0 curtain at $1 quarter $2',
      fr: '$0 depuis $1 trimestre $2',
    },
    start: {
      en: 'Start',
      fr: 'Début',
    },
    end: {
      en: 'End',
      fr: 'Fin',
    },
  },
  portMap: {
    multiple: {
      en: 'Multiple Selections',
      fr: 'Sélections Multiples',
    },
    portName: {
      Aden: {
        en: 'Aden',
        fr: 'Aden',
      },
      Cardston: {
        en: 'Cardston',
        fr: 'Cardston',
      },
      Coutts: {
        en: 'Coutts',
        fr: 'Coutts',
      },
      'Reagan Field': {
        en: 'Reagan Field',
        fr: 'Reagan Field',
      },
      Sierra: {
        en: 'Sierra',
        fr: 'Sierra',
      },
      Blaine: {
        en: 'Blaine',
        fr: 'Blaine',
      },
      Huntingdon: {
        en: 'Huntingdon',
        fr: 'Huntingdon',
      },
      Kingsgate: {
        en: 'Kingsgate',
        fr: 'Kingsgate',
      },
      Emerson: {
        en: 'Emerson',
        fr: 'Emerson',
      },
      Sprague: {
        en: 'Sprague',
        fr: 'Sprague',
      },
      Brunswick: {
        en: 'Brunswick',
        fr: 'Brunswick',
      },
      Canaport: {
        en: 'Canaport',
        fr: 'Canaport',
      },
      'St Stephen': {
        en: 'St Stephen',
        fr: 'St Stephen',
      },
      Chippawa: {
        en: 'Chippawa',
        fr: 'Chippawa',
      },
      Cornwall: {
        en: 'Cornwall',
        fr: 'Cornwall',
      },
      Corunna: {
        en: 'Corunna',
        fr: 'Corunna',
      },
      Courtright: {
        en: 'Courtright',
        fr: 'Courtright',
      },
      'Fort Frances': {
        en: 'Fort Frances',
        fr: 'Fort Frances',
      },
      Iroquois: {
        en: 'Iroquois',
        fr: 'Iroquois',
      },
      'Niagara Falls': {
        en: 'Niagara Falls',
        fr: 'Niagara Falls',
      },
      'Ojibway (Windsor)': {
        en: 'Ojibway (Windsor)',
        fr: 'Ojibway (Windsor)',
      },
      'Rainy River': {
        en: 'Rainy River',
        fr: 'Rainy River',
      },
      Sarnia: {
        en: 'Sarnia',
        fr: 'Sarnia',
      },
      'Sarnia/Blue Water': {
        en: 'Sarnia/Blue Water',
        fr: 'Sarnia/Blue Water',
      },
      'Sault Ste Marie': {
        en: 'Sault Ste Marie',
        fr: 'Sault Ste Marie',
      },
      'St Clair': {
        en: 'St Clair',
        fr: 'St Clair',
      },
      Armstrong: {
        en: 'Armstrong',
        fr: 'Armstrong',
      },
      Champlain: {
        en: 'Champlain',
        fr: 'Champlain',
      },
      'East Hereford': {
        en: 'East Hereford',
        fr: 'East Hereford',
      },
      'Highgate Springs': {
        en: 'Highgate Springs',
        fr: 'Highgate Springs',
      },
      Highwater: {
        en: 'Highwater',
        fr: 'Highwater',
      },
      Napierville: {
        en: 'Napierville',
        fr: 'Napierville',
      },
      Philipsburg: {
        en: 'Philipsburg',
        fr: 'Philipsburg',
      },
      Elmore: {
        en: 'Elmore',
        fr: 'Elmore',
      },
      Loomis: {
        en: 'Loomis',
        fr: 'Loomis',
      },
      Monchy: {
        en: 'Monchy',
        fr: 'Monchy',
      },
      'North Portal': {
        en: 'North Portal',
        fr: 'North Portal',
      },
      'Port of Estevan': {
        en: 'Port of Estevan',
        fr: 'Port of Estevan',
      },
      'Willow Creek': {
        en: 'Willow Creek',
        fr: 'Willow Creek',
      },
    },
  },
  mapTileLabels: {
    portName: {
      Huntingdon: {
        en: 'Hunting-\ndon',
        fr: 'Hunting-\ndon',
      },
      'Reagan Field': {
        en: 'Reagan\nField',
        fr: 'Reagan\nField',
      },
      'North Portal': {
        en: 'North\nPortal',
        fr: 'North\nPortal',
      },
      'Port of Estevan': {
        en: 'Port of\nEstevan',
        fr: 'Port of\nEstevan',
      },
      'Willow Creek': {
        en: 'Willow\nCreek',
        fr: 'Willow\nCreek',
      },
      'Fort Frances': {
        en: 'Fort\nFrances',
        fr: 'Fort\nFrances',
      },
      'Niagara Falls': {
        en: 'Niagara\nFalls',
        fr: 'Niagara\nFalls',
      },
      'Ojibway (Windsor)': {
        en: 'Ojibway\nWindsor',
        fr: 'Ojibway\nWindsor',
      },
      'Rainy River': {
        en: 'Rainy\nRiver',
        fr: 'Rainy\nRiver',
      },
      'Sarnia/Blue Water': {
        en: 'Sarnia\nBlue Wa..',
        fr: 'Sarnia\nBlue Wa..',
      },
      'Sault Ste Marie': {
        en: 'Sault Ste\nMarie',
        fr: 'Sault Ste\nMarie',
      },
      'Armstrong': {
        en: 'Arm-\nstrong',
        fr: 'Arm-\nstrong',
      },
      'Champlain': {
        en: 'Cham-\nplain',
        fr: 'Cham-\nplain',
      },
      'East Hereford': {
        en: 'East\nHereford',
        fr: 'East\nHereford',
      },
      'Highgate Springs': {
        en: 'Highgate\nSprings',
        fr: 'Highgate\nSprings',
      },
      'Napierville': {
        en: 'Napier-\nville',
        fr: 'Napier-\nville',
      },
      'Philipsburg': {
        en: 'Philips-\nburg',
        fr: 'Philips-\nburg',
      },
      'Brunswick': {
        en: 'Bruns-\nwick',
        fr: 'Bruns-\nwick',
      },
      'St Stephen': {
        en: 'St\nStephen',
        fr: 'St\nStephen',
      },
    },
  },
})

export default TranslationTable
