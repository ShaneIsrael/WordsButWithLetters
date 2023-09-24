import { useEffect, useState } from 'react'

const useCountdown = (targetDate) => {
  const countDownDate = new Date(targetDate).getTime()

  const [countDown, setCountDown] = useState(countDownDate - new Date().getTime())

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime())
    }, 1000)

    return () => clearInterval(interval)
  }, [countDownDate])

  return getReturnValues(countDown)
}

const getReturnValues = (countDown) => {
  if (countDown < 0) return [0, 0]

  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
  let seconds = Math.floor((countDown % (1000 * 60)) / 1000)
  if (seconds < 10) seconds = `${0}${seconds}`
  if (seconds <= 0) seconds = '00'

  return [minutes, seconds]
}

export { useCountdown }
