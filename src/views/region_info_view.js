const PubSub = require('../helpers/pub_sub.js');

const RegionInfoView = function (container) {
  this.container = container;
};

RegionInfoView.prototype.bindEvents = function () {
  PubSub.subscribe('Regions:region-clicked-ready', (event) => {
    const regionDetails = event.detail;
    console.log(event.detail);
    this.render(regionDetails);
  });
};

RegionInfoView.prototype.render = function (region) {
  this.container.innerHTML = '';

  const heading = this.createHeading(region);

  this.container.appendChild(heading);

}

RegionInfoView.prototype.createHeading = function (dataObject) {
  const dataRegions = dataObject.data[0].regions;
  const shortname = dataRegions.shortname;
  const heading = this.createElement('h2', `${shortname}`);
  console.log(heading);
  return heading;
}

RegionInfoView.prototype.createElement = function (elementType, text) {
  const element = document.createElement(elementType);
  element.textContent = text;
  return element;
};


module.exports = RegionInfoView;
