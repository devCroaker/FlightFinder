import React, { useEffect, useState } from 'react'

const CUSTOM_STORAGE_EVENT = 'flightFinderStorageEvent'

const useLocalStorage = (key, initVal) => {
  const [storageValue, setStorageValue] = useState(() => {
    if (typeof window === "undefined") return initVal
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initVal
    } catch (error) {
      console.log(error)
      return initVal
    }
  })

  useEffect(() => {
    const updateValue = () => {
      const item = window.localStorage.getItem(key)
      if (item) setStorageValue(JSON.parse(item))
    }

    addEventListener('storage', updateValue)
    addEventListener(CUSTOM_STORAGE_EVENT, updateValue)
    return () => {
      removeEventListener('storage', updateValue)
      removeEventListener(CUSTOM_STORAGE_EVENT, updateValue)
    }
  }, [])

  const setValue = (value) => {
    try {
      setStorageValue(value)
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value))
        dispatchEvent(new Event(CUSTOM_STORAGE_EVENT))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return [storageValue, setValue]
}

export default useLocalStorage
