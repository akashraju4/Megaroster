$(document).foundation()

const megaroster = {
    init() {
      document
      .querySelector('form#new-student')
      .addEventListener('submit', this.addStudent) //don't add parenthesis
    },
    addStudent(ev) {
      ev.preventDefault()
      const studentName = ev.target.studentName.value
      console.log(studentName)
    }
}

megaroster.init()