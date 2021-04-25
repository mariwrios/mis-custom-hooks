import { useState, useEffect, useRef } from "react"

const useFetch = url => {
  const isMounted = useRef(true)
  const [state, setState] = useState({
    loading: true,
    data: null
  })
  //console.log(state)
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    setState({ data: null, loading: true, error: null })

    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        if (isMounted.current) {
          setState({
            loading: false,
            error: null,
            data
          })
        }
      })
      .catch(() => {
        setState({
          loading: false,
          data: null,
          error: "No se pudo cargar la info"
        })
      })
  }, [url])
  return state
}

export default useFetch
