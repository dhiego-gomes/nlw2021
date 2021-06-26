import Modal from './modal.js'

const modal = Modal()

const checkButton = document.querySelectorAll('.actions a.check')   // PEGA APENAS OS 'check' 'a', QUE ESTÃO DENTRO DE 'actions'
const deleteButton = document.querySelectorAll('.actions a.delete')
const modalTitle = document.querySelector('.modal h2')
const modalParagraph = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')

checkButton.forEach(button => {
    button.addEventListener('click', handleClick)
})

deleteButton.forEach(button => {
    button.addEventListener('click', (event) => handleClick(event, false))
})

function handleClick(event, check = true) {
    event.preventDefault()

    const text = check ? 'Marcar com lida' : 'Excluir'

    const slug = check ? 'check' : 'delete'
    const roomID = document.querySelector('#room-id').dataset.id
    const questionID = event.target.dataset.id

    const form = document.querySelector('.modal form')
    form.setAttribute('action', `/question/${roomID}/${questionID}/${slug}`)

    modalTitle.innerHTML = `${text}`
    modalParagraph.innerHTML = `Tem certeza que deseja ${text.toLocaleLowerCase()} esta pergunta?`
    modalButton.innerHTML = `Sim, ${text.toLocaleLowerCase()}.`
    check ? modalButton.classList.remove('red') : modalButton.classList.add('red')
    modal.open()
}