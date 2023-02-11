import { useEffect, useState } from 'react'
import { api_key } from '../api_key'

export type FetchParam = {
  key: string,
  val: string,
}

type UseAviationFetchProps = {
  endpoint: string,
  params: FetchParam[],
  skip?: boolean,
}

const useAviationFetch = (props: UseAviationFetchProps) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const fetchNow = async (input: UseAviationFetchProps) => {
    const { endpoint, params } = input
    console.log(`Fetching data from the ${endpoint} endpoint`)
    setLoading(true)
    const paramsFull = [
      ...params,
      {
        key: 'api_key',
        val: api_key,
      },
    ]
    const paramString = paramsFull.map(obj => `${obj.key}=${obj.val}`).join('&')
    const response = await fetch(`https://airlabs.co/api/v9/${endpoint}.json?${paramString}`)
      .then(res => res.json())
      .then(data => {
        setLoading(false)
        if (data.response) {
          setData(data.response)
          return data.response
        } else if (data.error) {
          setError(data.error.message)
          return data.error.message
        }
      })
      .catch(err => {
        setError(err)
      })
    
    return response
  }

  useEffect(() => {
    if (props.skip) return
    fetchNow(props)
  }, [])

  return { loading, data, error, fetchNow }
}

export default useAviationFetch
