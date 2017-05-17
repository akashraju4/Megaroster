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
      const li = this.buildListItem(student)
      this.studentList.appendChild(li)
      this.max++
    },

    buildListItem(student) {
      const listItem = document.createElement('li')
      listItem.textContent = student.name
      return listItem
    },
}

megaroster.init('#studentList')