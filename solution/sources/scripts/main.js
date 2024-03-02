'use strict'

class Resume {
  reference = {
    // id: ,
    // title: ,
    // photo: ,
    // fullname: ,
    // birthdate: ,
    // residence: ,
    // phone: ,
    // email: ,
    interests: [
      // {
      //   interest: ,
      // },
    ],
    languages: [
      // {
      //   languageName: ,
      //   languageLevel: ,
      // },
    ],
    // personalDescription: ,
    jobs: [
      // {
      //   jobTitle: ,
      //   jobDateStart: ,
      //   jobDateEnd: ,
      //   jobPlace: ,
      //   jobDescription: ,
      // },
    ],
    educations: [
      // {
      //   educationTitle: ,
      //   educationDateStart: ,
      //   educationDateEnd: ,
      //   educationPlace: ,
      //   educationDescription: ,
      // },
    ],
    courses: [
      // {
      //   courseTitle: ,
      //   courseDateStart: ,
      //   courseDateEnd: ,
      //   coursePlace: ,
      // },
    ],
  }

  constructor (resumeId) {
    if (!window.localStorage.getItem('collection')) {
      window.localStorage.setItem('collection', JSON.stringify([]))
    }

    if (resumeId) {
      const resume = JSON.parse(window.localStorage.getItem('collection'))?.filter((resume) => resume.id === resumeId)
      if (resume.length) this.reference = resume[0]

      return
    }

    this.reference.id = self.crypto.randomUUID()
  }

  setPhoto () {
    const resumeForm = new FormData(document.getElementById('resumeForm'))
    const file = resumeForm.get('photo')
    if (!file.name) return
    if (file.size > 256*1024) {
      document.getElementsByName('photo')[0].value = ''

      return
    }

    const reader = new FileReader()
    reader.addEventListener('load', (event) => {
      this.reference.photo = reader.result
    })

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  addInterest () {
    const resumeForm = new FormData(document.getElementById('resumeForm'))
    if (!resumeForm.get('interest')) return

    document.getElementsByName('interest')[0].value = ''

    document.getElementsByName('interests')[0].innerHTML += `<li>
      <article>
        <p>${ resumeForm.get('interest') }</p>
      </article>
    </li>`

    this.reference.interests.push({
      interest: resumeForm.get('interest'),
    })
  }

  removeInterest () {
    this.reference.interests.pop()

    const node = document.getElementsByName('interests')[0]
    node.removeChild(node.lastChild)
  }

  addLanguage () {
    const resumeForm = new FormData(document.getElementById('resumeForm'))
    if (!resumeForm.get('languageName')) return
    if (!resumeForm.get('languageLevel')) return

    document.getElementsByName('languageName')[0].value = ''
    document.getElementsByName('languageLevel')[0].value = ''

    document.getElementsByName('languages')[0].innerHTML += `<li>
      <article>
        <div>
          <p>${ resumeForm.get('languageName') }</p>
          <p>${ resumeForm.get('languageLevel') }</p>
        </div>
      </article>
    </li>`

    this.reference.languages.push({
      languageName: resumeForm.get('languageName'),
      languageLevel: resumeForm.get('languageLevel'),
    })
  }

  removeLanguage () {
    this.reference.languages.pop()

    const node = document.getElementsByName('languages')[0]
    node.removeChild(node.lastChild)
  }

  addJob () {
    const resumeForm = new FormData(document.getElementById('resumeForm'))
    if (!resumeForm.get('jobTitle')) return

    document.getElementsByName('jobTitle')[0].value = ''
    document.getElementsByName('jobDateStart')[0].value = ''
    document.getElementsByName('jobDateEnd')[0].value = ''
    document.getElementsByName('jobPlace')[0].value = ''
    document.getElementsByName('jobDescription')[0].value = ''

    document.getElementsByName('jobs')[0].innerHTML += `<li>
      <article>
        <p>${ resumeForm.get('jobTitle') }</p>
        <div>
          <p>${ resumeForm.get('jobDateStart') }</p>
          <p>${ resumeForm.get('jobDateEnd') }</p>
        </div>
        <p>${ resumeForm.get('jobPlace') }</p>
        <p>${ resumeForm.get('jobDescription') }</p>
      </article>
    </li>`

    this.reference.jobs.push({
      jobTitle: resumeForm.get('jobTitle'),
      jobDateStart: resumeForm.get('jobDateStart'),
      jobDateEnd: resumeForm.get('jobDateEnd'),
      jobPlace: resumeForm.get('jobPlace'),
      jobDescription: resumeForm.get('jobDescription'),
    })
  }

  removeJob () {
    this.reference.jobs.pop()

    const node = document.getElementsByName('jobs')[0]
    node.removeChild(node.lastChild)
  }

  addEducation () {
    const resumeForm = new FormData(document.getElementById('resumeForm'))
    if (!resumeForm.get('educationTitle')) return

    document.getElementsByName('educationTitle')[0].value = ''
    document.getElementsByName('educationDateStart')[0].value = ''
    document.getElementsByName('educationDateEnd')[0].value = ''
    document.getElementsByName('educationPlace')[0].value = ''
    document.getElementsByName('educationDescription')[0].value = ''

    document.getElementsByName('educations')[0].innerHTML += `<li>
      <article>
        <p>${ resumeForm.get('educationTitle') }</p>
        <div>
          <p>${ resumeForm.get('educationDateStart') }</p>
          <p>${ resumeForm.get('educationDateEnd') }</p>
        </div>
        <p>${ resumeForm.get('educationPlace') }</p>
        <p>${ resumeForm.get('educationDescription') }</p>
      </article>
    </li>`

    this.reference.educations.push({
      educationTitle: resumeForm.get('educationTitle'),
      educationDateStart: resumeForm.get('educationDateStart'),
      educationDateEnd: resumeForm.get('educationDateEnd'),
      educationPlace: resumeForm.get('educationPlace'),
      educationDescription: resumeForm.get('educationDescription'),
    })
  }

  removeEducation () {
    this.reference.educations.pop()

    const node = document.getElementsByName('educations')[0]
    node.removeChild(node.lastChild)
  }

  addCourse () {
    const resumeForm = new FormData(document.getElementById('resumeForm'))
    if (!resumeForm.get('courseTitle')) return

    document.getElementsByName('courseTitle')[0].value = ''
    document.getElementsByName('courseDateStart')[0].value = ''
    document.getElementsByName('courseDateEnd')[0].value = ''
    document.getElementsByName('coursePlace')[0].value = ''

    document.getElementsByName('courses')[0].innerHTML += `<li>
      <article>
        <p>${ resumeForm.get('courseTitle') }</p>
        <div>
          <p>${ resumeForm.get('courseDateStart') }</p>
          <p>${ resumeForm.get('courseDateEnd') }</p>
        </div>
        <p>${ resumeForm.get('coursePlace') }</p>
      </article>
    </li>`

    this.reference.courses.push({
      courseTitle: resumeForm.get('courseTitle'),
      courseDateStart: resumeForm.get('courseDateStart'),
      courseDateEnd: resumeForm.get('courseDateEnd'),
      coursePlace: resumeForm.get('coursePlace'),
    })
  }

  removeCourse () {
    this.reference.courses.pop()

    const node = document.getElementsByName('courses')[0]
    node.removeChild(node.lastChild)
  }

  generateResume () {
    const resumeForm = new FormData(document.getElementById('resumeForm'))
    if (!resumeForm.get('fullname')) return

    this.reference = {
      ...this.reference,
      title: resumeForm.get('title'),
      fullname: resumeForm.get('fullname'),
      birthdate: resumeForm.get('birthdate'),
      residence: resumeForm.get('residence'),
      phone: resumeForm.get('phone'),
      email: resumeForm.get('email'),
      personalDescription: resumeForm.get('personalDescription'),
    }

    if (!JSON.parse(window.localStorage.getItem('collection'))?.filter((resume) => resume.id === this.reference.id).length) {
      window.localStorage.setItem('collection', JSON.stringify([
        ...JSON.parse(window.localStorage.getItem('collection')),
        this.reference,
      ]))
    }
  }
}

const resume = new Resume(new URLSearchParams(window.location.search).get('resume_id'))

// function editCurrentResume() {
//   window.localStorage.setItem('collection', JSON.stringify({
//     resume_id: new URLSearchParams(window.location.search).get('resume_id')
//   }))
//   console.log(JSON.parse(window.localStorage.collection))
// }

document.addEventListener('DOMContentLoaded', (event) => {
  // document.getElementsByName('generateResume')[0].addEventListener('click', () => {
  //   console.log(new FormData(document.getElementById('resumeForm')).get('interest'))
  // })
})
