import { Model } from '../models/Model';

export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {};

  abstract template(): string;

  constructor(public parent: Element, public model: T) {
    this.detectChange();
  }

  eventsMap = (): { [key: string]: () => void } => {
    return {};
  };

  regionMap = (): { [key: string]: string } => {
    return {};
  };

  detectChange = (): void => {
    this.model.on('change', () => {
      this.render();
    });
  };

  bindEvents(html: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let eventArr in eventsMap) {
      const [event, node] = eventArr.split(':');
      const nodes = html.querySelectorAll(node);
      nodes.forEach((node) => {
        node.addEventListener(event, eventsMap[eventArr]);
      });
    }
  }

  mapRegions = (html: DocumentFragment): void => {
    const regionsMap = this.regionMap();

    for (let region in regionsMap) {
      const selector = regionsMap[region];
      const node = html.querySelector(selector);
      if (node) {
        this.regions[region] = node;
      }
    }
  };

  renderChildProp(): void {}

  render(): void {
    this.parent.innerHTML = '';
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content);
    // render
    this.renderChildProp();
    this.parent.appendChild(templateElement.content);
  }
}
