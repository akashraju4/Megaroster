$(document).foundation()

const megaroster = {
    students: [],
    
    init(listSelector) {
      this.studentList = document.querySelector(listSelector) //same as studentList:
      this.max = 0
      this.i = 2
      this.setupEventListeners()
    },
    
    setupEventListeners() {
       document
      .querySelector('form#new-student')
      .addEventListener('submit', this.addStudent.bind(this)) //bind makes it the same thing as it is at bind
    },
    removeStudent(ev) {
      const btn = ev.target
      btn.closest('.student').remove()
    },
    promoteStudent(ev) {
      const prm = ev.target
      if(this.i % 2 === 0)
      {
        prm.closest('.student').style.backgroundColor = "yellow"  
      }
      else
      {
        prm.closest('.student').style.backgroundColor = ''  
      }
      this.i++
      console.log(this.i)     
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
      listItem
      .querySelector('.button.remove')
      .addEventListener('click', this.removeStudent.bind(this))
      listItem
      .querySelector('.button.secondary')
      .addEventListener('click', this.promoteStudent.bind(this))
      return listItem
    },

    removeClassName(el, className) {
      el.className = el.className.replace(className, '').trim()
    },
}

megaroster.init('#studentList')