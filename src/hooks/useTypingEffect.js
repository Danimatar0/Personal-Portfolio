import { useState, useEffect } from 'react'

export function useTypingEffect(texts, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!texts || texts.length === 0) return

    const currentText = texts[currentIndex]

    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, pauseTime)
      return () => clearTimeout(pauseTimeout)
    }

    if (isDeleting) {
      if (displayText === '') {
        setIsDeleting(false)
        setCurrentIndex((prev) => (prev + 1) % texts.length)
        return
      }

      const deleteTimeout = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1))
      }, deletingSpeed)
      return () => clearTimeout(deleteTimeout)
    }

    if (displayText === currentText) {
      setIsPaused(true)
      return
    }

    const typeTimeout = setTimeout(() => {
      setDisplayText((prev) => currentText.slice(0, prev.length + 1))
    }, typingSpeed)

    return () => clearTimeout(typeTimeout)
  }, [displayText, currentIndex, isDeleting, isPaused, texts, typingSpeed, deletingSpeed, pauseTime])

  return displayText
}
