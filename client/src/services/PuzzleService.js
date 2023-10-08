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
  getTodaysRankedPuzzle() {
    return Api().get('/puzzle/today/ranked')
  }
  getTodaysPuzzleNumber() {
    return Api().get('/puzzle/today/number')
  }
  getPuzzleSubmission() {
    return Api().get('/puzzle/submission')
  }
  createPuzzleSubmission() {
    return Api().post('/puzzle/submission')
  }
  submitCasual(puzzleProgress) {
    return Api().post('/puzzle/submit/casual', { puzzleProgress })
  }
  submitRanked(word, date) {
    return Api().post('/puzzle/submit/ranked', { word, date })
  }
}

const service = new PuzzleService()

export default service
