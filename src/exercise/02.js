// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(key,defaultValue = '') {
 const [storageValue, setStorageValue] = React.useState(()=>  window.localStorage.getItem(key) || defaultValue);

  React.useEffect(() => {
    console.log('useLocalStorageState - useEffect')
    window.localStorage.setItem(key, storageValue);
  }, [key,storageValue])
  return [storageValue,setStorageValue]
}
function Greeting({initialName = ''}) {

  console.log("Greeting - render");
  const [name, setName] = useLocalStorageState();
  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  const [count,setCount] = React.useState(0);
  return <>
  <button onClick={() => setCount(pc => pc+1)}>{count}</button>
    <Greeting/>
  </>
}

export default App
