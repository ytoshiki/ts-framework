import { AxiosPromise, AxiosResponse, AxiosError } from 'axios';

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface Attributes<T> {
  get<K extends keyof T>(key: K): T[K];
  set(update: T): void;
  getAll(): T;
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(private attributes: Attributes<T>, private sync: Sync<T>, private events: Events) {}

  public on = this.events.on;

  public trigger = this.events.trigger;

  public get = this.attributes.get;

  get getAll() {
    return this.attributes.getAll;
  }

  set(update: T) {
    this.attributes.set(update);
    this.trigger('change');
  }

  fetch(): void {
    const id = this.attributes.get('id');
    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id');
    }

    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }

  save(): void {
    const data: T = this.attributes.getAll();
    this.sync
      .save(data)
      .then((resonse: AxiosResponse): void => {
        this.trigger('save');
      })
      .catch((err: AxiosError) => {
        this.trigger('catch');
      });
  }
}
