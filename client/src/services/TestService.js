import Api from './Api'

class TestService {
  protected() {
    return Api().get('/protected')
  }
}

export default new TestService()
