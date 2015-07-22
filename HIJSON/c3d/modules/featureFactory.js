// (1) dependencies
var utilities = require('./utilities.js');

// (2) private things
var featureClasses = {};
featureClasses['Feature'] = require('../features/Feature.js');
featureClasses['Antenna'] = require('../features/Antenna.js');
featureClasses['BadgeReader'] = require('../features/BadgeReader.js');
featureClasses['Chair'] = require('../features/Chair.js');
featureClasses['Door'] = require('../features/Door.js');
featureClasses['External_wall'] = require('../features/External_wall.js');
featureClasses['FireExtinguisher'] = require('../features/FireExtinguisher.js');
featureClasses['GraphNode'] = require('../features/GraphNode.js');
featureClasses['Hotspot'] = require('../features/Hotspot.js');
featureClasses['Internal_wall'] = require('../features/Internal_wall.js');
featureClasses['Level'] = require('../features/Level.js');
featureClasses['Light'] = require('../features/Light.js');
featureClasses['Room'] = require('../features/Room.js');
featureClasses['Server'] = require('../features/Server.js');
featureClasses['SurveillanceCamera'] = require('../features/SurveillanceCamera.js');
featureClasses['Table'] = require('../features/Table.js');
featureClasses['Window'] = require('../features/Window.js');
featureClasses['Stair'] = require('../features/Stair.js');
featureClasses['Bed'] = require('../features/Bed.js');
featureClasses['Scalini'] = require('../features/Scalini.js');
featureClasses['Appendiabiti'] = require('../features/Appendiabiti.js');
featureClasses['Lettino'] = require('../features/Lettino.js');
featureClasses['ReneArtificiale'] = require('../features/ReneArtificiale.js');
featureClasses['SerieSedie'] = require('../features/SerieSedie.js');
featureClasses['Reception'] = require('../features/Reception.js');
featureClasses['Parallele'] = require('../features/Parallele.js');
featureClasses['Pallone'] = require('../features/Pallone.js');
featureClasses['Spalliera'] = require('../features/Spalliera.js');
featureClasses['Divisorio'] = require('../features/Divisorio.js');
featureClasses['LettinoFisio'] = require('../features/LettinoFisio.js');
featureClasses['Cestino'] = require('../features/Cestino.js');
featureClasses['PoltronaChemio'] = require('../features/PoltronaChemio.js');
featureClasses['Lavandino'] = require('../features/Lavandino.js');
featureClasses['Letto'] = require('../features/Letto.js');
featureClasses['Water'] = require('../features/Water.js');



function capitaliseFirstLetter(featureClass) {
	return featureClass.charAt(0).toUpperCase() + featureClass.slice(1);
}

// (3) public/exported things
var self = module.exports = {
	generateFeature: function(feature) {
		var newFeature;
		var featureClass = capitaliseFirstLetter(feature.properties.class);
		if (featureClass in featureClasses) {
			newFeature = new featureClasses[featureClass](feature);
		} else {
			newFeature = new featureClasses['Feature'](feature);
		}
		return newFeature;
	}
}; //close module.exports