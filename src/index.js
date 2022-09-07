// write your code here
fetch('http://localhost:3000/ramens')
.then(resp => resp.json())
.then(obj => {
    document.querySelector('.detail-image').src = obj[0].image
    document.querySelector('.name').textContent = obj[0].name
    document.querySelector('.restaurant').textContent = obj[0].restaurant
    document.querySelector('#rating-display').textContent = obj[0].rating
    document.querySelector('#comment-display').textContent = obj[0].comment

    return obj
})
.then(obj => obj.forEach(ramen => renderRamen(ramen)))

function renderRamen(ramen) {
    
    const img = document.createElement('img')
    const container = document.createElement('div')
    img.src = ramen.image

    img.addEventListener('click', (event) => {
        document.querySelector('.detail-image').src = event.target.src
        document.querySelector('.name').textContent = ramen.name
        document.querySelector('.restaurant').textContent = ramen.restaurant
        document.querySelector('#rating-display').textContent = ramen.rating
        document.querySelector('#comment-display').textContent = ramen.comment
    })


    const delBtn = document.createElement('button')
    delBtn.textContent = "REMOVE"
    delBtn.addEventListener('click', handleDelete)
    delBtn.style.marginRight = '20px'

    container.append(img, delBtn)

    const imgDiv = document.querySelector('#ramen-menu')
    imgDiv.append(container)
}

function handleSubmit(e) {
    e.preventDefault()

    const newRamen = {
        name: e.target.name.value,
        restaurant: e.target.restaurant.value,
        image: e.target.image.value,
        rating: e.target.rating.value,
        comment: e.target['new-comment'].value
    }
    renderRamen(newRamen)
}

function handleEditSubmit(e) {
    e.preventDefault()

    document.querySelector('#rating-display').textContent = e.target.rating.value
    document.querySelector('#comment-display').textContent = e.target['new-comment'].value
}

function handleDelete(e) {
    e.target.parentElement.remove()
}

const form = document.querySelector('#new-ramen')
form.addEventListener('submit', handleSubmit)

const formEdit = document.querySelector('#edit-ramen')
formEdit.addEventListener('submit', handleEditSubmit)
