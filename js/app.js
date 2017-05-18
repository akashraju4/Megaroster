$(document).foundation()

class Megaroster {
  constructor(listSelector) {
      this.students= []
      this.studentList = document.querySelector(listSelector) //same as studentList:
      this.max = 0
      this.i = 2
      this.setupEventListeners()
      this.load()
    }
    
    setupEventListeners() {
       document
      .querySelector('form#new-student')
      .addEventListener('submit', this.addStudentViaForm.bind(this)) //bind makes it the same thing as it is at bind
    }
    save() {
      localStorage.setItem('roster', JSON.stringify(this.students))
    }
    load() {
      const rosterString = localStorage.getItem('roster')
      const rosterArray = JSON.parse(rosterString)
      rosterArray.reverse().map(this.addStudent.bind(this)) //arrow functions automatically bind
    }
    removeStudent(ev) {
      const btn = ev.target
      btn.closest('.student').remove()
      let id = btn.closest('.student')
      let data = parseFloat(id.dataset.id) //to use triple equals and change string to number
      for(let z = 0; z < this.students.length; z++)
      {
        if(data === this.students[z].id) //dataset.id always string
        {
          this.students.splice(z, 1)
          break //break out of loop if it is a match
        }
        
      }
      this.save()
      
    }
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
      this.save()  
    }
    upStudent(student, ev) {
      const upup = ev.target
      const upid = upup.closest('.student')
      this.studentList.insertBefore(upid, upid.previousElementSibling)    
    }
    downStudent(student, ev) {
      const downdown = ev.target
      const downid = downdown.closest('.student')
      this.studentList.insertBefore(downid.nextElementSibling, downid)     
    }
    addStudentViaForm(ev) {
      ev.preventDefault()
      const f = ev.target
      const student = {
        id: this.max + 1,
        name: f.studentName.value,
      }
      this.addStudent(student)
      f.reset()  
    }
    addStudent(student, append) {
      this.students.unshift(student) //good thing to know, puts element above front
      const li = this.buildListItem(student)
      this.studentList.insertBefore(li, this.studentList.firstChild) //two arguements: parent, child

      if (student.id > this.max) {
        this.max = student.id
      }  
      //new code
      this.save()
    }

    buildListItem(student) {
      const template = document.querySelector('.student.template')
      const listItem = template.cloneNode(true)
      this.removeClassName(listItem, 'template')
      listItem.querySelector('.student-name').textContent = student.name
      listItem.dataset.id = student.id
      this.setupActions(listItem, student)
      return listItem
    }
    setupActions(listItem, student){
      listItem
      .querySelector('.button.remove')
      .addEventListener('click', this.removeStudent.bind(this))
      listItem
      .querySelector('.button.promote.success')
      .addEventListener('click', this.promoteStudent.bind(this))
      listItem
      .querySelector('.button.up.secondary')
      .addEventListener('click', this.upStudent.bind(this, student))
      listItem
      .querySelector('.button.down.secondary')
      .addEventListener('click', this.downStudent.bind(this, student))
      return listItem
    }
    removeClassName(el, className) {
      el.className = el.className.replace(className, '').trim()
    }
}

new Megaroster('#studentList')
