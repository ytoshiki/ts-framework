export type Callback = () => void;

export class Eventing {
  events: { [key: string]: Callback[] } = {};

  on = (event: string, callback: Callback): void => {
    const handlers = this.events[event] || [];
    handlers.push(callback);
    this.events[event] = handlers;
  };

  trigger = (event: string): void => {
    const handlers = this.events[event];

    if (!handlers || handlers.length === 0) {
      return;
    }

    handlers.forEach((handler) => {
      handler();
    });
  };
}
