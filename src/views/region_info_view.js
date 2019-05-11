const PubSub = require('../helpers/pub_sub.js');

const RegionInfoView = function (container) {
  this.container = container;
};

RegionInfoView.prototype.bindEvents = function () {
  PubSub.subscribe('Regions:region-clicked-ready', (event) => {
    const regionDetails = event.detail;
    // console.log(event.detail);
    this.render(regionDetails);
    const dataFuels = this.chartifyDataFuels(regionDetails);

    PubSub.publish('RegionInfoView:data-fuels-ready', dataFuels);
  });
};

RegionInfoView.prototype.render = function (region) {
  this.container.innerHTML = '';

  const heading = this.createHeading(region);
  const detailsContainer = this.createDetailContainer(region);
  const fuelsContainer = this.createListOfFuels(region);

  this.container.appendChild(heading);
  this.container.appendChild(detailsContainer);
  this.container.appendChild(fuelsContainer);
}

RegionInfoView.prototype.createHeading = function (region) {
  const heading = this.createElement('h2', `${region.shortname}`);
  // console.log("heading", heading);
  return heading;
};
RegionInfoView.prototype.createDetailContainer = function (region) {
  const container = document.createElement('div');
  container.classList.add('details-box');

  // const dnoregion = this.createElement('h3', `${region.dnoregion}`);
  // container.appendChild(dnoregion);

  const carbonIntensity = this.createElement('h4', `${region.intensity.index} - ${region.intensity.forecast} GW` );
  container.appendChild(carbonIntensity);

  return container;
};

RegionInfoView.prototype.createListOfFuels = function (region) {
  const container = document.createElement('div');
  container.classList.add('fuels-box');

  const list = this.populateListOfFuels(region);

  container.appendChild(list);

  return container;
};

RegionInfoView.prototype.populateListOfFuels = function (region) {
  const fuelsList = document.createElement('ul');
  const regionFuels = region.generationmix;

  regionFuels.forEach( (region, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${region.fuel} (${region.perc}%)`;
    listItem.id = index;

    fuelsList.appendChild(listItem);
  })

  return fuelsList;
};

RegionInfoView.prototype.chartifyDataFuels = function (region) {
  const data = [];
  const regionFuels = region.generationmix;
  for (let key in regionFuels) {
    const info = [];
    info.push(regionFuels[key].fuel);
    info.push(regionFuels[key].perc);
    data.push(info);
  }
  console.log('data of fuels', data);
  return data;
}


RegionInfoView.prototype.createElement = function (elementType, text) {
  const element = document.createElement(elementType);
  element.textContent = text;
  return element;
};


module.exports = RegionInfoView;
