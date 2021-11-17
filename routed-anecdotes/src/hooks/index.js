import { useRef, useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')
  const ref = useRef(null);

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue("")
  }

  return [reset, {
    type,
    value,
    ref,
    onChange,
  }]
}
