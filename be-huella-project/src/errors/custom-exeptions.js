export class NotFound extends Error {
  constructor(msg, statusCode) {
    super(msg);
    this.name = this.constructor.name;
    this.statusCode = statusCode || 404;
  }
}

export class Unathorized extends Error {
  constructor(msg, statusCode) {
    super(msg);
    this.name = this.constructor.name;
    this.statusCode = statusCode || 401;
  }
}

export class BadRequest extends Error {
  constructor(msg, statusCode) {
    super(msg);
    this.name = this.constructor.name;
    this.statusCode = statusCode || 400;
  }
}

export class Forbidden extends Error {
  constructor(msg, statusCode) {
    super(msg);
    this.name = this.constructor.name;
    this.statusCode = statusCode || 403;
  }
}

export class ServerError extends Error {
  constructor(msg, statusCode) {
    super(msg);
    this.name = this.constructor.name;
    this.statusCode = statusCode || 500;
  }
}
