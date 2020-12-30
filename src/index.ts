import { User } from './models/User';

const user = new User({
  id: 1
});

user.set({
  name: 'David',
  age: 39
});

const user2 = new User({});

user2.set({
  name: 'Finch',
  age: 39
});

user2.save();

user.save();
