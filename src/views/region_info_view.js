const PubSub = require('../helpers/pub_sub.js');

const RegionInfoView = function (container) {
  this.container = container;
};

RegionInfoView.prototype.bindEvents = function () {
  PubSub.subscribe('Regions:region-clicked-ready', (event) => {
    const regionDetails = event.detail;
    // console.log(event.detail);
    this.render(regionDetails);
  });
};

RegionInfoView.prototype.render = function (region) {
  this.container.innerHTML = '';

  const heading = this.createHeading(region);

  this.container.appendChild(heading);

}

RegionInfoView.prototype.createHeading = function (regions) {
  // console.log('name', regions.shortname);
  const heading = this.createElement('h2', `${regions.shortname}`);
  // console.log("heading", heading);
  return heading;
}

RegionInfoView.prototype.createElement = function (elementType, text) {
  const element = document.createElement(elementType);
  element.textContent = text;
  return element;
};


module.exports = RegionInfoView;
