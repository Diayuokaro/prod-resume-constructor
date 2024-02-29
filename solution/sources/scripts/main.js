'use strict'

class ResumeBuilder {
  resume = {
    interests: [],
    languages: [],
    jobs: [],
    educations: [],
    courses: [],
  }

  constructor () {
    this.resume.id = self.crypto.randomUUID()
  }

  setPhoto (event) {
    const file = document.querySelector('input[type=file]').files[0]

    const reader = new FileReader()
    reader.addEventListener('load', (event) => {
      this.resume.photo = reader.result
    })

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  setFullname (event) {
    this.resume.fullname = event.target.value
  }

  setBirthdate (event) {
    this.resume.birthdate = new Date(event.target.value)
  }

  setResidence (event) {
    this.resume.residence = event.target.value
  }

  setPhone (event) {
    this.resume.phone = event.target.value
  }

  setEmail (event) {
    this.resume.email = event.target.value
  }

  addInterest () {
    this.resume.interests.push({
      interest: document.getElementsByName('interest')[0].value,
    })
  }

  addLanguage () {
    this.resume.languages.push({
      languageName: document.getElementsByName('languageName')[0].value,
      languageLevel: document.getElementsByName('languageLevel')[0].value,
    })
  }

  setPersonalDescription (personalDescription) {
    this.resume.personalDescription = personalDescription
  }

  addJob () {
    this.resume.jobs.push({
      jobTitle: document.getElementsByName('jobTitle')[0].value,
      jobDateStart: document.getElementsByName('jobDateStart')[0].value,
      jobDateEnd: document.getElementsByName('jobDateEnd')[0].value,
      jobPlace: document.getElementsByName('jobPlace')[0].value,
      jobDescription: document.getElementsByName('jobDescription')[0].value,
    })
  }

  addEducation () {
    this.resume.educations.push({
      educationTitle: document.getElementsByName('educationTitle')[0].value,
      educationDateStart: document.getElementsByName('educationDateStart')[0].value,
      educationDateEnd: document.getElementsByName('educationDateEnd')[0].value,
      educationPlace: document.getElementsByName('educationPlace')[0].value,
      educationDescription: document.getElementsByName('educationDescription')[0].value,
    })
  }

  addCourse () {
    this.resume.courses.push({
      courseTitle: document.getElementsByName('courseTitle')[0].value,
      courseDateStart: document.getElementsByName('courseDateStart')[0].value,
      courseDateEnd: document.getElementsByName('courseDateEnd')[0].value,
      coursePlace: document.getElementsByName('coursePlace')[0].value,
    })
  }

  getResume () {
    console.log(this.resume)
  }
}

const resume = new ResumeBuilder()

document.addEventListener('DOMContentLoaded', (event) => {
  // const collection = [
  //   {
  //     id: self.crypto.randomUUID(),
  //     photo: ,
  //     fullname: ,
  //     birthdate: ,
  //     residence: ,
  //     phone: ,
  //     email: ,
  //     interests: [
  //       {
          // interest: ,
  //       },
  //     ],
  //     languages: [
  //       {
          // languageName: ,
          // languageLevel: ,
  //       },
  //     ],
  //     personalDescription: ,
  //     jobs: [
  //       {
          // jobTitle: ,
          // jobDateStart: ,
          // jobDateEnd: ,
          // jobPlace: ,
          // jobDescription: ,
  //       },
  //     ],
  //     educations: [
  //       {
          // educationTitle: ,
          // educationDateStart: ,
          // educationDateEnd: ,
          // educationPlace: ,
          // educationDescription: ,
  //       },
  //     ],
  //     courses: [
  //       {
          // courseTitle: ,
          // courseDateStart: ,
          // courseDateEnd: ,
          // coursePlace: ,
  //       },
  //     ],
  //   },
  // ]
})
