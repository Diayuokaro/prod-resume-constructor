'use strict'

function removeResume(resumeId) {
  const collection = JSON.parse(window.localStorage.getItem('collection'))
  collection.splice(JSON.parse(window.localStorage.getItem('collection'))?.findIndex((resume) => resume.id === resumeId), 1)
  window.localStorage.setItem('collection', JSON.stringify(collection))

  refreshItems()
}

function refreshItems() {
  const items = document.getElementById('items')
  items.innerHTML = ''

  JSON.parse(window.localStorage.getItem('collection'))?.forEach((resume) => {
    items.innerHTML += `
      <div class="collection_card-wrapper" tabindex="0" title="Действия">
        <div class="collection_card">
          <section>
            <img class="collection_card__photo" src="${ resume.photo || '/sources/pictures/photo.jpg' }">
          </section>
          <section>
            <h3 class="collection_card__fullname">${ resume.title || resume.fullname }</h3>
            <p class="collection_card__extra">${ resume.residence }</p>
          </section>
        </div>
        <div class="collection_card_options">
          <a href="/?resume_id=${ resume.id }" class="collection_card_options__button">Открыть</a>
          <a class="collection_card_options__button" onclick="removeResume('${ resume.id }')">Удалить</a>
        </div>
      </div>
    `
  })

  items.innerHTML += `
    <a href="/?new_resume=1" class="collection_card-wrapper" title="Добавить">
      <div class="collection_card add-plug">
        <span class="material-symbols-rounded icon">add</span>
      </div>
    </a>
  `
}

document.addEventListener('DOMContentLoaded', (event) => {
  refreshItems()
})
