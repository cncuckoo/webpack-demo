import sayhi from './components/sayhi'
import { bake } from './shake/example'
import 'purecss'
import './css/main.css'

import 'react'
import 'react-dom'


let com = sayhi()
document.body.appendChild(com)
if (module.hot) {
  module.hot.accept('./components/sayhi', () => {
    const nexCom = sayhi()
    document.body.replaceChild(nexCom, com)
    com = nexCom
  })
  module.hot.accept('./shake/example', () => {
    bake()
  })
}
bake()


