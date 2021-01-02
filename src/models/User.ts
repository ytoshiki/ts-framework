import { Model } from './Model';
import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { ApiSync } from './ApiSync';
import { Collection } from './Collection';

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const url = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
  static BuildUser(attrs: UserProps): User {
    return new User(new Attributes<UserProps>(attrs), new ApiSync<UserProps>(url), new Eventing());
  }

  static BuildCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(url, User.BuildUser);
  }

  setRandomAge(): void {
    const age = Math.round(Math.random() * 100);
    this.set({ age });
  }
}
