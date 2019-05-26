const PubSub = require('../helpers/pub_sub.js');

const IntensityView = function () {
  
};

IntensityView.prototype.bindEvents = function(){
  PubSub.subscribe('Regions:carbon-intensity-ready', (evt) => {
    const carbonIntensity = evt.detail;
    this.renderTopContainer(carbonIntensity);
    this.renderMapImage()
  });
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

IntensityView.prototype.renderMapImage = function () {
  const container = document.querySelector('#heading');

  const imgContainer = document.createElement('div');
  imgContainer.classList.add('map-box');

  const imageElement = document.createElement('img');
  imageElement.src = '../public/img/iu.png';
  imageElement.alt = 'Great Britain blank grey map';

  imgContainer.appendChild(imageElement);
  container.appendChild(imgContainer);
}

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
