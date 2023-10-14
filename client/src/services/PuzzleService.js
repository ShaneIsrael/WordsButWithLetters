import Api from './Api'

class PuzzleService {
  getRandomWords(count = 1) {
    return Api().get('/word/random', { params: { count } })
  }
  validateWord(word) {
    return Api().get('/word/validate', { params: { word } })
  }
  getTodaysCasualPuzzle() {
    return Api().get('/puzzle/today/casual')
  }
  getTodaysRankedPuzzle() {
    return Api().get('/puzzle/today/ranked')
  }
  getTodaysPuzzleNumber() {
    return Api().get('/puzzle/today/number')
  }
  getCasualPuzzleSubmission() {
    return Api().get('/puzzle/casual/submission')
  }
  createCasualPuzzleSubmission() {
    return Api().post('/puzzle/casual/submission')
  }
  submitCasual(word, date) {
    return Api().post('/puzzle/submit/casual', { word, date })
  }
  getPuzzleSubmission() {
    return Api().get('/puzzle/submission')
  }
  createPuzzleSubmission() {
    return Api().post('/puzzle/submission')
  }
  submitRanked(word, date) {
    return Api().post('/puzzle/submit/ranked', { word, date })
  }
}

const service = new PuzzleService()

export default service
