const App = {
  init() {
    const personForm = document.querySelector('form')
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
  renderBreakLine() {
    let breakLine = document.createElement("br")
    return breakLine
  },
  renderPromoteButton() {
      let promoteButton = document.createElement("button")
      promoteButton.textContent = 'Promote'
      return promoteButton

},

  renderList(person) {
    let list = document.createElement('ul')
    Array.from(person).map((input, _i, _elementsArray) => {
      if (input.value) {
        let value = input.value
        let li = this.renderListItem(value)
        let deleteButt = this.renderDeleteButton()
        let promoteButt = this.renderPromoteButton()
        let breakLine = this.renderBreakLine()
        list.appendChild(li)
        list.appendChild(deleteButt)
        list.appendChild(breakLine)
        list.appendChild(promoteButt)
        // list.addEventListener('delete', (ev) => this.deleteSubmit(ev))
      }
     
    })

    return list
  },

  handleSubmit(ev) {
    ev.preventDefault()
    const form = ev.target

    const details = document.querySelector('.details')

    const list = this.renderList(form.elements)

    details.insertBefore(list, details.firstChild)
  },
  
  deleteSubmit(ev) {
    ev.preventDefault()
    const form = ev.target
    const details = document.querySelector('.details')

    const list = this.renderList(form.elements)
    list.remove()
  },
}

App.init()