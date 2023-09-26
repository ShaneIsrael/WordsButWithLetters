import Api from './Api'

class PuzzleService {
  getRandomWords(count = 1) {
    return Api().get('/word/random', { params: { count } })
  }
  validateWord(word) {
    return Api().get('/word/validate', { params: { word } })
  }
  getTodaysPuzzle() {
    return Api().get('/puzzle/today')
  }
  submit(puzzleProgress) {
    return Api().post('/puzzle/submit', { puzzleProgress })
  }
}

const service = new PuzzleService()

export default service
