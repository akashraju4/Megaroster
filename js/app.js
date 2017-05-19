$(document).foundation()

class Megaroster {
  constructor(listSelector) {
      this.students= []
      this.studentList = document.querySelector(listSelector) //same as studentList:
      this.max = 0
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
      if (rosterString) { 
      const rosterArray = JSON.parse(rosterString)
      rosterArray.reverse().map(this.addStudent.bind(this)) //arrow functions automatically bind
      }
    }
    removeStudent(ev) {
      
      const btn = ev.target
      const id = btn.closest('.student')
      const data = id.dataset.id
      for(let z = 0; z < this.students.length; z++)
      {
        if(data === this.students[z].id.toString())//dataset.id always string
        {
          this.students.splice(z, 1)
          break //break out of loop if it is a match
        }
        
      }
      id.remove()
      this.save()
    }
    promoteStudent(student, ev) {
      const prm = ev.target
      const li = prm.closest('.student')
      student.promoted = !student.promoted

      if (student.promoted) {
        li.classList.add('promoted')
      } else {
        li.classList.remove('promoted')
      }   
      this.save()  
    }
    upStudent(student, ev) {
      const upup = ev.target
      const upid = upup.closest('.student')    
      const index = this.students.findIndex((currentStudent, i) => {
         return currentStudent.id === student.id
       })
       if (index > 0) {
         this.studentList.insertBefore(upid, upid.previousElementSibling)    
         const previousStudent = this.students[index - 1]
         this.students[index - 1] = student
         this.students[index] = previousStudent

         this.save()
      
      }
    }
    downStudent(student, ev) {
      const downdown = ev.target
      const downid = downdown.closest('.student')
      const index = this.students.findIndex((currentStudent, i) => {
        return currentStudent.id === student.id
       })
       if (index < (this.students.length-1)) {
         this.studentList.insertBefore(downid.nextElementSibling, downid)
         const nextStudent = this.students[index + 1]
         this.students[index + 1] = student
         this.students[index] = nextStudent

         this.save()
      }   
    }
    saveStudent(student, ev)
    {
      const edited = document.getElementById("nombre")
      this.save()
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
      document.getElementById("nombre").contentEditable = true;
      if(student.promoted) {
        listItem.classList.add('promoted')
      }
      this.setupActions(listItem, student)
      return listItem
    }
    setupActions(listItem, student){
      listItem
      .querySelector('.button.remove')
      .addEventListener('click', this.removeStudent.bind(this))
      listItem
      .querySelector('.button.promote.success')
      .addEventListener('click', this.promoteStudent.bind(this, student))
      listItem
      .querySelector('.button.up.secondary')
      .addEventListener('click', this.upStudent.bind(this, student))
      listItem
      .querySelector('.button.down.secondary')
      .addEventListener('click', this.downStudent.bind(this, student))
       listItem
      .querySelector('.button.save.secondary')
      .addEventListener('click', this.saveStudent.bind(this, student))
    }
    removeClassName(el, className) {
      el.className = el.className.replace(className, '').trim()
    }
}

const roster = new Megaroster('#studentList')
