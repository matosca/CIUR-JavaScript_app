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
intensityElement.insertAdjacentHTML('beforeend', '<br><div><small>gCO<sub>2</sub>/kWh</small></div>');
this.styleAccordingToIndex(carbonIntensity, intensityElement);
this.container.appendChild(intensityElement);
};

IntensityView.prototype.renderTopContainer = function(carbonIntensity) {

  const intensityContainer = document.querySelector('#heading');

  const intensityElement = this.createElement('div', `${carbonIntensity.actual}`);
  intensityElement.classList.add('intensity');
  this.styleAccordingToIndex(carbonIntensity, intensityElement);

  const breakElement = document.createElement('br');

  const textIntensity = document.createElement('div');
  textIntensity.insertAdjacentHTML('beforeend', '<small>gCO<sub>2</sub>/kWh</small>');

  intensityElement.appendChild(breakElement);
  intensityElement.appendChild(textIntensity);

  intensityContainer.appendChild(intensityElement);
};

IntensityView.prototype.styleAccordingToIndex = function(carbonIntensity, element){
  const carbonIndex = carbonIntensity.index;

  switch (carbonIndex) {
    case "very low":
      element.style.color = "#1E773C";
      break;
    case "low":
      element.style.color = "#6DC68F";
      break;
    case "moderate":
      element.style.color = "#ECBA10";
      break;
    case "high":
      element.style.color = "#DD691B";
      break;
    case "very high":
      element.style.color = "#97201C"
  }

  return carbonIndex;
};


IntensityView.prototype.createElement = function(elementType, text){
  const element = document.createElement(elementType);
  element.textContent = text;

  return element;
};


module.exports = IntensityView;
