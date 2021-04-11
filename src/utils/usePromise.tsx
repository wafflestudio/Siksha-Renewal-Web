import { useState, useEffect } from 'react'

export default function usePromise(promiseCreator: any, deps: any) : [boolean, any] {
  const [loading, setLoading] = useState<boolean>(false)
  const [resolved, setResolved] = useState(null)

  useEffect(() => {
    const process = async () => {
      setLoading(true)
      try {
        const resolved = await promiseCreator()
        setResolved(resolved)
      } catch (e) {
        console.log(e)
      }
      setLoading(false);
    }

    process()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return [loading, resolved]
}