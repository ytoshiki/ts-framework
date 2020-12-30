import { User } from './models/User';

const user = new User({});
user.set({ name: 'Justin' });
console.log(user.get('name'));
user.on('click', () => {
  console.log('do it');
});
user.on('click', () => {
  console.log('or sleep');
});
user.on('change', () => {});
user.trigger('click');

console.log(user);
