import React, { useState, useEffect } from 'react'

function useMediaQuery(range, type, value ) {
   const [matches, setMatches] = useState(null)

   useEffect(() => {
      setMatches(window.matchMedia(`(${range}-${type}: ${value}px)`).matches)
      window
         .matchMedia(`(${range}-${type}: ${value}px)`)
         .addEventListener('change', (e) => setMatches(e.matches))
   }, [])

   return matches
}

export default useMediaQuery
