// default 알 수 없는 에러
class UnexpectedError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 500;
    this.name = 'UnexpectedError';
  }
}

class NotFoundError extends Error {
  constructor(message, status) {
    super(message);
    this.stauts = status || 404;
    this.name = 'Not Found Error';
  }
}

module.exports = {
  UnexpectedError,
  NotFoundError,
};
