const PubSub = require('../helpers/pub_sub.js');

const IntensityView = function (container) {
  this.container = container;
};

IntensityView.prototype.bindEvents = function(){
  PubSub.subscribe('Regions:carbon-intensity-ready', (evt) => {
    const carbonIntensity = evt.detail;
    this.render(carbonIntensity);
    this.renderTopContainer(carbonIntensity);
  });
};

IntensityView.prototype.render = function(carbonIntensity){

const textIntensity = this.createElement('h2', 'Current Carbon Intensity');
this.container.appendChild(textIntensity);
const intensityElement = this.createElement('h2', `${carbonIntensity.actual} gCO2/kWh`);
this.container.appendChild(intensityElement);
};

IntensityView.prototype.renderTopContainer = function(carbonIntensity) {

  const intensityContainer = document.querySelector('div#container-intensity');

  const intensityElement = this.createElement('h2', `${carbonIntensity.actual} gCO2/kWh`);
  intensityContainer.appendChild(intensityElement);
}

IntensityView.prototype.createElement = function(elementType, text){
  const element = document.createElement(elementType);
  element.textContent = text;

  return element;
}

module.exports = IntensityView;
