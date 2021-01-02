import { Collection } from '../models/Collection';
import { User, UserProps } from '../models/User';

export abstract class CollectionView<T, K> {
  constructor(public parent: Element, public collection: Collection<T, K>) {}

  abstract renderItem(model: T, itemParent: Element): void;

  render(): void {
    this.parent.innerHTML = '';

    const templateElement = document.createElement('template');

    for (let model of this.collection.instances) {
      const wrapper = document.createElement('div');
      this.renderItem(model, wrapper);
      templateElement.content.append(wrapper);
    }

    this.parent.append(templateElement.content);
  }
}
