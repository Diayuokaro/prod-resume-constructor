'use strict'

class Resume {
  reference = {
    interests: [],
    languages: [],
    jobs: [],
    educations: [],
    courses: [],
  }

  constructor (resumeId, copyFields) {
    if (!window.localStorage.getItem('collection')) {
      window.localStorage.setItem('collection', JSON.stringify([]))
    }

    if (resumeId) {
      const resume = JSON.parse(window.localStorage.getItem('collection'))?.filter((resume) => resume.id === resumeId)

      if (resume.length) {
        if (copyFields?.length) copyFields.forEach((field) => {
          switch (field) {
            case 'personal':
              this.reference.title = resume[0].title
              this.reference.photo = resume[0].photo
              this.reference.fullname = resume[0].fullname
              this.reference.birthdate = resume[0].birthdate
              this.reference.residence = resume[0].residence
              this.reference.phone = resume[0].phone
              this.reference.email = resume[0].email
              break
            case 'personalDescription':
              this.reference.personalDescription = resume[0].personalDescription
              break
            case 'interests':
              this.reference.interests = resume[0].interests
              break
            case 'languages':
              this.reference.languages = resume[0].languages
              break
            case 'jobs':
              this.reference.jobs = resume[0].jobs
              break
            case 'educations':
              this.reference.educations = resume[0].educations
              break
            case 'courses':
              this.reference.courses = resume[0].courses
              break
          }
        })
        else this.reference = resume[0]

        if (!copyFields?.length) return
      }
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
    const node = document.createElement('LI')
    node.innerHTML = `<label>
      <span>Название</span>
      <input type="text" placeholder="Математика" name="interest" test-id="interest">
    </label>`

    document.getElementById('interests').appendChild(node)
  }

  removeInterest () {
    const node = document.getElementById('interests')
    if (node.lastChild) node.removeChild(node.lastChild)
  }

  addLanguage () {
    const node = document.createElement('LI')
    node.innerHTML = `<div>
      <label>
        <span>Название</span>
        <input type="text" placeholder="Английский" name="languageName" test-id="language-name">
      </label>
      <label style="flex: none; width: 100px;">
        <span>Уровень</span>
        <input type="text" placeholder="C1" name="languageLevel" test-id="language-level">
      </label>
    </div>`

    document.getElementById('languages').appendChild(node)
  }

  removeLanguage () {
    const node = document.getElementById('languages')
    if (node.lastChild) node.removeChild(node.lastChild)
  }

  addJob () {
    const node = document.createElement('LI')
    node.innerHTML = `<label>
      <span>Должность</span>
      <input type="text" placeholder="Маркетолог" name="jobTitle" test-id="job-title">
    </label>
    <div>
      <label>
        <span>Дата начала</span>
        <input type="date" name="jobDateStart" test-id="job-date-start">
      </label>
      <label>
        <span>Дата окончания</span>
        <input type="date" name="jobDateEnd" test-id="job-date-end">
      </label>
    </div>
    <label>
      <span>Место</span>
      <input type="text" placeholder="Тинькофф" name="jobPlace" test-id="job-place">
    </label>
    <label>
      <span>Описание</span>
      <textarea placeholder="Чем ты занимался на этой работе?" name="jobDescription" test-id="job-description"></textarea>
    </label>`

    document.getElementById('jobs').appendChild(node)
  }

  removeJob () {
    const node = document.getElementById('jobs')
    if (node.lastChild) node.removeChild(node.lastChild)
  }

  addEducation () {
    const node = document.createElement('LI')
    node.innerHTML = `<label>
      <span>Высшее образование</span>
      <input type="text" placeholder="Маркетолог" name="educationTitle" test-id="education-title">
    </label>
    <div>
      <label>
        <span>Дата начала</span>
        <input type="date" name="educationDateStart" test-id="education-date-start">
      </label>
      <label>
        <span>Дата окончания</span>
        <input type="date" name="educationDateEnd" test-id="education-date-end">
      </label>
    </div>
    <label>
      <span>Место</span>
      <input type="text" placeholder="НИУ «ВШЭ»" name="educationPlace" test-id="education-place">
    </label>
    <label>
      <span>Описание</span>
      <textarea placeholder="Твой опыт в получении этой квалификации?" name="educationDescription" test-id="education-description"></textarea>
    </label>`

    document.getElementById('educations').appendChild(node)
  }

  removeEducation () {
    const node = document.getElementById('educations')
    if (node.lastChild) node.removeChild(node.lastChild)
  }

  addCourse () {
    const node = document.createElement('LI')
    node.innerHTML = `<label>
      <span>Название курса</span>
      <input type="text" placeholder="Бизнес и аналитика" name="courseTitle" test-id="course-title">
    </label>
    <div>
      <label>
        <span>Дата начала</span>
        <input type="date" name="courseDateStart" test-id="course-date-start">
      </label>
      <label>
        <span>Дата окончания</span>
        <input type="date" name="courseDateEnd" test-id="course-date-end">
      </label>
    </div>
    <label>
      <span>Авторы</span>
      <input type="text" placeholder="Олег Тиньков, Денис Скворцов" name="coursePlace" test-id="course-place">
    </label>`

    document.getElementById('courses').appendChild(node)
  }

  removeCourse () {
    const node = document.getElementById('courses')
    if (node.lastChild) node.removeChild(node.lastChild)
  }

  validate () {
    const resumeForm = new FormData(document.getElementById('resumeForm'))
    if (resumeForm.get('fullname')) document.getElementsByName('generateResume')[0].disabled = false
    else document.getElementsByName('generateResume')[0].disabled = true
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

    this.reference.interests = []
    document.getElementById('interests').childNodes.forEach((node) => {
      if (node.querySelector('[name="interest"]').value) this.reference.interests.push({
        interest: node.querySelector('[name="interest"]').value,
      })
    })

    this.reference.languages = []
    document.getElementById('languages').childNodes.forEach((node) => {
      if (node.querySelector('[name="languageName"]').value && node.querySelector('[name="languageLevel"]').value) this.reference.languages.push({
        languageName: node.querySelector('[name="languageName"]').value,
        languageLevel: node.querySelector('[name="languageLevel"]').value,
      })
    })

    this.reference.jobs = []
    document.getElementById('jobs').childNodes.forEach((node) => {
      if (node.querySelector('[name="jobTitle"]').value) this.reference.jobs.push({
        jobTitle: node.querySelector('[name="jobTitle"]').value,
        jobDateStart: node.querySelector('[name="jobDateStart"]').value,
        jobDateEnd: node.querySelector('[name="jobDateEnd"]').value,
        jobPlace: node.querySelector('[name="jobPlace"]').value,
        jobDescription: node.querySelector('[name="jobDescription"]').value,
      })
    })

    this.reference.educations = []
    document.getElementById('educations').childNodes.forEach((node) => {
      if (node.querySelector('[name="educationTitle"]').value) this.reference.educations.push({
        educationTitle: node.querySelector('[name="educationTitle"]').value,
        educationDateStart: node.querySelector('[name="educationDateStart"]').value,
        educationDateEnd: node.querySelector('[name="educationDateEnd"]').value,
        educationPlace: node.querySelector('[name="educationPlace"]').value,
        educationDescription: node.querySelector('[name="educationDescription"]').value,
      })
    })

    this.reference.courses = []
    document.getElementById('courses').childNodes.forEach((node) => {
      if (node.querySelector('[name="courseTitle"]').value) this.reference.courses.push({
        courseTitle: node.querySelector('[name="courseTitle"]').value,
        courseDateStart: node.querySelector('[name="courseDateStart"]').value,
        courseDateEnd: node.querySelector('[name="courseDateEnd"]').value,
        coursePlace: node.querySelector('[name="coursePlace"]').value,
      })
    })

    document.getElementById('resume').innerHTML = `<div class="resume--primary">
      <article class="resume_group">
        <img class="resume__photo" src="${ this.reference.photo || '/sources/pictures/photo.jpg' }">
      </article>
      <article class="resume_group resume_group--personals" id="personal" test-id="resume-main-section">
        <h4 class="resume_group__title">Личные данные</h4>
        <hr>
        <section class="resume_field">
          <h5 class="resume_field__title">ФИО</h5>
          <p class="resume_field__extra">${ this.reference.fullname }</p>
        </section>
        ${
          !this.reference.birthdate ? '' : `<section class="resume_field">
            <h5 class="resume_field__title">Дата рождения</h5>
            <p class="resume_field__extra">${ formatDate(this.reference.birthdate) }</p>
          </section>`
        }
        ${
          !this.reference.residence ? '' : `<section class="resume_field">
            <h5 class="resume_field__title">Город</h5>
            <p class="resume_field__extra">${ this.reference.residence }</p>
          </section>`
        }
        ${
          !this.reference.phone ? '' : `<section class="resume_field">
            <h5 class="resume_field__title">Номер телефона</h5>
            <p class="resume_field__extra">${ this.reference.phone }</p>
          </section>`
        }
        ${
          !this.reference.email ? '' : `<section class="resume_field">
            <h5 class="resume_field__title">Email</h5>
            <p class="resume_field__extra">${ this.reference.email }</p>
          </section>`
        }
      </article>
      ${
        !this.reference.interests.length ? '' : `<article class="resume_group resume_group--interests" id="resumeInterests" test-id="resume-main-section">
          <h4 class="resume_group__title">Интересы</h4>
          <hr>
        </article>`
      }
      ${
        !this.reference.languages.length ? '' : `<article class="resume_group resume_group--languages" id="resumeLanguages" test-id="resume-main-section">
          <h4 class="resume_group__title">Языки</h4>
          <hr>
        </article>`
      }
    </div>
    <div class="resume--secondary">
      <article class="resume_group resume_group--interview" id="resumeInterview" test-id="resume-main-section">
        <h1 class="resume_group__title">${ this.reference.fullname }</h1>
        <hr>
        <section class="resume_field">
          <p class="resume_field__extra">${ this.reference.personalDescription }</p>
        </section>
      </article>
      ${
        !this.reference.jobs.length ? '' : `<article class="resume_group resume_group--jobs" id="resumeJobs" test-id="resume-main-section">
          <h4 class="resume_group__title">Опыт работы</h4>
          <hr>
        </article>`
      }
      ${
        !this.reference.educations.length ? '' : `<article class="resume_group resume_group--educations" id="resumeEducations" test-id="resume-main-section">
          <h4 class="resume_group__title">Образование и квалификация</h4>
          <hr>
        </article>`
      }
      ${
        !this.reference.courses.length ? '' : `<article class="resume_group resume_group--courses" id="resumeCourse" test-id="resume-main-section">
          <h4 class="resume_group__title">Курсы</h4>
          <hr>
        </article>`
      }
    </div>`

    this.reference.interests.forEach((interest) => {
      document.getElementById('resumeInterests').innerHTML += `<section class="resume_field">
        <p class="resume_field__title">${ interest.interest }</p>
      </section>`
    })

    this.reference.languages.forEach((language) => {
      document.getElementById('resumeLanguages').innerHTML += `<section class="resume_field">
        <h5 class="resume_field__title">${ language.languageName }</h5>
        <p class="resume_field__extra">${ language.languageLevel }</p>
      </section>`
    })

    this.reference.jobs.sort(comparator).forEach((job) => {
      document.getElementById('resumeJobs').innerHTML += `<section class="resume_field">
        <header>
          <h5 class="resume_field__title">${ job.jobTitle }</h5>
          <p style="display: ${ !Boolean(job.jobDateStart) && Boolean(job.jobDateEnd) ? 'none' : 'hidden' };" class="resume_field__date">${ Boolean(job.jobDateStart) ? formatDateString(job.jobDateStart) + ' — ' : '' }${ formatDateString(job.jobDateEnd) }</p>
        </header>
        <aside>
          <p class="resume_field__place">${ job.jobPlace }</p>
        </aside>
        <p class="resume_field__extra">${ job.jobDescription }</p>
      </section>`
    })

    this.reference.educations.sort(comparator).forEach((education) => {
      document.getElementById('resumeEducations').innerHTML += `<section class="resume_field">
        <header>
          <h5 class="resume_field__title">${ education.educationTitle }</h5>
          <p style="display: ${ !Boolean(education.educationDateStart) && Boolean(education.educationDateEnd) ? 'none' : 'hidden' };" class="resume_field__date">${ Boolean(education.educationDateStart) ? formatDateString(education.educationDateStart) + ' — ' : '' }${ formatDateString(education.educationDateEnd) }</p>
        </header>
        <aside>
          <p class="resume_field__place">${ education.educationPlace }</p>
        </aside>
        <p class="resume_field__extra">${ education.educationDescription }</p>
      </section>`
    })

    this.reference.courses.sort(comparator).forEach((course) => {
      document.getElementById('resumeCourse').innerHTML += `<section class="resume_field">
        <header>
          <h5 class="resume_field__title">${ course.courseTitle }</h5>
          <p style="display: ${ !Boolean(course.courseDateStart) && Boolean(course.courseDateEnd) ? 'none' : 'hidden' };" class="resume_field__date">${ Boolean(course.courseDateStart) ? formatDateString(course.courseDateStart) + ' — ' : '' }${ formatDateString(course.courseDateEnd) }</p>
        </header>
        <aside>
          <p class="resume_field__place">${ course.coursePlace }</p>
        </aside>
      </section>`
    })

    document.getElementById('resumeForm').style.display = 'none'
    document.getElementById('resumeScreen').style.display = ''
  }

  editResume () {
    document.getElementById('resumeForm').style.display = ''
    document.getElementById('resumeScreen').style.display = 'none'
  }

  saveResume () {
    if (JSON.parse(window.localStorage.getItem('collection'))?.filter((resume) => resume.id === this.reference.id).length) this.removeResume()

    window.localStorage.setItem('collection', JSON.stringify([
      ...JSON.parse(window.localStorage.getItem('collection')),
      this.reference,
    ]))

    window.location.href = '/all'
  }

  removeResume () {
    const collection = JSON.parse(window.localStorage.getItem('collection'))
    collection.splice(JSON.parse(window.localStorage.getItem('collection'))?.findIndex((resume) => resume.id === this.reference.id), 1)
    window.localStorage.setItem('collection', JSON.stringify(collection))
  }
}

function formatDate(dateString) {
  const date = new Date(dateString)

  return `${ ('00' + date.getDate()).slice(-2) }.${ ('00' + (date.getMonth() + 1)).slice(-2) }.${ date.getFullYear() }`
}

function formatDateString(dateString) {
  if (!Boolean(dateString)) return 'наст. время'

  const date = new Date(dateString)
  const months = [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь',
  ]

  return `${ months[date.getMonth()] } ${ date.getFullYear() } г.`
}

function comparator(a, b) {
  if ((a?.jobDateStart || a?.educationDateStart || a?.courseDateStart) == '' && (b?.jobDateStart || b?.educationDateStart || b?.courseDateStart) == '') return 0
  if ((a?.jobDateStart || a?.educationDateStart || a?.courseDateStart) == '' && (b?.jobDateStart || b?.educationDateStart || b?.courseDateStart) != '') return 1
  if ((b?.jobDateStart || b?.educationDateStart || b?.courseDateStart) == '') return -1

  return new Date((b?.jobDateStart || b?.educationDateStart || b?.courseDateStart)).getTime() - new Date((a?.jobDateStart || a?.educationDateStart || a?.courseDateStart)).getTime()
}

const resume = new Resume(new URLSearchParams(window.location.search).get('resume_id'), new URLSearchParams(window.location.search).get('copy_fields')?.split(','))

document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('resumeForm').style.display = ''
  document.getElementById('resumeScreen').style.display = 'none'

  if (!resume.reference.interests.length) resume.addInterest()
  if (!resume.reference.languages.length) resume.addLanguage()
  if (!resume.reference.jobs.length) resume.addJob()
  if (!resume.reference.educations.length) resume.addEducation()
  if (!resume.reference.courses.length) resume.addCourse()

  const resumeId = new URLSearchParams(window.location.search).get('resume_id')
  const copyFields = new URLSearchParams(window.location.search).get('copy_fields')?.split(',')

  document.getElementsByName('title')[0].value = resume.reference.title || ''
  // document.getElementsByName('photo')[0].value = resume.reference.photo || ''
  document.getElementsByName('fullname')[0].value = resume.reference.fullname || ''
  document.getElementsByName('birthdate')[0].value = resume.reference.birthdate || ''
  document.getElementsByName('residence')[0].value = resume.reference.residence || ''
  document.getElementsByName('phone')[0].value = resume.reference.phone || ''
  document.getElementsByName('email')[0].value = resume.reference.email || ''
  document.getElementsByName('personalDescription')[0].value = resume.reference.personalDescription || ''

  resume.reference.interests?.forEach((interest) => {
    const node = document.createElement('LI')
    node.innerHTML = `<label>
      <span>Название</span>
      <input type="text" placeholder="Математика" value="${ interest.interest }" name="interest" test-id="interest">
    </label>`

    document.getElementById('interests').appendChild(node)
  })

  resume.reference.languages?.forEach((language) => {
    const node = document.createElement('LI')
    node.innerHTML = `<div>
      <label>
        <span>Название</span>
        <input type="text" placeholder="Английский" value="${ language.languageName }" name="languageName" test-id="language-name">
      </label>
      <label style="flex: none; width: 100px;">
        <span>Уровень</span>
        <input type="text" placeholder="C1" value="${ language.languageLevel }" name="languageLevel" test-id="language-level">
      </label>
    </div>`

    document.getElementById('languages').appendChild(node)
  })

  resume.reference.jobs?.sort(comparator).forEach((job) => {
    const node = document.createElement('LI')
    node.innerHTML = `<label>
      <span>Должность</span>
      <input type="text" placeholder="Маркетолог" value="${ job.jobTitle }" name="jobTitle" test-id="job-title">
    </label>
    <div>
      <label>
        <span>Дата начала</span>
        <input type="date" value="${ job.jobDateStart }" name="jobDateStart" test-id="job-date-start">
      </label>
      <label>
        <span>Дата окончания</span>
        <input type="date" value="${ job.jobDateEnd }" name="jobDateEnd" test-id="job-date-end">
      </label>
    </div>
    <label>
      <span>Место</span>
      <input type="text" placeholder="Тинькофф" value="${ job.jobPlace }" name="jobPlace" test-id="job-place">
    </label>
    <label>
      <span>Описание</span>
      <textarea placeholder="Чем ты занимался на этой работе?" value="${ job.jobDescription }" name="jobDescription" test-id="job-description"></textarea>
    </label>`

    document.getElementById('jobs').appendChild(node)
  })

  resume.reference.educations?.sort(comparator).forEach((education) => {
    const node = document.createElement('LI')
    node.innerHTML = `<label>
      <span>Высшее образование</span>
      <input type="text" placeholder="Маркетолог" value="${ education.educationTitle }" name="educationTitle" test-id="education-title">
    </label>
    <div>
      <label>
        <span>Дата начала</span>
        <input type="date" value="${ education.educationDateStart }" name="educationDateStart" test-id="education-date-start">
      </label>
      <label>
        <span>Дата окончания</span>
        <input type="date" value="${ education.educationDateEnd }" name="educationDateEnd" test-id="education-date-end">
      </label>
    </div>
    <label>
      <span>Место</span>
      <input type="text" placeholder="НИУ «ВШЭ»" value="${ education.educationPlace }" name="educationPlace" test-id="education-place">
    </label>
    <label>
      <span>Описание</span>
      <textarea placeholder="Твой опыт в получении этой квалификации?" value="${ education.educationDescription }" name="educationDescription" test-id="education-description"></textarea>
    </label>`

    document.getElementById('educations').appendChild(node)
  })

  resume.reference.courses?.sort(comparator).forEach((course) => {
    const node = document.createElement('LI')
    node.innerHTML = `<label>
      <span>Название курса</span>
      <input type="text" placeholder="Бизнес и аналитика" value="${ course.courseTitle }" name="courseTitle" test-id="course-title">
    </label>
    <div>
      <label>
        <span>Дата начала</span>
        <input type="date" value="${ course.courseDateStart }" name="courseDateStart" test-id="course-date-start">
      </label>
      <label>
        <span>Дата окончания</span>
        <input type="date" value="${ course.courseDateEnd }" name="courseDateEnd" test-id="course-date-end">
      </label>
    </div>
    <label>
      <span>Авторы</span>
      <input type="text" placeholder="Олег Тиньков, Денис Скворцов" value="${ course.coursePlace }" name="coursePlace" test-id="course-place">
    </label>`

    document.getElementById('courses').appendChild(node)
  })

  if (resumeId && !copyFields?.length) {
    resume.generateResume()
  }

  resume.validate()
})
