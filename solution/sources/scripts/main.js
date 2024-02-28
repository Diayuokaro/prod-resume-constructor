'use strict'

// class ResumeController {
//   constructor () {

//   }

//   useItems () {
//     document.body.appendChild(document.getElementsByName('items')[0].content.cloneNode(true))
//   }

//   useResume () {
//     document.body.appendChild(document.getElementsByName('resume')[0].content.cloneNode(true))
//   }

//   useBuilder () {
//     document.body.appendChild(document.getElementsByName('builder')[0].content.cloneNode(true))
//   }
// }

document.addEventListener('DOMContentLoaded', (event) => {
  // let controller = new ResumeController()

  document.body.appendChild(document.getElementsByName('resume')[0].content.cloneNode(true))
})

// class Collection {
//   collection = []

//   constructor () {

//   }

//   push (portfolio) {
//     return this.collection.push(portfolio)
//   }
// }

// class Portfolio {
//   #data = {

//   }

//   constructor () {

//   }
// }

// document.addEventListener('DOMContentLoaded', (event) => {
//   // collection.push(portfolio)
//   // collection.push(portfolio)
//   // collection.push(portfolio)
//   // collection.push(portfolio)

//   // console.log(collection)

//   // collection.forEach((portfolio) => {
//   //   console.log(portfolio)

//   //   let element = document.createElement('P')
//   //   element.innerHTML = 'text'

//   //   document.body.append(element)
//   // })

//   let collection = new Collection()

//   let portfolio = new Portfolio()
//   collection.push(portfolio)
//   collection.push(portfolio)
//   collection.push(portfolio)
//   collection.push(portfolio)
//   collection.push(portfolio)

//   console.log(collection)
// })
