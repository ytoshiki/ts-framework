import { Eventing } from './Eventing';
import axios, { AxiosResponse } from 'axios';

export class Collection<T, K> {
  instances: T[] = [];
  events: Eventing = new Eventing();

  constructor(public url: string, public deserialize: (data: K) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.url).then((response: AxiosResponse) => {
      response.data.forEach((userData: K) => {
        const user = this.deserialize(userData);
        this.instances.push(user);
      });
      this.trigger('change');
    });
  }
}
