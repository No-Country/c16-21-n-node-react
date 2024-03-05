export default class UserDto {
  constructor(user) {
    this.username = user.username;
    this.role = user.role;
    this.email = user.email;
    this.id = user.id;
  }
}
