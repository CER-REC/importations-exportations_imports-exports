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
      en: 'loading visualization',
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
      en: 'This online tool portrays imports and exports of energy products to and from Canada. It is part of the Canada Energy Regulator’s (CER) Data Visualization Initiative (DVI). The DVI is a three-year initiative to transform how the CER structures and shares data. The objective is to enable evidence-based decision making and remove barriers to understanding Canada’s energy and pipeline systems through the use of user-friendly interactive visualizations.',
      fr: 'Cet outil en ligne trace un portrait des importations au Canada et des exportations du Canada des produits énergétiques. Il fait partie de l’initiative de visualisation des données de la Régie de l’énergie du Canada. Échelonnée sur trois ans, cette initiative vise à transformer la manière dont la Régie (anciennement appelée l’Office national de l’énergie) structure et diffuse ses données. Elle a pour objectif de favoriser un processus décisionnel fondé sur la preuve et de faciliter la compréhension des questions liées aux réseaux énergétiques et pipeliniers du Canada, grâce à des visualisations interactives, faciles à utiliser.',
    },
    p2: {
      en: 'This visualization show quarterly energy trade data between Canada and the U.S. since 1985, with the exception of electricity data which is available back to 1990.',
      fr: 'Cette visualisation présente les données trimestrielles sur le commerce de l’énergie entre le Canada et les États-Unis depuis 1985, à l’exception des données concernant l’électricité, qui ne sont disponibles que depuis 1990.',
    },
    p3: {
      en: 'If you want to use the data for research and undertake your own review, all the data is downloadable and shareable. If you are interested in the source code for the visualizations, it is available on the government’s Open Government portal: ',
      fr: 'Si vous souhaitez utiliser les données pour vos recherches ou pour en faire votre propre analyse, vous pouvez les télécharger et les partager. Quant au code source des visualisations, il est accessible sur le portail du « gouvernement ouvert » à l’adresse',
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
      en: 'energyindesign@cer-rec.gc.ca',
      fr: 'conceptionenergie@cer-rec.gc.ca',
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
      fr: 'Pétrole brut Importations',
    },
    crudeOilExports: {
      en: 'Crude Oil Exports',
      fr: 'Pétrole brut Exportations',
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
      fr: 'de ',
    },
    ofElectricity: {
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
    en: 'values Confidential',
    fr: 'valeurs Confidentiel',
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
      en: 'Electricity data is available publicly with the origins, destinations, volumes, and prices aggregated monthly by permit number. An exception is that there are no prices provided for Manitoba Hydro contract-specific permits due to a legal requirement and the CER confidentiality rules.',
      fr: 'Les données sur l’électricité sont accessibles au public. Elles précisent les points d’origine et de destination, la quantité et le prix, de manière agrégée mensuellement, par numéro de permis. Il y a une exception à cette règle : aucune valeur n’est indiquée pour les permis propres à un contrat en particulier de Manitoba Hydro en raison d’une obligation juridique et des règles de la Régie en matière de confidentialité.',
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
    barChartCrudeOilImports: {
      en: 'Each orange bar shows the total crude oil that Canadian regions imported during a single quarter.',
      fr: 'Chaque barre orange montre la quantité totale de pétrole brut que les régions canadiennes ont importée au cours d’un trimestre.',
    },
    reset: {
      en: 'This visualization shows electricity imports to Canada and exports from Canada. Drag the timeline bars to select a time period. Click a region to view details. Value includes capacity charge.',
      fr: 'Cette visualization montre les importations d’électricité à destination du Canada et les exportations en provenance du Canada. Faites glisser les poignées pour sélectionner une autre période. Cliquez sur une région pour voir les details. La valeur inclut la charge de capacité.',
    },
    resetCrudeOilImports: {
      en: 'This visualization shows crude oil imports to Canada. Drag the timeline bars to select a time period. Click a region to view details.',
      fr: 'Cette visualization montre les importations de pétrole brut à destination du Canada. Faites glisser les poignées pour sélectionner une autre période. Cliquez sur une région pour voir les details.',
    },
    resetCrudeOilExports: {
      en: 'This visualization shows crude oil exports from Canada. Drag the timeline bars to select a time period. Click a region to view details.',
      fr: 'Cette visualization montre les exportations de pétrole brut en provenance du Canada. Faites glisser les poignées pour sélectionner une autre période. Cliquez sur une région pour voir les details.',
    },
    resetNaturalGas: {
      en: 'This visualization shows natural gas imports to Canada and exports from Canada. Drag the timeline bars to select a time period. Click a region to view details.',
      fr: 'Cette visualization montre les importations de gaz naturel à destination du Canada et les exportations en provenance du Canada. Faites glisser les poignées pour sélectionner une autre période. Cliquez sur une région pour voir les details.',
    },
    resetNaturalGasLiquids: {
      en: 'This visualization shows natural gas liquid imports to Canada and exports from Canada. Drag the timeline bars to select a time period. Click a region to view details.',
      fr: 'Cette visualization montre les importations de liquides de gaz naturel à destination du Canada et les exportations en provenance du Canada. Faites glisser les poignées pour sélectionner une autre période. Cliquez sur une région pour voir les details.',
    },
    resetRefinedPetroleumProducts: {
      en: 'This visualization shows refined petroleum product exports from Canada. Drag the timeline bars to select a time period. Click a region to view details.',
      fr: 'Cette visualization montre les exportations de produit pétrolier raffiné en provenance du Canada. Faites glisser les poignées pour sélectionner une autre période. Cliquez sur une région pour voir les details.',
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
    inconsistencies: {
      en: 'All of the data presented here is considered non-confidential when summed or averaged on a quarterly basis. Any other period selected by the user (multi-quarter, annual, multi-annual) reflects a sum or average of this same data. \n\nOther CER data sources provide data considered non-confidential when summed or averaged over different periods (monthly, annual) and this can result in different values than are indicated here (less data may be non-confidential monthly, more data may be non-confidential annually). Both are correct for the original period on which they are based, although the values may be different.',
      fr: 'Toutes les données présentées ici sont jugées non confidentielles lorsqu’elles représentent une somme ou une moyenne calculée trimestriellement. Toute période choisie par l’utilisateur (plurisemestrielle, annuelle, pluriannuelle) correspond à une somme ou une moyenne des mêmes données. \n\nD’autres sources de données de la Régie fournissent des données jugées non confidentielles représentant une somme ou une moyenne sur diverses périodes (mensuelle, annuelle); cela peut donner lieu à des valeurs différentes, comme indiqué ici (une quantité inférieure de données pourraient être jugées non confidentielles mensuellement, une quantité supérieure de données pourraient être jugées non confidentielles annuellement). Dans les deux cas, les quantités sont exactes pour la période originale sur laquelle elles se fondent, bien que les valeurs puissent être différentes.',
    },
    modeCrude: {
      en: 'Pipeline volumes include minor volumes exported by truck. In most instances, these trucked volumes would be considered confidential if indicated separately. Further, in quarters where Marine volumes are confidential (occurs in 14 quarters between 1985 and 1995), these Marine volumes are included in Pipeline volumes. Further, in quarters where Rail volumes are confidential (occurs in six quarters between 1992 and 2011), these rail volumes are included in Pipeline volumes. This is done to prevent the back-calculation of confidential values.',
      fr: 'Les volumes transportés par pipeline comprennent de faibles volumes transportés par camion. Dans la plupart des cas, ces volumes seraient jugés confidentiels s’ils étaient présentés séparément. En outre, aux semestres où les volumes transportés par voie maritime sont jugés confidentiels (14 semestres de 1985 à 1995), ceux-ci sont inclus dans les volumes transportés par pipeline. Aux semestres où les volumes transportés par chemin de fer sont jugés confidentiels (six semestres de 1992 à 2011), ceux-ci sont inclus dans les volumes transportés par pipeline également. On cherche ainsi à éviter le calcul rétroactif des valeurs confidentielles.',
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
      en: 'Quebec and the Atlantic regions are grouped due to confidentiality rules that prevent reporting of data when minimal companies are reporting in a region. Learn more about our confidentiality rules in our methodology.',
      fr: 'Québec et les régions de l’Atlantique sont regroupées en raison de règles de confidentialité qui interdisent la publication de données relatives à une région ne comptant que peu de sociétés. La méthode fait état des règles de confidentialité.',
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
    en: 'This visualization shows the quarterly energy trade data between Canada and the U.S. for various energy sources. New data is added quarterly. The last update was: 2019-12-31.',
    fr: 'Cette visualisation illustre les données trimestrielles sur les échanges énergétiques entre le Canada et les États-Unis pour diverses sources d’énergie. De nouvelles données sont ajoutées tous les trimestres. Plus récente mise à jour : 2019-12-31.',
  },
  mainSubheadingCrudeOilImports: {
    en: 'This visualization shows the quarterly energy trade data between Canada and the world for various energy sources. New data is added quarterly. The last update was: 2019-12-31.',
    fr: 'Cette visualisation illustre les données trimestrielles sur les échanges énergétiques entre le Canada et le monde pour diverses sources d’énergie. De nouvelles données sont ajoutées tous les trimestres. Plus récente mise à jour : 2019-12-31.',
  },
  resetLabel: {
    en: 'reset',
    fr: 'réinitialisation',
  },

  socialBarText: {
    about: {
      en: 'about',
      fr: 'à propos',
    },
    methodology: {
      en: 'methodology',
      fr: 'méthodologie',
    },
    downloadData: {
      en: 'download data',
      fr: 'téléchargement de données',
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
      en: 'CER_imports_exports_data.csv',
      fr: 'REC_importations_exportations_les_donnees.csv',
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
        en: 'Quebec',
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
        en: 'Quebec and\nAtlantic Regions',
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
        fr: 'Contributions\nà faible volume',
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
        en: 'IMPORTS\nTO CANADA',
        fr: 'IMPORTATIONS\nAU CANADA',
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
        fr: 'NON-É.-U.',
      },
      Mexico: {
        en: 'MEXICO',
        fr: 'MEXIQUE',
      },
    },
    world: {
      'United States': {
        en: 'U.S.',
        fr: 'É.-U.',
      },
      Alabama: {
        en: 'Alabama',
        fr: 'Alabama',
      },
      Alaska: {
        en: 'Alaska',
        fr: 'Alaska',
      },
      Arizona: {
        en: 'Arizona',
        fr: 'Arizona',
      },
      Arkansas: {
        en: 'Arkansas',
        fr: 'Arkansas',
      },
      California: {
        en: 'California',
        fr: 'Californie',
      },
      Colorado: {
        en: 'Colorado',
        fr: 'Colorado',
      },
      Connecticut: {
        en: 'Connecticut',
        fr: 'Connecticut',
      },
      Delaware: {
        en: 'Delaware',
        fr: 'Delaware',
      },
      Florida: {
        en: 'Florida',
        fr: 'Floride',
      },
      Georgia: {
        en: 'Georgia',
        fr: 'Georgie',
      },
      Hawaii: {
        en: 'Hawaii',
        fr: 'Hawaï',
      },
      Idaho: {
        en: 'Idaho',
        fr: 'Idaho',
      },
      Illinois: {
        en: 'Illinois',
        fr: 'Illinois',
      },
      Indiana: {
        en: 'Indiana',
        fr: 'Indiana',
      },
      Iowa: {
        en: 'Iowa',
        fr: 'Iowa',
      },
      Kansas: {
        en: 'Kansas',
        fr: 'Kansas',
      },
      Kentucky: {
        en: 'Kentucky',
        fr: 'Kentucky',
      },
      Louisiana: {
        en: 'Louisiana',
        fr: 'Louisiane',
      },
      Maine: {
        en: 'Maine',
        fr: 'Maine',
      },
      Maryland: {
        en: 'Maryland',
        fr: 'Maryland',
      },
      Massachusetts: {
        en: 'Massachusetts',
        fr: 'Massachusetts',
      },
      Michigan: {
        en: 'Michigan',
        fr: 'Michigan',
      },
      Minnesota: {
        en: 'Minnesota',
        fr: 'Minnesota',
      },
      Mississippi: {
        en: 'Mississippi',
        fr: 'Mississippi',
      },
      Missouri: {
        en: 'Missouri',
        fr: 'Missouri',
      },
      Montana: {
        en: 'Montana',
        fr: 'Montana',
      },
      Nebraska: {
        en: 'Nebraska',
        fr: 'Nebraska',
      },
      Nevada: {
        en: 'Nevada',
        fr: 'Nevada',
      },
      'New Hampshire': {
        en: 'New Hampshire',
        fr: 'New Hampshire',
      },
      'New Jersey': {
        en: 'New Jersey',
        fr: 'New Jersey',
      },
      'New Mexico': {
        en: 'New Mexico',
        fr: 'Nouveau-Mexique',
      },
      'New York': {
        en: 'New York',
        fr: 'New York',
      },
      'North Carolina': {
        en: 'North Carolina',
        fr: 'Caroline du Nord',
      },
      'North Dakota': {
        en: 'North Dakota',
        fr: 'Dakota du Nord',
      },
      Ohio: {
        en: 'Ohio',
        fr: 'Ohio',
      },
      Oklahoma: {
        en: 'Oklahoma',
        fr: 'Oklahoma',
      },
      Oregon: {
        en: 'Oregon',
        fr: 'Oregon',
      },
      Pennsylvania: {
        en: 'Pennsylvania',
        fr: 'Pennsylvanie',
      },
      'Rhode Island': {
        en: 'Rhode Island',
        fr: 'Rhode Island',
      },
      'South Carolina': {
        en: 'South Carolina',
        fr: 'Caroline du Sud',
      },
      'South Dakota': {
        en: 'South Dakota',
        fr: 'Dakota du Sud',
      },
      Tennessee: {
        en: 'Tennessee',
        fr: 'Tennessee',
      },
      Texas: {
        en: 'Texas',
        fr: 'Texas',
      },
      Utah: {
        en: 'Utah',
        fr: 'Utah',
      },
      Vermont: {
        en: 'Vermont',
        fr: 'Vermont',
      },
      Virginia: {
        en: 'Virginia',
        fr: 'Virginie',
      },
      Washington: {
        en: 'Washington',
        fr: 'Washington',
      },
      'West Virginia': {
        en: 'West Virginia',
        fr: 'Virginie-Occidentale',
      },
      Wisconsin: {
        en: 'Wisconsin',
        fr: 'Wisconsin',
      },
      Wyoming: {
        en: 'Wyoming',
        fr: 'Wyoming',
      },
      Yukon: {
        en: 'Yukon',
        fr: 'Yukon',
      },
      'Northwest Territories': {
        en: 'Northwest Territories',
        fr: 'Territoires du Nord-Ouest',
      },
      Nunavut: {
        en: 'Nunavut',
        fr: 'Nunavut',
      },
      'Newfoundland and Labrador': {
        en: 'Newfoundland and Labrador',
        fr: 'Terre-Neuve-et-Labrador',
      },
      'Prince Edward Island': {
        en: 'Prince Edward Island',
        fr: 'Île-du-Prince-Édouard',
      },
      'British Columbia': {
        en: 'British Columbia',
        fr: 'Colombie-Britannique',
      },
      Alberta: {
        en: 'Alberta',
        fr: 'Alberta',
      },
      Saskatchewan: {
        en: 'Saskatchewan',
        fr: 'Saskatchewan',
      },
      Manitoba: {
        en: 'Manitoba',
        fr: 'Manitoba',
      },
      Ontario: {
        en: 'Ontario',
        fr: 'Ontario',
      },
      Québec: {
        en: 'Quebec',
        fr: 'Québec',
      },
      'New Brunswick': {
        en: 'New Brunswick',
        fr: 'Nouveau-Brunswick',
      },
      'Nova Scotia': {
        en: 'Nova Scotia',
        fr: 'Nouvelle-Écosse',
      },
      'Atlantic provinces and Quebec': {
        en: 'Quebec and Atlanic Regions',
        fr: 'Québec et Régions de l’Atlantique',
      },
      'Other provinces and territories': {
        en: 'Other provinces and territories',
        fr: 'Autres provinces et territoires',
      },
      Mexico: {
        en: 'Mexico',
        fr: 'Mexique',
      },

      // south America
      Argentina: {
        en: 'Argentina',
        fr: 'Argentine',
      },
      Bolivia: {
        en: 'Bolivia',
        fr: 'Bolivie',
      },
      Brazil: {
        en: 'Brazil',
        fr: 'Brésil',
      },
      Chile: {
        en: 'Chile',
        fr: 'Chili',
      },
      Colombia: {
        en: 'Colombia',
        fr: 'Colombie',
      },
      Ecuador: {
        en: 'Ecuador',
        fr: 'Équateur',
      },
      'French Guiana': {
        en: 'French Guiana',
        fr: 'Guyane Française',
      },
      Guyana: {
        en: 'Guyana',
        fr: 'Guyana',
      },
      Paraguay: {
        en: 'Paraguay',
        fr: 'Paraguay',
      },
      Peru: {
        en: 'Peru',
        fr: 'Pérou',
      },
      Suriname: {
        en: 'Suriname',
        fr: 'Suriname',
      },
      Uruguay: {
        en: 'Uruguay',
        fr: 'Uruguay',
      },
      Venezuela: {
        en: 'Venezuela',
        fr: 'Venezuela',
      },
      Columbia: {
        en: 'Columbia',
        fr: 'Colombie',
      },

      // Africa

      Algeria: {
        en: 'Algeria',
        fr: 'Algérie',
      },
      Angola: {
        en: 'Angola',
        fr: 'Angola',
      },
      Benin: {
        en: 'Benin',
        fr: 'Bénin',
      },
      Botswana: {
        en: 'Botswana',
        fr: 'Botswana',
      },
      'Burkina Faso': {
        en: 'Burkina Faso',
        fr: 'Burkina Faso',
      },
      Burundi: {
        en: 'Burundi',
        fr: 'Burundi',
      },
      Cameroon: {
        en: 'Cameroon',
        fr: 'Cameroun',
      },
      'Cape Verde': {
        en: 'Cape Verde',
        fr: 'Cabo Verde',
      },
      'Central African Republic': {
        en: 'Central African Republic',
        fr: 'République centrafricaine',
      },
      Chad: {
        en: 'Chad',
        fr: 'Tchad',
      },
      Comoros: {
        en: 'Comoros',
        fr: 'Comores',
      },
      Congo: {
        en: 'Congo',
        fr: 'Congo',
      },
      Zaire: {
        en: 'Zaire',
        fr: 'Zaïre',
      },
      "Côte d'Ivoire": {
        en: "Côte d'Ivoire",
        fr: 'Côte d’Ivoire',
      },
      Djibouti: {
        en: 'Djibouti',
        fr: 'Djibouti',
      },
      Egypt: {
        en: 'Egypt',
        fr: 'Égypte',
      },
      'Equatorial Guinea': {
        en: 'Equatorial Guinea',
        fr: 'Guinée équatoriale',
      },
      Eritrea: {
        en: 'Eritrea',
        fr: 'Érythrée',
      },
      Ethiopia: {
        en: 'Ethiopia',
        fr: 'Éthiopie',
      },
      Gabon: {
        en: 'Gabon',
        fr: 'Gabon',
      },
      'The Gambia': {
        en: 'The Gambia',
        fr: 'Gambie',
      },
      Ghana: {
        en: 'Ghana',
        fr: 'Ghana',
      },
      Guinea: {
        en: 'Guinea',
        fr: 'Guinée',
      },
      Guine: {
        en: 'Guine',
        fr: 'Guinée',
      },
      Kenya: {
        en: 'Kenya',
        fr: 'Kenya',
      },
      Lesotho: {
        en: 'Lesotho',
        fr: 'Lesotho',
      },
      Liberia: {
        en: 'Liberia',
        fr: 'Libéria',
      },
      Libya: {
        en: 'Libya',
        fr: 'Libye',
      },
      Madagascar: {
        en: 'Madagascar',
        fr: 'Madagascar',
      },
      Malawi: {
        en: 'Malawi',
        fr: 'Malawi',
      },
      Mali: {
        en: 'Mali',
        fr: 'Mali',
      },
      Mauritania: {
        en: 'Mauritania',
        fr: 'Mauritanie',
      },
      Mauritius: {
        en: 'Mauritius',
        fr: 'Maurice',
      },
      Morocco: {
        en: 'Morocco',
        fr: 'Maroc',
      },
      Mozambique: {
        en: 'Mozambique',
        fr: 'Mozambique',
      },
      Namibia: {
        en: 'Namibia',
        fr: 'Namibie',
      },
      Niger: {
        en: 'Niger',
        fr: 'Niger',
      },
      Nigeria: {
        en: 'Nigeria',
        fr: 'Nigéria',
      },
      Rwanda: {
        en: 'Rwanda',
        fr: 'Rwanda',
      },
      'São Tomé and Príncipe': {
        en: 'São Tomé and Príncipe',
        fr: 'Sao Tomé-et-Principe',
      },
      Senegal: {
        en: 'Senegal',
        fr: 'Sénégal',
      },
      Seychelles: {
        en: 'Seychelles',
        fr: 'Seychelles',
      },
      'Sierra Leone': {
        en: 'Sierra Leone',
        fr: 'Sierra Leone',
      },
      Somalia: {
        en: 'Somalia',
        fr: 'Somalie',
      },
      'South Africa': {
        en: 'South Africa',
        fr: 'Afrique du Sud',
      },
      'South Sudan': {
        en: 'South Sudan',
        fr: 'Soudan du Sud',
      },
      Sudan: {
        en: 'Sudan',
        fr: 'Soudan',
      },
      Swaziland: {
        en: 'Swaziland',
        fr: 'Swaziland',
      },
      Tanzania: {
        en: 'Tanzania',
        fr: 'Tanzanie',
      },
      Togo: {
        en: 'Togo',
        fr: 'Togo',
      },
      Tunisia: {
        en: 'Tunisia',
        fr: 'Tunisie',
      },
      Uganda: {
        en: 'Uganda',
        fr: 'Ouganda',
      },
      'Western Sahara': {
        en: 'Western Sahara',
        fr: 'République arabe sahraouie démocratique',
      },
      Zambia: {
        en: 'Zambia',
        fr: 'Zambie',
      },
      Zimbabwe: {
        en: 'Zimbabwe',
        fr: 'Zimbabwe',
      },

      // oceania
      Australia: {
        en: 'Australia',
        fr: 'Australie',
      },
      'Federated States of Micronesia': {
        en: 'Federated States of Micronesia',
        fr: 'États fédérés de Micronésie',
      },
      Fiji: {
        en: 'Fiji',
        fr: 'Fidji',
      },
      Kiribati: {
        en: 'Kiribati',
        fr: 'Kiribati',
      },
      'Marshall Islands': {
        en: 'Marshall Islands',
        fr: 'Îles Marshall',
      },
      Nauru: {
        en: 'Nauru',
        fr: 'Nauru',
      },
      'New Zealand': {
        en: 'New Zealand',
        fr: 'Nouvelle-Zélande',
      },
      Palau: {
        en: 'Palau',
        fr: 'Palaos',
      },
      'Papua New Guinea': {
        en: 'Papua New Guinea',
        fr: 'Papouasie-Nouvelle-Guinée',
      },
      Samoa: {
        en: 'Samoa',
        fr: 'Samoa',
      },
      'Solomon Islands': {
        en: 'Solomon Islands',
        fr: 'Îles Salomon',
      },
      Tonga: {
        en: 'Tonga',
        fr: 'Tonga',
      },
      Tuvalu: {
        en: 'Tuvalu',
        fr: 'Tuvalu',
      },
      Vanuatu: {
        en: 'Vanuatu',
        fr: 'Vanuatu',
      },

      // europe
      Albania: {
        en: 'Albania',
        fr: 'Albanie',
      },
      Andorra: {
        en: 'Andorra',
        fr: 'Andorre',
      },
      Austria: {
        en: 'Austria',
        fr: 'Andorre',
      },
      Belarus: {
        en: 'Belarus',
        fr: 'Bélarus',
      },
      Belgium: {
        en: 'Belgium',
        fr: 'Belgique',
      },
      'Bosnia and Herzegovina': {
        en: 'Bosnia and Herzegovina',
        fr: 'Bosnie-Herzégovine',
      },
      Bulgaria: {
        en: 'Bulgaria',
        fr: 'Bulgarie',
      },
      Croatia: {
        en: 'Croatia',
        fr: 'Croatie',
      },
      Cyprus: {
        en: 'Cyprus',
        fr: 'Chypre',
      },
      'Czech Republic': {
        en: 'Czech Republic',
        fr: 'République tchèque',
      },
      Denmark: {
        en: 'Denmark',
        fr: 'Danemark',
      },
      Estonia: {
        en: 'Estonia',
        fr: 'Estonie',
      },
      Finland: {
        en: 'Finland',
        fr: 'Finlande',
      },
      France: {
        en: 'France',
        fr: 'France',
      },
      Germany: {
        en: 'Germany',
        fr: 'Allemagne',
      },
      Greece: {
        en: 'Greece',
        fr: 'Grèce',
      },
      Hungary: {
        en: 'Hungary',
        fr: 'Hongrie',
      },
      Iceland: {
        en: 'Iceland',
        fr: 'Islande',
      },
      'Republic of Ireland': {
        en: 'Republic of Ireland',
        fr: 'Irlande',
      },
      Italy: {
        en: 'Italy',
        fr: 'Italie',
      },
      Kosovo: {
        en: 'Kosovo',
        fr: 'Kosovo',
      },
      Latvia: {
        en: 'Latvia',
        fr: 'Lettonie',
      },
      Liechtenstein: {
        en: 'Liechtenstein',
        fr: 'Liechtenstein',
      },
      Lithuania: {
        en: 'Lithuania',
        fr: 'Lithuanie',
      },
      Luxembourg: {
        en: 'Luxembourg',
        fr: 'Luxembourg',
      },
      Macedonia: {
        en: 'Macedonia',
        fr: 'Macédoine',
      },
      Malta: {
        en: 'Malta',
        fr: 'Malte',
      },
      Moldova: {
        en: 'Moldova',
        fr: 'Moldova',
      },
      Monaco: {
        en: 'Monaco',
        fr: 'Monaco',
      },
      Montenegro: {
        en: 'Montenegro',
        fr: 'Monténégro',
      },
      Netherlands: {
        en: 'Netherlands',
        fr: 'Pays-Bas',
      },
      Norway: {
        en: 'Norway',
        fr: 'Norvège',
      },
      Poland: {
        en: 'Poland',
        fr: 'Pologne',
      },
      Portugal: {
        en: 'Portugal',
        fr: 'Portugal',
      },
      Romania: {
        en: 'Romania',
        fr: 'Roumanie',
      },
      Russia: {
        en: 'Russia',
        fr: 'Russie',
      },
      'San Marino': {
        en: 'San Marino',
        fr: 'Saint-Marin',
      },
      Serbia: {
        en: 'Serbia',
        fr: 'Serbie',
      },
      Slovakia: {
        en: 'Slovakia',
        fr: 'Slovaquie',
      },
      Slovenia: {
        en: 'Slovenia',
        fr: 'Slovénie',
      },
      Spain: {
        en: 'Spain',
        fr: 'Espagne',
      },
      Sweden: {
        en: 'Sweden',
        fr: 'Suède',
      },
      Switzerland: {
        en: 'Switzerland',
        fr: 'Suisse',
      },
      Ukraine: {
        en: 'Ukraine',
        fr: 'Ukraine',
      },
      'United Kingdom': {
        en: 'U.K.',
        fr: 'RU',
      },
      'Vatican City': {
        en: 'Vatican City',
        fr: 'Cité du Vatican',
      },

      // asia
      Afghanistan: {
        en: 'Afghanistan',
        fr: 'Afghanistan',
      },
      Armenia: {
        en: 'Armenia',
        fr: 'Arménie',
      },
      Azerbaijan: {
        en: 'Azerbaijan',
        fr: 'Azerbaïdjan',
      },
      Bahrain: {
        en: 'Bahrain',
        fr: 'Bahreïn',
      },
      Bangladesh: {
        en: 'Bangladesh',
        fr: 'Bangladesh',
      },
      Bhutan: {
        en: 'Bhutan',
        fr: 'Bhoutan',
      },
      Brunei: {
        en: 'Brunei',
        fr: 'Bandar Seri Begawan',
      },
      Cambodia: {
        en: 'Cambodia',
        fr: 'Cambodge',
      },
      China: {
        en: 'China',
        fr: 'Chine',
      },
      Taiwan: {
        en: 'Taiwan',
        fr: 'Taïwan',
      },
      'East Timor': {
        en: 'East Timor',
        fr: 'Timor-Oriental',
      },
      India: {
        en: 'India',
        fr: 'Inde',
      },
      Indonesia: {
        en: 'Indonesia',
        fr: 'Indonésie',
      },
      Iran: {
        en: 'Iran',
        fr: 'Iran',
      },
      Iraq: {
        en: 'Iraq',
        fr: 'Iraq',
      },
      Israel: {
        en: 'Israel',
        fr: 'Israël',
      },
      Palestine: {
        en: 'Palestine',
        fr: 'Palestine',
      },
      Japan: {
        en: 'Japan',
        fr: 'Japon',
      },
      Jordan: {
        en: 'Jordan',
        fr: 'Jordanie',
      },
      Kazakhstan: {
        en: 'Kazakhstan',
        fr: 'Kazakhstan',
      },
      Kuwait: {
        en: 'Kuwait',
        fr: 'Koweït',
      },
      Kyrgyzstan: {
        en: 'Kyrgyzstan',
        fr: 'Kirghizistan',
      },
      Laos: {
        en: 'Laos',
        fr: 'Laos',
      },
      Lebanon: {
        en: 'Lebanon',
        fr: 'Liban',
      },
      Malaysia: {
        en: 'Malaysia',
        fr: 'Malaisie',
      },
      Maldives: {
        en: 'Maldives',
        fr: 'Maldives',
      },
      Mongolia: {
        en: 'Mongolia',
        fr: 'Mongolie',
      },
      Myanmar: {
        en: 'Myanmar',
        fr: 'Myanmar',
      },
      Nepal: {
        en: 'Nepal',
        fr: 'Népal',
      },
      'North Korea': {
        en: 'North Korea',
        fr: 'Corée du Nord',
      },
      Oman: {
        en: 'Oman',
        fr: 'Oman',
      },
      Pakistan: {
        en: 'Pakistan',
        fr: 'Pakistan',
      },
      Philippines: {
        en: 'Philippines',
        fr: 'Philippines',
      },
      Qatar: {
        en: 'Qatar',
        fr: 'Qatar',
      },
      'Saudi Arabia': {
        en: 'Saudi Arabia',
        fr: 'Arabie saoudite',
      },
      Singapore: {
        en: 'Singapore',
        fr: 'Singapour',
      },
      'South Korea': {
        en: 'South Korea',
        fr: 'Corée du Sud',
      },
      'Sri Lanka': {
        en: 'Sri Lanka',
        fr: 'Sri Lanka',
      },
      Syria: {
        en: 'Syria',
        fr: 'Syrie',
      },
      Tajikistan: {
        en: 'Tajikistan',
        fr: 'Tadjikistan',
      },
      Thailand: {
        en: 'Thailand',
        fr: 'Thaïlande',
      },
      Turkey: {
        en: 'Turkey',
        fr: 'Turquie',
      },
      Turkmenistan: {
        en: 'Turkmenistan',
        fr: 'Turkménistan',
      },
      'United Arab Emirates': {
        en: 'United Arab Emirates',
        fr: 'Émirats Arabes Unis',
      },
      Uzbekistan: {
        en: 'Uzbekistan',
        fr: 'Ouzbékistan',
      },
      Vietnam: {
        en: 'Vietnam',
        fr: 'Vietnam',
      },
      Yemen: {
        en: 'Yemen',
        fr: 'Yémen',
      },

      'Other countries': {
        en: 'Low Volume Contributions',
        fr: 'Correspondant à de Faibles Volume',
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
