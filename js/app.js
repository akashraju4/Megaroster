$(document).foundation()

const megaroster = {
    students: [],
    
    init(listSelector) {
      this.studentList = document.querySelector(listSelector) //same as studentList:
      this.max = 0
      document
      .querySelector('form#new-student')
      .addEventListener('submit', this.addStudent.bind(this)) //bind makes it the same thing as it is at bind
    },
    addStudent(ev) {
      ev.preventDefault()
      const f = ev.target
      const student = {
          id: this.max + 1,
          name: f.studentName.value,
      }
      this.students.unshift(student) //good thing to know, puts element above front
      const li = this.buildListItem(student)
      this.studentList.insertBefore(li, this.studentList.firstChild) //two arguements: parent, child
      this.max++
      f.reset()
    },

    buildListItem(student) {
      const template = document.querySelector('.student.template')
      const listItem = template.cloneNode(true)
      this.removeClassName(listItem, 'template')
      listItem.querySelector('.student-name').textContent = student.name
      listItem.dataset.id = student.id
      return listItem
    },

    removeClassName(el, className) {
      el.className = el.className.replace(className, '').trim()
    }
}

megaroster.init('#studentList')