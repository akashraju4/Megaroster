const App = {
  init() {
    const personForm = document.querySelector('form')
    console.log(this)
    console.log(this.handleSubmit)
    personForm.addEventListener('submit', (ev) => this.handleSubmit(ev))
 
  },

//   renderColor(hairColor) {
//     const colorDiv = document.createElement('div')
//     colorDiv.style.height = '50px'
//     colorDiv.style.width = '100px'
//     colorDiv.style.backgroundColor = hairColor
//     return colorDiv
//   },

  renderListItem(name) {
    const li = document.createElement('li')
    li.innerHTML = `${name}`
    return li
  },
  renderDeleteButton() {
      let deleteButton = document.createElement("button")
      deleteButton.textContent = 'Delete'
      return deleteButton
  },

  renderList(person) {
    let list = document.createElement('ul')
    Array.from(person).map((input, _i, _elementsArray) => {
      if (input.value) {
        let value = input.value
        let li = this.renderListItem(value)
        let deleteButt = this.renderDeleteButton()
        list.appendChild(li)
        list.appendChild(deleteButt)
        list.addEventListener('delete', (ev) => this.deleteSubmit(ev))
      }
     
    })

    return list
  },

  handleSubmit(ev) {
    ev.preventDefault()
    const form = ev.target
    console.lorg(form)
    const details = document.querySelector('.details')

    const list = this.renderList(form.elements)

    details.insertBefore(list, details.firstChild)
  },
  
  deleteSubmit(ev) {
    ev.preventDefault()
    const form = ev.target
    const details = document.querySelector('.details')

    const list = this.renderList(form.elements)
    details.parentNode.removeChild(details)
  },
}

App.init()