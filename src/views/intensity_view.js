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
const intensityElement = this.createElement('h2', `${carbonIntensity.actual}`);
intensityElement.insertAdjacentHTML('beforeend', '<br><div>gCO<sub>2</sub>/kWh</div>');
this.container.appendChild(intensityElement);
};

IntensityView.prototype.renderTopContainer = function(carbonIntensity) {

  const intensityContainer = document.querySelector('#heading');

  const intensityElement = this.createElement('div', `${carbonIntensity.actual}`);
  intensityElement.classList.add('intensity');

  const breakElement = document.createElement('br');

  const textIntensity = this.createElement('div', 'gCO');
  textIntensity.insertAdjacentHTML('beforeend', '<sub>2</sub>/kWh');

  intensityElement.appendChild(breakElement);
  intensityElement.appendChild(textIntensity);

  intensityContainer.appendChild(intensityElement);
};


IntensityView.prototype.createElement = function(elementType, text){
  const element = document.createElement(elementType);
  element.textContent = text;

  return element;
};


module.exports = IntensityView;
