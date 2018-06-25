La version franÃ§aise suit.

# [Pipeline Incident Visualization](https://apps2.neb-one.gc.ca/pipeline-incidents)

## About

This Incidents at NEB-Regulated Pipeline and Facilities interactive online tool is part of the National Energy Boardâ€™s (NEB) Data Visualization Initiative (DVI). The DVI is a three-year initiative to transform how the NEB structures and shares data. The objective is to enable evidence-based decision making and remove barriers to understanding Canadaâ€™s energy and pipeline systems through the use of user-friendly interactive visualizations. This visualization is based on NEB data from 2008 to current for incidents reported under the Onshore Pipeline Regulations and the Processing Plant Regulation. In the months and years to come we will use this innovative format to share our pipeline safety data, energy data series, energy infrastructure information, and a host of other topical data. In addition, other online tools can be found in the [NEB Safety Performance Portal](https://www.neb-one.gc.ca/sftnvrnmnt/sft/dshbrd/index-eng.html).

If you want to use the data for research and undertake your own review, all the data is downloadable and shareable. The chart images are also downloadable

We hope we are hitting the mark. Your feedback is essential.

Email us with your comments and ideas: energyindesign@neb-one.gc.ca. We look forward to hearing from you.

## About this Repository
This repository includes the code and data needed to run a local version of the incident visualization app. 

You can download and run the application code to see how it was built and explore the data on your own computer. (If you only want to explore the visualization, you may want to [view the app](https://apps2.neb-one.gc.ca/pipeline-incidents) on the NEB's website.) 

## Prerequisites

- [Node + NPM](https://nodejs.org/en/) > v6.10
- Git
- *optional* [Screenshot Service](https://github.com/NEBGitHub/screenshot-service_service-copie-d-ecran) application

## Installing and Running

Follow these instructions at the command line tool on your computer (Powershell or CMD on Windows, Terminal on MacOS, Konsole or similar on GNU/Linux).

- Download a local copy of the source code: `git clone git@github.com:NEBGitHub/incidents-pipeliniers_pipeline-incidents.git incidents`
- Change into the incidents directory: `cd incidents`
- Install project dependencies: `npm install`
- Run the development server: `npm run start`
- Visit [http://localhost:3001/pipeline-incidents]() in your browser.

## Building for deployment

The deployment build of the incident visualization is intended for use with the NEB's hosting environment, and may not be of much interest to the public. In the project folder, run:

- `npm run build`

This produces `public/script/bundle.js`, a single file version of the app. If this file is present, it is used pereferentially by the development server rather than the code under `app/`.

## Contributors

### Data Source

Andrew Benson, Karen Duckworth, Randy Cooke

### Coordination

Annette Hester (Concept and Coordination); Katherine Murphy (Project Manager); Faiza Hussain (Administrative support); Stephen Chow (Data Coordination)

### Data Visualization

Lead Design Research: Sheelagh Carpendale and Wesley Willett, iLab, University of Calgary.

Design: Bon Adriel Aseniero, Peter Buk, Shreya Chopra, SÃ¸ren Knudsen, Doris Kosminsky, Claudia Maurer, Lien Quach, Katrina Tabuli, Annie Tat, Jo Vermeulen, Jagoda Walny Nix, and Mieka West.

### Lead Technical: Vizworx

Technical: Patrick King, Alaa Azazi, Charlie Cheung, Abhishek Sharma, and Ben Cousins

## Contact Us

We're the development team with VizworX who put this project together for the NEB. We aren't able to provide extensive support for this project, but you're welcome to reach out with questions and thoughts!

* Patrick King - patrick.king@vizworx.com
* Alaa Azazi - alaa.azazi@vizworx.com
* Charlie Cheung - charlie.cheung@vizworx.com
* Ben Cousins - ben.cousins@vizworx.com

## License
All of the project materials are licensed under the [Open Government License - Canada](http://open.canada.ca/en/open-government-licence-canada).

## Third Party Licenses

Fonts: Fira fonts used under the Open Font License Version 1.1.

[Map of Canada](http://www.arcgis.com/home/item.html?id=dcbcdf86939548af81efbd2d732336db)
 Â© 2003 Government of Canada with permission from Natural Resources Canada.

Map: â€œMap showing provinces and territories reporting 2009 swine flu (H1N1) cases in Canadaâ€ by Fonadier from [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:H1N1_Canada_map.svg). Licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/deed.en). (Re-coloured and rotated from original.)

Tell Me A Story icon: by Bon Adriel Aseniero. Licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).

Methodology icon: [Process by Rflor](https://thenounproject.com/rflor/collection/infography-circles/?oq=methodology&cidx=0&i=363475) from [thenounproject.com](http://thenounproject.com/). Licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/deed.en).

Reset icon: [Reset by Mooms](https://thenounproject.com/search/?q=reset&i=1033424) from [thenounproject.com](http://thenounproject.com/). Licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/deed.en).

Facebook icon: By Elegant Themes from [www.flaticon.com](https://www.flaticon.com). Licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/deed.en).


# [Visualisation des incidents pipeliniers](https://apps2.neb-one.gc.ca/incidents-pipeliniers/)

## Le Projet

Lâ€™outil interactif Â« Incidents impliquant des installations et des pipelines rÃ©glementÃ©s Â» fait partie de lâ€™initiative de visualisation des donnÃ©es de lâ€™Office national de lâ€™Ã©nergie. Ã‰chelonnÃ©e sur trois ans, cette initiative vise Ã  transformer la maniÃ¨re dont lâ€™Office structure et diffuse ses donnÃ©es. Elle a pour objectif de favoriser un processus dÃ©cisionnel fondÃ© sur la preuve et de faciliter la comprÃ©hension des questions liÃ©es aux rÃ©seaux Ã©nergÃ©tiques et pipeliniers du Canada, grÃ¢ce Ã  un outil de visualisation interactif, facile Ã  utiliser. Lâ€™outil prÃ©sente les donnÃ©es recueillies par lâ€™Office de 2008 Ã  aujourdâ€™hui en ce qui concerne les incidents signalÃ©s en application du RÃ¨glement de lâ€™Office national de lâ€™Ã©nergie sur les pipelines terrestres et du RÃ¨glement sur les usines de traitement. Au cours des mois et des annÃ©es Ã  venir, lâ€™Office utilisera cet outil novateur pour diffuser ses donnÃ©es sur la sÃ©curitÃ© des pipelines et sur lâ€™Ã©nergie, lâ€™information quâ€™il possÃ¨de sur lâ€™infrastructure Ã©nergÃ©tique et une foule dâ€™autres renseignements spÃ©cialisÃ©s. Par ailleurs, le portail [Rendement en matiÃ¨re de sÃ©curitÃ©](https://www.neb-one.gc.ca/sftnvrnmnt/sft/dshbrd/index-fra.html) comporte dâ€™autres outils interactifs en ligne.

Si vous souhaitez utiliser les donnÃ©es pour vos recherches ou pour en faire votre propre analyse, vous pouvez les tÃ©lÃ©charger et les partager. Les graphiques peuvent aussi Ãªtre tÃ©lÃ©chargÃ©s.

Nous espÃ©rons avoir atteint notre objectif. Votre rÃ©troaction est essentielle.
  
Vous pouvez nous la faire parvenir, ainsi que vos suggestions, Ã  lâ€™adresse : conceptionenergie@neb-one.gc.ca. Votre opinion compte.


## Le rÃ©fÃ©rentiel

Le rÃ©fÃ©rentiel contient le code et les donnÃ©es nÃ©cessaires Ã  lâ€™utilisation dâ€™une version locale de lâ€™application de visualisation des incidents. 
Vous pouvez tÃ©lÃ©charger et exÃ©cuter le code dâ€™application pour voir comment il a Ã©tÃ© construit et examiner les donnÃ©es sur votre propre ordinateur. (Si vous voulez simplement explorer les possibilitÃ©s de visualisation, vous pouvez [voir lâ€™application](http://apps2.neb-one.gc.ca/incidents-pipeliniers) sur le site Web de lâ€™Office.) 

## Produits prÃ©alables

- [Node + NPM](https://nodejs.org/fr/) > v6.10
- Git
- *facultatif* [Service de prise dâ€™instantanÃ© dâ€™Ã©cran](https://github.com/NEBGitHub/screenshot-service_service-copie-d-ecran)

## Installation et utilisation

Suivez les instructions Ã  partir de la ligne de commande de votre ordinateur (Powershell ou CMD dans Windows, Terminal dans MacOS, Konsole ou lâ€™Ã©quivalent dans GNU/Linux).

- TÃ©lÃ©chargez le code source pour en avoir une copie localeÂ : `git clone git@github.com:NEBGitHub/incidents-pipeliniers_pipeline-incidents.git incidents`
- Passez au rÃ©pertoire des incidentsÂ : `cd incidents`
- Installez les dÃ©pendancesÂ : `npm install`
- Lancez le serveur de dÃ©veloppementÂ : `npm run start`
- Dans votre navigateur, allez Ã  la page [http://localhost:3001/pipeline-incidents]().

## DÃ©veloppement en vue du dÃ©ploiement

La version de dÃ©ploiement de lâ€™application de visualisation des incidents est conÃ§ue pour Ãªtre utilisÃ©e avec l'environnement hÃ´te de lâ€™Office et pourrait ne pas Ãªtre dâ€™un grand intÃ©rÃªt pour le public. Dans le dossier du projet, exÃ©cutez la commande suivanteÂ :

- `npm run build`

Une version de lâ€™application Ã  un seul fichier sera crÃ©Ã©e (`public/script/bundle.js`). Lorsque ce fichier est prÃ©sent, le serveur de dÃ©veloppement lâ€™utilise de prÃ©fÃ©rence au code sous `app/`.

## Les contributeurs

### Source des donnÃ©es

Andrew Benson, Karen Duckworth, Randy Cooke

### Coordination

Annette Hester (conception et coordination); Katherine Murphy (gestionnaire de projet); Faiza Hussain (Soutien administratif); Stephen Chow (coordination des donnÃ©es)

### Visualisation des donnÃ©es

Recherche conceptuelle sous la direction de Sheelagh Carpendale et Wesley Willett, iLab, UniversitÃ© de Calgary

Conception : Bon Adriel Aseniero, Peter Buk, Shreya Chopra, SÃ¸ren Knudsen, Doris Kosminsky, Claudia Maurer, Lien Quach, Katrina Tabuli, Annie Tat, Jo Vermeulen, Jagoda Walny Nix, and Mieka West.

### Chef technique Ã  Vizworx

Aspect technique : Patrick King, Alaa Azazi, Charlie Cheung, Abhishek Sharma, and Ben Cousins


## Contactez-nous

Nous sommes lâ€™Ã©quipe de dÃ©veloppement de VizworX qui a rÃ©alisÃ© le projet pour le compte de lâ€™Office. Nous ne sommes pas en mesure dâ€™assurer un soutien complet du projet, mais vos questions et vos suggestions sont les bienvenues!

* Patrick King, patrick.king@vizworx.com
* Alaa Azazi, alaa.azazi@vizworx.com
* Charlie Cheung, charlie.cheung@vizworx.com
* Ben Cousins, ben.cousins@vizworx.com

## Licence

Toutes les composantes du projet sont visÃ©es par la [licence du gouvernement ouvert â€“ Canada](http://ouvert.canada.ca/fr/licence-du-gouvernement-ouvert-canada).

## Licence accordÃ©e par un tiers

PoliceÂ : Police Fira, en vertu de la licence de police de caractÃ¨res libre (version 1.1)

[Carte du Canada](http://www.arcgis.com/home/item.html?id=dcbcdf86939548af81efbd2d732336db) Â© 2003 Gouvernement du Canada, avec la permission de Ressources naturelles Canada

Carte : Carte produite par Fonadier illustrant les provinces et territoires selon les signalements de cas de grippe A (H1N1), tirÃ©e de [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:H1N1_Canada_map.svg) et portant la licence [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/deed.en). (Lâ€™original a Ã©tÃ© recolorÃ© et pivotÃ©.)

IcÃ´ne Une histoire Ã  raconter? : CrÃ©Ã©e par Bon Adriel Aseniero et portant la licence [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).

IcÃ´ne MÃ©thodologie : [CrÃ©Ã©e par Rflor](https://thenounproject.com/rflor/collection/infography-circles/?oq=methodology&cidx=0&i=363475), tirÃ©e de [thenounproject.com](http://thenounproject.com/) et portant la licence [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/deed.en).

IcÃ´ne rÃ©initialiser : [CrÃ©Ã©e par Mooms](https://thenounproject.com/search/?q=reset&i=1033424), tirÃ©e de [thenounproject.com](http://thenounproject.com/) et portant la licence [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/deed.en).

IcÃ´ne Facebook : CrÃ©Ã©e par Elegant Themes, tirÃ©e de [www.flaticon.com](https://www.flaticon.com) et portant la licence [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/deed.en).

