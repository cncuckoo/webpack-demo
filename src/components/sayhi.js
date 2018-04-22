export default function com(text = 'hello ha') {
  const el = document.createElement('div')
  el.className = 'pure-button'
  el.innerHTML = text
  el.onclick = () => {
    alert(1)
    Promise.all([
      import('../aync/dynamic'),
      import('../aync/dynamic2')
    ])
      .then(([ept, ept1]) => {
        el.innerHTML = ept.default + '== ' + ept1.default
      }).catch(err => console.log(err))
  }
  return el
}