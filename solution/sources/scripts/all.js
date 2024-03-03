'use strict'

function removeResume(resumeId) {
  const collection = JSON.parse(window.localStorage.getItem('collection'))
  collection.splice(JSON.parse(window.localStorage.getItem('collection'))?.findIndex((resume) => resume.id === resumeId), 1)
  window.localStorage.setItem('collection', JSON.stringify(collection))

  refreshItems()
}

function showCopyModal(resumeId) {
  const node = document.createElement('DIV')
  node.id = 'fieldSelector'
  node.classList.add('field-selector-wrapper')
  node.innerHTML = `<div class="field-selector">
    <form id="fieldSelectorForm">
      <label>
        <input type="checkbox" name="personal" test-id="copy-modal__checkbox">
        <span>Личные данные</span>
      </label>
      <label>
        <input type="checkbox" name="personalDescription" test-id="copy-modal__checkbox">
        <span>О себе</span>
      </label>
      <label>
        <input type="checkbox" name="interests" test-id="copy-modal__checkbox">
        <span>Интересы</span>
      </label>
      <label>
        <input type="checkbox" name="languages" test-id="copy-modal__checkbox">
        <span>Языки</span>
      </label>
      <label>
        <input type="checkbox" name="jobs" test-id="copy-modal__checkbox">
        <span>Опыт работы</span>
      </label>
      <label>
        <input type="checkbox" name="educations" test-id="copy-modal__checkbox">
        <span>Образование</span>
      </label>
      <label>
        <input type="checkbox" name="courses" test-id="copy-modal__checkbox">
        <span>Курсы</span>
      </label>
    </form>
    <a class="field-selector__button" onclick="copyResume('${ resumeId }')" test-id="copy-modal__copy">Копировать</a>
    <a class="field-selector__button" onclick="closeCopyModal()" test-id="copy-modal__cancel">Отменить</a>
  </div>`

  document.body.appendChild(node).focus()
}

function closeCopyModal() {
  document.getElementById('fieldSelector').remove()
}

function copyResume(resumeId) {
  const fieldSelectorForm = new FormData(document.getElementById('fieldSelectorForm'))
  const copyFields = []

  if (fieldSelectorForm.get('personal')) copyFields.push('personal')
  if (fieldSelectorForm.get('personalDescription')) copyFields.push('personalDescription')
  if (fieldSelectorForm.get('interests')) copyFields.push('interests')
  if (fieldSelectorForm.get('languages')) copyFields.push('languages')
  if (fieldSelectorForm.get('jobs')) copyFields.push('jobs')
  if (fieldSelectorForm.get('educations')) copyFields.push('educations')
  if (fieldSelectorForm.get('courses')) copyFields.push('courses')

  window.location.href = `/?copy_fields=${ copyFields.join(',') }&resume_id=${ resumeId }`
}

function refreshItems() {
  const items = document.getElementById('items')
  items.innerHTML = ''

  JSON.parse(window.localStorage.getItem('collection'))?.forEach((resume) => {
    items.innerHTML += `
      <div class="collection_card-wrapper" tabindex="0" title="Действия" test-id="resume-actions">
        <div class="collection_card">
          <section>
            <img class="collection_card__photo" src="${ resume.photo || '/sources/pictures/photo.jpg' }">
          </section>
          <section>
            <h3 class="collection_card__fullname" test-id="resume-title-field">${ resume.title || resume.fullname }</h3>
            <p class="collection_card__extra">${ resume.residence }</p>
          </section>
        </div>
        <div class="collection_card_options">
          <div>
            <a href="/?resume_id=${ resume.id }" class="collection_card_options__button" test-id="resume-actions__open">Открыть</a>
            <a class="collection_card_options__button" onclick="removeResume('${ resume.id }')" test-id="resume-actions__delete">Удалить</a>
          </div>
          <a class="collection_card_options__button" onclick="showCopyModal('${ resume.id }')" test-id="resume-actions__copy">Копировать</a>
        </div>
      </div>
    `
  })

  items.innerHTML += `
    <a href="/?new_resume=1" class="collection_card-wrapper" title="Добавить" test-id="add-resume">
      <div class="collection_card add-plug">
        <span class="collection_card__pseudo-icon">+</span>
      </div>
    </a>
  `
}

document.addEventListener('DOMContentLoaded', (event) => {
  refreshItems()
})
