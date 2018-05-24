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

  loader: {
    titleText: {
      en: 'loading visualisation',
      fr: 'visualisation en chargement',
    },
    imports: {
      en: 'Imports',
      fr: 'Importations',
    },
    and: {
      en: 'and',
      fr: 'et',
    },
    exports: {
      en: 'Exports',
      fr: 'Exportations',
    },
    titleText_2: {
      en: 'of Energy Products to and from Canada',
      fr: 'des produits énergétiques à destination et en provenance du Canada',
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
      en: 'This visualization show quarterly energy trade data between Canada and the U.S. since 1985, with the exception of electricity data which is available back to 1990.',
      fr: 'Cette visualisation présente les données trimestrielles sur le commerce de l’énergie entre le Canada et les États-Unis depuis 1985, à l’exception des données concernant l’électricité, qui ne sont disponibles que depuis 1990.',
    },
    p3: {
      en: 'If you want to use the data for research and undertake your own review, all the data is downloadable and shareable. The chart images are also downloadable, and if you are interested in the source code for the visualizations, it is available on the government’s Open Government portal: ',
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
    crudeOilImports: {
      en: 'Crude Oil Imports',
      fr: 'Pétrole brut TODO',
    },
    crudeOilExports: {
      en: 'Crude Oil Exports',
      fr: 'Pétrole brut TODO',
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
          en: 'IMPORTS',
          fr: 'IMPORTATIONS',
        },
        exports: {
          en: 'EXPORTS',
          fr: 'EXPORTATIONS',
        },
        importsExports: {
          en: 'Imports and Exports',
          fr: 'Importations et exportations',
        },
        importsForReexport: {
          en: 'TEMPORARY IMPORTS',
          fr: 'IMPORTATIONS TEMPORAIRES',
        },
        exportsForReimport: {
          en: 'TEMPORARY EXPORTS',
          fr: 'EXPORTATIONS TEMPORAIRES',
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
        amount: {
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
          en: 'VALUE (CAN$)',
          fr: 'VALEUR ($ CAN)',
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

  label: {
    Pipeline: {
      en: 'Pipeline',
      fr: 'Gazoduc',
    },
    Marine: {
      en: 'Marine',
      fr: 'Voie Maritime',
    },
    Railroad: {
      en: 'Railroad',
      fr: 'Chemin de fer',
    },
    Truck: {
      en: 'Truck',
      fr: 'Camion',
    },
    Heavy: {
      en: 'Heavy and Medium',
      fr: 'Lourd et Moyen',
    },
    Light: {
      en: 'Light',
      fr: 'Léger',
    },
    'Middle Distillate': {
      en: 'Middle Distillate',
      fr: 'Distillat Moyen',
    },
    'Motor Gasoline': {
      en: 'Motor Gasoline',
      fr: 'Essence de moteur',
    },
    'Heavy Fuel Oil': {
      en: 'Heavy Fuel',
      fr: 'Carburant lourd',
    },
    'Jet Fuel': {
      en: 'Jet Fuel',
      fr: 'Carburéacteur',
    },
    'Partially Processed Oil': {
      en: 'Partially Processed Oil',
      fr: 'Huile Partiellement Processée',
    },
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
    base_1: {
      en: 'Import data for ',
      fr: 'Importation de données sur',
    },
    base_1_5_crude: {
      en: '',
      fr: 'le ',
    },
    base_1_5_refinedPetroleumProducts: {
      en: '',
      fr: 'les ',
    },
    refinedPetroleumProducts: {
      en: 'Refined Petroleum Products',
      fr: 'Produits Pétroliers Raffinés',
    },
    crudeOil: {
      en: 'Crude Oil',
      fr: 'Pétrole Brut',
    },
    base_2: {
      en: ' is available from Statistics Canada (CANSIM ',
      fr: ' de Statistique Canada (',
    },
    base_2_5_crude: {
      en: 'tables ',
      fr: 'tableaux ',
    },
    base_2_5_refinedPetroleumProducts: {
      en: 'table ',
      fr: 'tableau ',
    },
    crudeOilStats_01: {
      en: '126-0001',
      fr: '126-0001',
    },
    crudeOilStats_03: {
      en: '126-0003',
      fr: '126-0003',
    },
    refinedPetroleumProductsStats_04: {
      en: '134-0004',
      fr: '134-0004',
    },
    crudeOilStatsLink_01: {
      en: 'http://www5.statcan.gc.ca/cansim/a26?lang=eng&id=1260001',
      fr: 'http://www5.statcan.gc.ca/cansim/a26?lang=fra&id=1260001&retrLang=fra',
    },
    crudeOilStatsLink_03: {
      en: 'http://www5.statcan.gc.ca/cansim/a26?lang=eng&id=1260003',
      fr: 'http://www5.statcan.gc.ca/cansim/a26?lang=fra&id=1260003&retrLang=fra',
    },
    refinedPetroleumProductsLink_04: {
      en: 'http://www5.statcan.gc.ca/cansim/a26?lang=eng&id=1340004',
      fr: 'http://www5.statcan.gc.ca/cansim/a26?lang=fra&id=1340004&retrLang=fra',
    },
    and: {
      en: ' and ',
      fr: ' et ',
    },
    deCansim: {
      en: '',
      fr: ' de CANSIM',
    },
    closingBracket: {
      en: ')',
      fr: ')',
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
      en: 'A power pool is a grouping of states that imports and exports electricity as a unit. Individual states may also have additional imports and exports. \nMN/ND: Minnesota/North Dakota \nNE-ISO: New England Independent System Operator \nPJM: Pennsylvania, Jersey, Maryland (PJM has since expanded to include all or parts of Delaware, Illinois, Indiana, Kentucky, Maryland, Michigan, New Jersey, North Carolina, Ohio, Pennsylvania, Tennessee, Virginia, West Virginia and the District of Columbia)',
      fr: 'Un réseau commun est un regroupement d’états américains qui importe et exporte de l’électricité conjointement. Chacun des états du regroupement peut également importer et exporter de l’électricité individuellement. MN/ND : Minnesota/Dakota du Nord NE-ISO : New England Independent System Operator PJM : Pennsylvanie, New Jersey et Maryland (comprend désormais certaines parties du Delaware, de l’Illinois, de l’Indiana, du Kentucky, du Maryland, du Michigan, du New Jersey, de la Caroline du Nord, de l’Ohio, de la Pennsylvanie, du Tennessee, de la Virginie, de la Virginie-Occidentale et du District of Columbia)',
    },
    barChartImport: {
      en: 'Each orange bar shows the total electricity that Canadian regions imported during a single quarter.',
      fr: 'Chaque barre orange montre la quantité totale d’électricité que les régions canadiennes ont importée au cours d’un trimestre.',
    },
    reset: {
      en: 'This visualization shows electricity imports to Canada and exports from Canada between the years 1990 and 2017. Drag the timeline bar to change. Click a region to view details.',
      fr: 'Cette visualisation montre les importations d’électricité à destination du Canada et les exportations en provenance du Canada entre les années 1990 et 2017. Faites glisser les poignées pour sélectionner une autre période. Cliquez sur une région pour voir les détails.',
    },
    resetCrudeOilImports: {
      en: 'This visualization shows crude oil imports to Canada between the years 1985 and 2017. Drag the timeline bar to change. Click a region to view details.',
      fr: 'Cette visualisation montre les importations de pétrole brut à destination du Canada entre les années 1985 et 2017. Faites glisser les poignées pour sélectionner une autre période. Cliquez sur une région pour voir les détails.',
    },
    resetCrudeOilExports: {
      en: 'This visualization shows crude oil exports from Canada between the years 1985 and 2017. Drag the timeline bar to change. Click a region to view details.',
      fr: 'Cette visualisation montre les exportations de pétrole brut en provenance du Canada entre les années 1985 et 2017. Faites glisser les poignées pour sélectionner une autre période. Cliquez sur une région pour voir les détails.',
    },
    resetNaturalGas: {
      en: 'This visualization shows natural gas imports to Canada and exports from Canada between the years 1985 and 2017. Drag the timeline bar to change. Click a region to view details.',
      fr: 'Cette visualisation montre les importations de gaz naturel à destination du Canada et les exportations en provenance du Canada entre les années 1985 et 2017. Faites glisser les poignées pour sélectionner une autre période. Cliquez sur une région pour voir les détails.',
    },
    resetNaturalGasLiquids: {
      en: 'This visualization shows natural gas liquid imports to Canada and exports from Canada between the years 1990 and 2017. Drag the timeline bar to change. Click a region to view details.',
      fr: 'Cette visualisation montre les importations de liquides de gaz naturel à destination du Canada et les exportations en provenance du Canada entre les années 1990 et 2017. Faites glisser les poignées pour sélectionner une autre période. Cliquez sur une région pour voir les détails.',
    },
    resetRefinedPetroleumProducts: {
      en: 'This visualization shows refined petroleum product exports from Canada between the years 1985 and 2017. Drag the timeline bar to change. Click a region to view details.',
      fr: 'Cette visualisation montre les exportations de produit pétrolier raffiné en provenance du Canada entre les années 1985 et 2017. Faites glisser les poignées pour sélectionner une autre période. Cliquez sur une région pour voir les détails.',
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
      en: 'PADD stands for Petroleum Administration for Defense District. The U.S. is divided into 5 districts which are commonly used for analysis of regional supply and demand dynamics.',
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
    albertaArrowNaturalGasLiquids: {
      en: 'The up arrow shows the total NGLs that Alberta imported from the U.S. during the time period selected in the bar chart below.',
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
    arrangeByRefinedPetroleumProducts: {
      en: 'Switch between seeing the different types of refined petroleum products stacked in one bar chart or as individual bar charts.',
      fr: 'Passez d’un type de produit pétrolier raffiné à l’autre dans une barre de diagramme ou dans un diagramme à barres séparées.',
    },
    amountRefinedPetroleumProducts: {
      en: 'Refined petroleum product flow is measured in 10³ m³/d (thousand cubic metres per day), which is 6290 barrels per day.',
      fr: 'La quantité de produits pétroliers raffinés est indiquée en milliers de m³/j (milliers de mètres cubes par jour), ce qui correspond à 6 290 barils par jour.',
    },
    confidentialValuesRefinedPetroleumProducts: {
      en: 'With relatively few refineries in Canada the data for RPPs is often deemed confidential as individual companies may become identifiable which could have a negative financial impact. Learn more in our methodology.',
      fr: 'Le Canada comptant assez peu de raffineries, les données relatives aux produits pétroliers raffinés sont souvent confidentielles afin qu’il ne soit pas possible d’identifier une société en particulier, ce qui pourrait avoir une incidence financière négative sur elle. La méthode contient de plus amples renseignements.',
    },
    barsRefinedPetroleumProducts: {
      en: 'Bars are pointed downwards because they represent exports from Canada.',
      fr: 'Les barres sont orientées vers le bas parce qu’elles représentent les exportations du Canada.',
    },
    cng: {
      en: 'The locations where CNG has crossed the border included in the “Other CNG” category include: North Portal and St. Stephen',
      fr: 'GNC signifie « gaz naturel comprimé ». Les points d’importation du GNC compris dans la catégorie « Autres GNC » sont North Portal et St. Stephen.',
    },
    lng: {
      en: 'LNG stands for liquefied natural gas which is natural gas that had been cooled to -162 Celsius in order to reach its liquid state. In changing from a gas to a liquid, the volume shrinks by a factor of 600 which allows the volume to be transported across oceans by ship and overland by tanker truck. Canada imports offshore LNG into a single terminal in New Brunswick called Canaport. This imported LNG is eventually warmed to resume its gaseous state and is then transported by pipeline as regular natural gas.',
      fr: 'Le gaz naturel liquéfié (« GNL ») est un gaz naturel qui a été refroidi jusqu’à sa liquéfaction, à -162 degrés Celsius. Pendant son changement d’état de gaz à liquide, son volume diminue par un facteur de 600, ce qui permet le transport du produit par bateau et camion. Les importations de GNL du Canada arrivent au seul terminal méthanier au pays, Canaport, au Nouveau-Brunswick. Le GNL est ensuite réchauffé jusqu’à ce qu’il retrouve son état gazeux et est ensuite transporté par pipeline, comme du gaz naturel régulier.',
    },
    crudeExportsTotal: {
      en: 'Note that the sum of Mode of Transportation, Type of Crude or Export Destination may not match the Total due to the exclusion of confidential values in one or more of these datasets.',
      fr: 'Notez que la somme du mode de transport, du type de pétrole brut ou de la destination d’exportation pourrait ne pas correspondre au total en raison de l’exclusion des valeurs confidentielles dans un ou plusieurs de ces ensembles de données.',
    },
  },

  mainSubheading: {
    en: 'This visualization shows the quarterly energy trade data between Canada and the U.S. for various energy sources.',
    fr: 'Cette visualisation illustre les données trimestrielles sur les échanges énergétiques entre le Canada et les États-Unis pour diverses sources d’énergie.',
  },
  mainSubheadingCrudeOilImports: {
    en: 'This visualization shows the quarterly energy trade data between Canada and the world for various energy sources.',
    fr: 'Cette visualisation illustre les données trimestrielles sur les échanges énergétiques entre le Canada et le monde pour diverses sources d’énergie.',
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
    crudeOilImports: {
      en: 'crude-oil-imports',
      fr: 'pétrole-brut-imports',
    },
    crudeOilExports: {
      en: 'crude-oil-exports',
      fr: 'pétrole-brut-exports',
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
    en: 'Visit this interactive visualization: ',
    fr: 'Visitez cette visualisation interactif: ',
  },

  downloadable: {
    csv: {
      en: 'data.csv',
      fr: 'data.csv',
    },
  },

  formatNumberUnit: {
    en: ['', 'k', 'M', 'B'],
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
    crudeOilExports: {
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
          fr: 'par',
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
        body: {
          action: {
            en: 'Export by',
            fr: 'Exportations par',
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
        body: {
          suffix: {
            en: ' Crude Oil',
            fr: ' Pétrole brut',
          },
        },
      },
      exports: {
        header: {
          prefix: {
            en: '',
            fr: 'Destination',
          },
          type: {
            en: 'Exports',
            fr: 'd’exportation',
          },
          action: {
            en: '',
            fr: '',
          },
          adjective: {
            en: '',
            fr: '',
          },
          place: {
            en: 'Destination',
            fr: '',
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
    crudeOilImports: {
      defaultText: {
        en: 'Data not available when map is filtered',
        fr: 'Ces données ne sont pas disponibles quand un filtre est actif',
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
            en: 'Canada',
            fr: 'Canada',
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
      en: 'Butane',
      fr: 'Butane',
    },
    Propane: {
      en: 'Propane',
      fr: 'Propane',
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
        en: 'Québec and\nAtlantic Regions',
        fr: 'Québec et les\nRégions Atlantiques',
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
      PJM: {
        en: 'Pennsylvania Jersey Maryland Power Pool',
        fr: 'Réseau commun Pennsylvanie NJ Maryland',
      },
      powerPools: {
        en: 'Power Pools',
        fr: "Réseau d'électricité",
      },
    },
    world: {
      northAmerica: {
        en: 'U.S.\nand\nMexico',
        fr: 'États-Unis\net\nMexique',
      },
      africa: {
        en: 'Africa',
        fr: 'Afrique',
      },
      oceania: {
        en: 'Australia\nand\nOceania',
        fr: 'Australie\net\nOcéanie',
      },
      asia: {
        en: 'Asia',
        fr: 'Asie',
      },
      europe: {
        en: 'Europe',
        fr: "L'Europe",
      },
      southAmerica: {
        en: 'South\nAmerica',
        fr: 'Amérique\ndu sud',
      },
      otherCountries: {
        en: 'Low Volume\nContributions',
        fr: 'Contributions\nà faible\nvolume',
      },
    },
  },
  Padd: {
    ca: {
      ca: {
        en: 'CANADA',
        fr: 'CANADA',
      },
      caImport: {
        en: 'CUMULATIVE IMPORTS\nTO CANADA',
        fr: 'IMPORTATIONS CUMULATIVES\nAU CANADA',
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
        en: 'NON-U.S.',
        fr: 'HORS É.-U.',
      },
      Mexico: {
        en: 'MEXICO',
        fr: 'MEXIQUE',
      },
    },
    world: {
      'United States': {
        en: 'U.S.',
        fr: 'US_FR',
      },
      Alabama: {
        en: 'Alabama',
        fr: 'Alabama_FR',
      },
      Alaska: {
        en: 'Alaska',
        fr: 'Alaska_FR',
      },
      Arizona: {
        en: 'Arizona',
        fr: 'Arizona_FR',
      },
      Arkansas: {
        en: 'Arkansas',
        fr: 'Arkansas_FR',
      },
      California: {
        en: 'California',
        fr: 'California_FR',
      },
      Colorado: {
        en: 'Colorado',
        fr: 'Colorado_FR',
      },
      Connecticut: {
        en: 'Connecticut',
        fr: 'Connecticut_FR',
      },
      Delaware: {
        en: 'Delaware',
        fr: 'Delaware_FR',
      },
      Florida: {
        en: 'Florida',
        fr: 'Florida_FR',
      },
      Georgia: {
        en: 'Georgia',
        fr: 'Georgia_FR',
      },
      Hawaii: {
        en: 'Hawaii',
        fr: 'Hawaii_FR',
      },
      Idaho: {
        en: 'Idaho',
        fr: 'Idaho_FR',
      },
      Illinois: {
        en: 'Illinois',
        fr: 'Illinois_FR',
      },
      Indiana: {
        en: 'Indiana',
        fr: 'Indiana_FR',
      },
      Iowa: {
        en: 'Iowa',
        fr: 'Iowa_FR',
      },
      Kansas: {
        en: 'Kansas',
        fr: 'Kansas_FR',
      },
      Kentucky: {
        en: 'Kentucky',
        fr: 'Kentucky_FR',
      },
      Louisiana: {
        en: 'Louisiana',
        fr: 'Louisiana_FR',
      },
      Maine: {
        en: 'Maine',
        fr: 'Maine_FR',
      },
      Maryland: {
        en: 'Maryland',
        fr: 'Maryland_FR',
      },
      Massachusetts: {
        en: 'Massachusetts',
        fr: 'Massachusetts_FR',
      },
      Michigan: {
        en: 'Michigan',
        fr: 'Michigan_FR',
      },
      Minnesota: {
        en: 'Minnesota',
        fr: 'Minnesota_FR',
      },
      Mississippi: {
        en: 'Mississippi',
        fr: 'Mississippi_FR',
      },
      Missouri: {
        en: 'Missouri',
        fr: 'Missouri_FR',
      },
      Montana: {
        en: 'Montana',
        fr: 'Montana_FR',
      },
      Nebraska: {
        en: 'Nebraska',
        fr: 'Nebraska_FR',
      },
      Nevada: {
        en: 'Nevada',
        fr: 'Nevada_FR',
      },
      'New Hampshire': {
        en: 'New Hampshire',
        fr: 'New Hampshire_FR',
      },
      'New Jersey': {
        en: 'New Jersey',
        fr: 'New Jersey_FR',
      },
      'New Mexico': {
        en: 'New Mexico',
        fr: 'New Mexico_FR',
      },
      'New York': {
        en: 'New York',
        fr: 'New York_FR',
      },
      'North Carolina': {
        en: 'North Carolina',
        fr: 'North Carolina_FR',
      },
      'North Dakota': {
        en: 'North Dakota',
        fr: 'North Dakota_FR',
      },
      Ohio: {
        en: 'Ohio',
        fr: 'Ohio_FR',
      },
      Oklahoma: {
        en: 'Oklahoma',
        fr: 'Oklahoma_FR',
      },
      Oregon: {
        en: 'Oregon',
        fr: 'Oregon_FR',
      },
      Pennsylvania: {
        en: 'Pennsylvania',
        fr: 'Pennsylvania_FR',
      },
      'Rhode Island': {
        en: 'Rhode Island',
        fr: 'Rhode Island_FR',
      },
      'South Carolina': {
        en: 'South Carolina',
        fr: 'South Carolina_FR',
      },
      'South Dakota': {
        en: 'South Dakota',
        fr: 'South Dakota_FR',
      },
      Tennessee: {
        en: 'Tennessee',
        fr: 'Tennessee_FR',
      },
      Texas: {
        en: 'Texas',
        fr: 'Texas_FR',
      },
      Utah: {
        en: 'Utah',
        fr: 'Utah_FR',
      },
      Vermont: {
        en: 'Vermont',
        fr: 'Vermont_FR',
      },
      Virginia: {
        en: 'Virginia',
        fr: 'Virginia_FR',
      },
      Washington: {
        en: 'Washington',
        fr: 'Washington_FR',
      },
      'West Virginia': {
        en: 'West Virginia',
        fr: 'West Virginia_FR',
      },
      Wisconsin: {
        en: 'Wisconsin',
        fr: 'Wisconsin_FR',
      },
      Wyoming: {
        en: 'Wyoming',
        fr: 'Wyoming_FR',
      },
      Yukon: {
        en: 'Yukon',
        fr: 'Yukon_FR',
      },
      'Northwest Territories': {
        en: 'Northwest Territories',
        fr: 'Northwest Territories_FR',
      },
      Nunavut: {
        en: 'Nunavut',
        fr: 'Nunavut_FR',
      },
      'Newfoundland and Labrador': {
        en: 'Newfoundland and Labrador',
        fr: 'Newfoundland and Labrador_FR',
      },
      'Prince Edward Island': {
        en: 'Prince Edward Island',
        fr: 'Prince Edward Island_FR',
      },
      'British Columbia': {
        en: 'British Columbia',
        fr: 'British Columbia_FR',
      },
      Alberta: {
        en: 'Alberta',
        fr: 'Alberta_FR',
      },
      Saskatchewan: {
        en: 'Saskatchewan',
        fr: 'Saskatchewan_FR',
      },
      Manitoba: {
        en: 'Manitoba',
        fr: 'Manitoba_FR',
      },
      Ontario: {
        en: 'Ontario',
        fr: 'Ontario_FR',
      },
      Québec: {
        en: 'Québec',
        fr: 'Québec_FR',
      },
      'New Brunswick': {
        en: 'New Brunswick',
        fr: 'New Brunswick_FR',
      },
      'Nova Scotia': {
        en: 'Nova Scotia',
        fr: 'Nova Scotia_FR',
      },
      'Atlantic provinces and Quebec': {
        en: 'Atlantic provinces and Quebec',
        fr: 'Atlantic provinces and Quebec_FR',
      },
      'Other provinces and territories': {
        en: 'Other provinces and territories',
        fr: 'Other provinces and territories_FR',
      },
      Mexico: {
        en: 'Mexico',
        fr: 'Mexico_FR',
      },

      // south America
      Argentina: {
        en: 'Argentina',
        fr: 'Argentina_FR',
      },
      Bolivia: {
        en: 'Bolivia',
        fr: 'Bolivia_FR',
      },
      Brazil: {
        en: 'Brazil',
        fr: 'Brazil_FR',
      },
      Chile: {
        en: 'Chile',
        fr: 'Chile_FR',
      },
      Colombia: {
        en: 'Colombia',
        fr: 'Colombia_FR',
      },
      Ecuador: {
        en: 'Ecuador',
        fr: 'Ecuador_FR',
      },
      'French Guiana': {
        en: 'French Guiana',
        fr: 'French Guiana_FR',
      },
      Guyana: {
        en: 'Guyana',
        fr: 'Guyana_FR',
      },
      Paraguay: {
        en: 'Paraguay',
        fr: 'Paraguay_FR',
      },
      Peru: {
        en: 'Peru',
        fr: 'Peru_FR',
      },
      Suriname: {
        en: 'Suriname',
        fr: 'Suriname_FR',
      },
      Uruguay: {
        en: 'Uruguay',
        fr: 'Uruguay_FR',
      },
      Venezuela: {
        en: 'Venezuela',
        fr: 'Venezuela_FR',
      },
      Columbia: {
        en: 'Columbia',
        fr: 'Columbia_FR',
      },

      // Africa

      Algeria: {
        en: 'Algeria',
        fr: 'Algeria_FR',
      },
      Angola: {
        en: 'Angola',
        fr: 'Angola_FR',
      },
      Benin: {
        en: 'Benin',
        fr: 'Benin_FR',
      },
      Botswana: {
        en: 'Botswana',
        fr: 'Botswana_FR',
      },
      'Burkina Faso': {
        en: 'Burkina Faso',
        fr: 'Burkina Faso_FR',
      },
      Burundi: {
        en: 'Burundi',
        fr: 'Burundi_FR',
      },
      Cameroon: {
        en: 'Cameroon',
        fr: 'Cameroon_FR',
      },
      'Cape Verde': {
        en: 'Cape Verde',
        fr: 'Cape Verde_FR',
      },
      'Central African Republic': {
        en: 'Central African Republic',
        fr: 'Central African Republic_FR',
      },
      Chad: {
        en: 'Chad',
        fr: 'Chad_FR',
      },
      Comoros: {
        en: 'Comoros',
        fr: 'Comoros_FR',
      },
      Congo: {
        en: 'Congo',
        fr: 'Congo_FR',
      },
      Zaire: {
        en: 'Zaire',
        fr: 'Zaire_FR',
      },
      "Côte d'Ivoire": {
        en: "Côte d'Ivoire",
        fr: "Côte d'Ivoire_FR",
      },
      Djibouti: {
        en: 'Djibouti',
        fr: 'Djibouti_FR',
      },
      Egypt: {
        en: 'Egypt',
        fr: 'Egypt_FR',
      },
      'Equatorial Guinea': {
        en: 'Equatorial Guinea',
        fr: 'Equatorial Guinea_FR',
      },
      Eritrea: {
        en: 'Eritrea',
        fr: 'Eritrea_FR',
      },
      Ethiopia: {
        en: 'Ethiopia',
        fr: 'Ethiopia_FR',
      },
      Gabon: {
        en: 'Gabon',
        fr: 'Gabon_FR',
      },
      'The Gambia': {
        en: 'The Gambia',
        fr: 'The Gambia_FR',
      },
      Ghana: {
        en: 'Ghana',
        fr: 'Ghana_FR',
      },
      Guinea: {
        en: 'Guinea',
        fr: 'Guinea_FR',
      },
      Guine: {
        en: 'Guine',
        fr: 'Guine_FR',
      },
      Kenya: {
        en: 'Kenya',
        fr: 'Kenya_FR',
      },
      Lesotho: {
        en: 'Lesotho',
        fr: 'Lesotho_FR',
      },
      Liberia: {
        en: 'Liberia',
        fr: 'Liberia_FR',
      },
      Libya: {
        en: 'Libya',
        fr: 'Libya_FR',
      },
      Madagascar: {
        en: 'Madagascar',
        fr: 'Madagascar_FR',
      },
      Malawi: {
        en: 'Malawi',
        fr: 'Malawi_FR',
      },
      Mali: {
        en: 'Mali',
        fr: 'Mali_FR',
      },
      Mauritania: {
        en: 'Mauritania',
        fr: 'Mauritania_FR',
      },
      Mauritius: {
        en: 'Mauritius',
        fr: 'Mauritius_FR',
      },
      Morocco: {
        en: 'Morocco',
        fr: 'Morocco_FR',
      },
      Mozambique: {
        en: 'Mozambique',
        fr: 'Mozambique_FR',
      },
      Namibia: {
        en: 'Namibia',
        fr: 'Namibia_FR',
      },
      Niger: {
        en: 'Niger',
        fr: 'Niger_FR',
      },
      Nigeria: {
        en: 'Nigeria',
        fr: 'Nigeria_FR',
      },
      Rwanda: {
        en: 'Rwanda',
        fr: 'Rwanda_FR',
      },
      'São Tomé and Príncipe': {
        en: 'São Tomé and Príncipe',
        fr: 'São Tomé and Príncipe_FR',
      },
      Senegal: {
        en: 'Senegal',
        fr: 'Senegal_FR',
      },
      Seychelles: {
        en: 'Seychelles',
        fr: 'Seychelles_FR',
      },
      'Sierra Leone': {
        en: 'Sierra Leone',
        fr: 'Sierra Leone_FR',
      },
      Somalia: {
        en: 'Somalia',
        fr: 'Somalia_FR',
      },
      'South Africa': {
        en: 'South Africa',
        fr: 'South Africa_FR',
      },
      'South Sudan': {
        en: 'South Sudan',
        fr: 'South Sudan_FR',
      },
      Sudan: {
        en: 'Sudan',
        fr: 'Sudan_FR',
      },
      Swaziland: {
        en: 'Swaziland',
        fr: 'Swaziland_FR',
      },
      Tanzania: {
        en: 'Tanzania',
        fr: 'Tanzania_FR',
      },
      Togo: {
        en: 'Togo',
        fr: 'Togo_FR',
      },
      Tunisia: {
        en: 'Tunisia',
        fr: 'Tunisia_FR',
      },
      Uganda: {
        en: 'Uganda',
        fr: 'Uganda_FR',
      },
      'Western Sahara': {
        en: 'Western Sahara',
        fr: 'Western Sahara_FR',
      },
      Zambia: {
        en: 'Zambia',
        fr: 'Zambia_FR',
      },
      Zimbabwe: {
        en: 'Zimbabwe',
        fr: 'Zimbabwe_FR',
      },

      // oceania
      Australia: {
        en: 'Australia',
        fr: 'Australia_FR',
      },
      'Federated States of Micronesia': {
        en: 'Federated States of Micronesia',
        fr: 'Federated States of Micronesia_FR',
      },
      Fiji: {
        en: 'Fiji',
        fr: 'Fiji_FR',
      },
      Kiribati: {
        en: 'Kiribati',
        fr: 'Kiribati_FR',
      },
      'Marshall Islands': {
        en: 'Marshall Islands',
        fr: 'Marshall Islands_FR',
      },
      Nauru: {
        en: 'Nauru',
        fr: 'Nauru_FR',
      },
      'New Zealand': {
        en: 'New Zealand',
        fr: 'New Zealand_FR',
      },
      Palau: {
        en: 'Palau',
        fr: 'Palau_FR',
      },
      'Papua New Guinea': {
        en: 'Papua New Guinea',
        fr: 'Papua New Guinea_FR',
      },
      Samoa: {
        en: 'Samoa',
        fr: 'Samoa_FR',
      },
      'Solomon Islands': {
        en: 'Solomon Islands',
        fr: 'Solomon Islands_FR',
      },
      Tonga: {
        en: 'Tonga',
        fr: 'Tonga_FR',
      },
      Tuvalu: {
        en: 'Tuvalu',
        fr: 'Tuvalu_FR',
      },
      Vanuatu: {
        en: 'Vanuatu',
        fr: 'Vanuatu_FR',
      },

      // europe
      Albania: {
        en: 'Albania',
        fr: 'Albania_FR',
      },
      Andorra: {
        en: 'Andorra',
        fr: 'Andorra_FR',
      },
      Austria: {
        en: 'Austria',
        fr: 'Austria_FR',
      },
      Belarus: {
        en: 'Belarus',
        fr: 'Belarus_FR',
      },
      Belgium: {
        en: 'Belgium',
        fr: 'Belgium_FR',
      },
      'Bosnia and Herzegovina': {
        en: 'Bosnia and Herzegovina',
        fr: 'Bosnia and Herzegovina_FR',
      },
      Bulgaria: {
        en: 'Bulgaria',
        fr: 'Bulgaria_FR',
      },
      Croatia: {
        en: 'Croatia',
        fr: 'Croatia_FR',
      },
      Cyprus: {
        en: 'Cyprus',
        fr: 'Cyprus_FR',
      },
      'Czech Republic': {
        en: 'Czech Republic',
        fr: 'Czech Republic_FR',
      },
      Denmark: {
        en: 'Denmark',
        fr: 'Denmark_FR',
      },
      Estonia: {
        en: 'Estonia',
        fr: 'Estonia_FR',
      },
      Finland: {
        en: 'Finland',
        fr: 'Finland_FR',
      },
      France: {
        en: 'France',
        fr: 'France_FR',
      },
      Germany: {
        en: 'Germany',
        fr: 'Germany_FR',
      },
      Greece: {
        en: 'Greece',
        fr: 'Greece_FR',
      },
      Hungary: {
        en: 'Hungary',
        fr: 'Hungary_FR',
      },
      Iceland: {
        en: 'Iceland',
        fr: 'Iceland_FR',
      },
      'Republic of Ireland': {
        en: 'Republic of Ireland',
        fr: 'Republic of Ireland_FR',
      },
      Italy: {
        en: 'Italy',
        fr: 'Italy_FR',
      },
      Kosovo: {
        en: 'Kosovo',
        fr: 'Kosovo_FR',
      },
      Latvia: {
        en: 'Latvia',
        fr: 'Latvia_FR',
      },
      Liechtenstein: {
        en: 'Liechtenstein',
        fr: 'Liechtenstein_FR',
      },
      Lithuania: {
        en: 'Lithuania',
        fr: 'Lithuania_FR',
      },
      Luxembourg: {
        en: 'Luxembourg',
        fr: 'Luxembourg_FR',
      },
      Macedonia: {
        en: 'Macedonia',
        fr: 'Macedonia_FR',
      },
      Malta: {
        en: 'Malta',
        fr: 'Malta_FR',
      },
      Moldova: {
        en: 'Moldova',
        fr: 'Moldova_FR',
      },
      Monaco: {
        en: 'Monaco',
        fr: 'Monaco_FR',
      },
      Montenegro: {
        en: 'Montenegro',
        fr: 'Montenegro_FR',
      },
      Netherlands: {
        en: 'Netherlands',
        fr: 'Netherlands_FR',
      },
      Norway: {
        en: 'Norway',
        fr: 'Norway_FR',
      },
      Poland: {
        en: 'Poland',
        fr: 'Poland_FR',
      },
      Portugal: {
        en: 'Portugal',
        fr: 'Portugal_FR',
      },
      Romania: {
        en: 'Romania',
        fr: 'Romania_FR',
      },
      Russia: {
        en: 'Russia',
        fr: 'Russia_FR',
      },
      'San Marino': {
        en: 'San Marino',
        fr: 'San Marino_FR',
      },
      Serbia: {
        en: 'Serbia',
        fr: 'Serbia_FR',
      },
      Slovakia: {
        en: 'Slovakia',
        fr: 'Slovakia_FR',
      },
      Slovenia: {
        en: 'Slovenia',
        fr: 'Slovenia_FR',
      },
      Spain: {
        en: 'Spain',
        fr: 'Spain_FR',
      },
      Sweden: {
        en: 'Sweden',
        fr: 'Sweden_FR',
      },
      Switzerland: {
        en: 'Switzerland',
        fr: 'Switzerland_FR',
      },
      Ukraine: {
        en: 'Ukraine',
        fr: 'Ukraine_FR',
      },
      'United Kingdom': {
        en: 'U.K.',
        fr: 'UK_FR',
      },
      'Vatican City': {
        en: 'Vatican City',
        fr: 'Vatican City_FR',
      },

      // asia
      Afghanistan: {
        en: 'Afghanistan',
        fr: 'Afghanistan_FR',
      },
      Armenia: {
        en: 'Armenia',
        fr: 'Armenia_FR',
      },
      Azerbaijan: {
        en: 'Azerbaijan',
        fr: 'Azerbaijan_FR',
      },
      Bahrain: {
        en: 'Bahrain',
        fr: 'Bahrain_FR',
      },
      Bangladesh: {
        en: 'Bangladesh',
        fr: 'Bangladesh_FR',
      },
      Bhutan: {
        en: 'Bhutan',
        fr: 'Bhutan_FR',
      },
      Brunei: {
        en: 'Brunei',
        fr: 'Brunei_FR',
      },
      Cambodia: {
        en: 'Cambodia',
        fr: 'Cambodia_FR',
      },
      China: {
        en: 'China',
        fr: 'China_FR',
      },
      Taiwan: {
        en: 'Taiwan',
        fr: 'Taiwan_FR',
      },
      'East Timor': {
        en: 'East Timor',
        fr: 'East Timor_FR',
      },
      India: {
        en: 'India',
        fr: 'India_FR',
      },
      Indonesia: {
        en: 'Indonesia',
        fr: 'Indonesia_FR',
      },
      Iran: {
        en: 'Iran',
        fr: 'Iran_FR',
      },
      Iraq: {
        en: 'Iraq',
        fr: 'Iraq_FR',
      },
      Israel: {
        en: 'Israel',
        fr: 'Israel_FR',
      },
      Palestine: {
        en: 'Palestine',
        fr: 'Palestine_FR',
      },
      Japan: {
        en: 'Japan',
        fr: 'Japan_FR',
      },
      Jordan: {
        en: 'Jordan',
        fr: 'Jordan_FR',
      },
      Kazakhstan: {
        en: 'Kazakhstan',
        fr: 'Kazakhstan_FR',
      },
      Kuwait: {
        en: 'Kuwait',
        fr: 'Kuwait_FR',
      },
      Kyrgyzstan: {
        en: 'Kyrgyzstan',
        fr: 'Kyrgyzstan_FR',
      },
      Laos: {
        en: 'Laos',
        fr: 'Laos_FR',
      },
      Lebanon: {
        en: 'Lebanon',
        fr: 'Lebanon_FR',
      },
      Malaysia: {
        en: 'Malaysia',
        fr: 'Malaysia_FR',
      },
      Maldives: {
        en: 'Maldives',
        fr: 'Maldives_FR',
      },
      Mongolia: {
        en: 'Mongolia',
        fr: 'Mongolia_FR',
      },
      Myanmar: {
        en: 'Myanmar',
        fr: 'Myanmar_FR',
      },
      Nepal: {
        en: 'Nepal',
        fr: 'Nepal_FR',
      },
      'North Korea': {
        en: 'North Korea',
        fr: 'North Korea_FR',
      },
      Oman: {
        en: 'Oman',
        fr: 'Oman_FR',
      },
      Pakistan: {
        en: 'Pakistan',
        fr: 'Pakistan_FR',
      },
      Philippines: {
        en: 'Philippines',
        fr: 'Philippines_FR',
      },
      Qatar: {
        en: 'Qatar',
        fr: 'Qatar_FR',
      },
      'Saudi Arabia': {
        en: 'Saudi Arabia',
        fr: 'Saudi Arabia_FR',
      },
      Singapore: {
        en: 'Singapore',
        fr: 'Singapore_FR',
      },
      'South Korea': {
        en: 'South Korea',
        fr: 'South Korea_FR',
      },
      'Sri Lanka': {
        en: 'Sri Lanka',
        fr: 'Sri Lanka_FR',
      },
      Syria: {
        en: 'Syria',
        fr: 'Syria_FR',
      },
      Tajikistan: {
        en: 'Tajikistan',
        fr: 'Tajikistan_FR',
      },
      Thailand: {
        en: 'Thailand',
        fr: 'Thailand_FR',
      },
      Turkey: {
        en: 'Turkey',
        fr: 'Turkey_FR',
      },
      Turkmenistan: {
        en: 'Turkmenistan',
        fr: 'Turkmenistan_FR',
      },
      'United Arab Emirates': {
        en: 'United Arab Emirates',
        fr: 'United Arab Emirates_FR',
      },
      Uzbekistan: {
        en: 'Uzbekistan',
        fr: 'Uzbekistan_FR',
      },
      Vietnam: {
        en: 'Vietnam',
        fr: 'Vietnam_FR',
      },
      Yemen: {
        en: 'Yemen',
        fr: 'Yemen_FR',
      },

      'Other countries': {
        en: 'Low Volume Contributions',
        fr: 'Low Volume Contributions FR',
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
            en: 'imports from U.S.',
            fr: 'importations des États-Unis',
          },
        },
        exports: {
          label: {
            en: 'exports into U.S.',
            fr: 'exportations aux États-Unis',
          },
        },
        stateOrProvince: {
          en: 'state',
          fr: 'état',
        },
      },
    },
    crudeOilExports: {
      exports: {
        label: {
          en: 'exports into U.S. PADD',
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
    crudeOilImports: {
      imports: {
        label: {
          en: 'imports from CONTINENT',
          fr: 'les importations de CONTINENT',
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
            en: 'exports into U.S. PADD',
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
    average: {
      en: 'AVG',
      fr: 'MOY.',
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
    default: {
      en: 'Import & Export Points',
      fr: "Points d'importation & d'exportation",
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
      'East Hereford': {
        en: 'East Hereford',
        fr: 'East Hereford',
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
      'Willow Creek': {
        en: 'Willow Creek',
        fr: 'Willow Creek',
      },
      CNG: {
        en: 'CNG',
        fr: 'GNC',
      },
      'LNG Other': {
        en: 'LNG Other',
        fr: 'GNL Autre',
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
      'East Hereford': {
        en: 'East\nHereford',
        fr: 'East\nHereford',
      },
      Napierville: {
        en: 'Napier-\nville',
        fr: 'Napier-\nville',
      },
      Philipsburg: {
        en: 'Philips-\nburg',
        fr: 'Philips-\nburg',
      },
      Brunswick: {
        en: 'Bruns-\nwick',
        fr: 'Bruns-\nwick',
      },
      'St Stephen': {
        en: 'St\nStephen',
        fr: 'St\nStephen',
      },
      CNG: {
        en: 'CNG',
        fr: 'GNC',
      },
      'LNG Other': {
        en: 'LNG\nOther',
        fr: 'GNL\nAutre',
      },
    },
  },
})

export default TranslationTable
