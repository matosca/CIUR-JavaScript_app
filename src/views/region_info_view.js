const PubSub = require('../helpers/pub_sub.js');
const IntensityView = require('./intensity_view.js');


const RegionInfoView = function (container) {
  this.container = container;
};

RegionInfoView.prototype.bindEvents = function () {
  PubSub.subscribe('Regions:region-clicked-ready', (event) => {
    const regionDetails = event.detail;
    this.render(regionDetails);

    const dataFuels = this.chartifyDataFuels(regionDetails);
    PubSub.publish('RegionInfoView:data-fuels-ready', dataFuels);
  });
};

RegionInfoView.prototype.render = function (region) {
  this.container.innerHTML = '';

  const detailsContainer = this.createDetailContainer(region);
  this.container.appendChild(detailsContainer);
}

RegionInfoView.prototype.createDetailContainer = function (region) {
  const container = document.createElement('div');
  container.classList.add('details-box');

  const heading = this.createElement('h2', `${region.shortname}`);
  container.appendChild(heading);

  const carbonIntensity = this.createElement('h3', `${region.intensity.forecast} gCO2/kWh` );
  container.appendChild(carbonIntensity);

  const carbonIndexElement = this.createElement('h4', `${region.intensity.index}`);
  carbonIndexElement.setAttribute("id", "carbon-index");
  this.styleAccordingToIndex(region, carbonIndexElement);
  container.appendChild(carbonIndexElement);

  return container;
};

RegionInfoView.prototype.styleAccordingToIndex = function(region, element){
  const carbonIndex = region.intensity.index;

  switch (carbonIndex) {
    case "very low":
      element.style.color = "green";
      break;
    case "low":
      element.style.color = "green";
      break;
    case "moderate":
      element.style.color = "orange";
      break;
    case "high":
      element.style.color = "red";
      break;
  }

  return carbonIndex;
};

RegionInfoView.prototype.chartifyDataFuels = function (region) {
  const data = [];
  const regionFuels = region.generationmix;
  for (let key in regionFuels) {
    const info = [];

    if (regionFuels[key].perc !== 0) {
      info.push(regionFuels[key].fuel);
      info.push(regionFuels[key].perc);
      data.push(info);
    }
  }
  return data;
};


RegionInfoView.prototype.createElement = function (elementType, text) {
  const element = document.createElement(elementType);
  element.textContent = text;
  return element;
};


module.exports = RegionInfoView;
