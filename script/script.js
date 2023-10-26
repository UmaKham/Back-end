let base_url = 'http://localhost:8080'

let btn_add = document.querySelector('.add')
let modal_add = document.querySelector('.modal_add')
let change_btn = document.querySelector('.change')
let bg_modal = document.querySelector('.bg')
let btn_close = document.querySelectorAll('[data-close]')
let form = document.forms.user_form

form.onsubmit = (e) => {
  e.preventDefault();

  let user = {}

  let fm = new FormData(form)

  fm.forEach((value, key) => {
    user[key] = value
  })

  fetch(base_url + '/users', {
    method: "post",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    },
  })
  .then((res) => {
    if(res.status == 200 || res.status == 201) {
      update()
      bg_modal.classList.add('hide')
    }
  })
}

function update() {
  fetch(base_url + "/users")
    .then((res) => res.json())
    .then((res) => reload_card(res))
}

update()

btn_add.onclick = () => {
  bg_modal.classList.remove('hide')
  modal_add.classList.remove('hide')
  change_btn.classList.add('hide')

    modal_add.onclick = () => {
      let inputs = document.querySelectorAll('.modal input')
    }
}

btn_close.forEach(btn => {
  btn.onclick = (event) => {
    console.log(event);
    if(event.target.getAttribute('data-close') !== null) {
      bg_modal.classList.add('hide')
    }
  }
})

let list_box = document.querySelector('.list_box')

function reload_card(arr) {
  list_box.innerHTML = ''

  for(let item of arr) {
    let item_box = document.createElement('div')
    let item_top = document.createElement('div')
    let item_title = document.createElement('h6')
    let item_del = document.createElement('div')
    let item_pen = document.createElement('div')
    let item_hr = document.createElement('hr')
    let item_description = document.createElement('p')
    let item_hrr = document.createElement('hr')
    let item_datebox = document.createElement('div')
    let item_isDone = document.createElement('span')
    let item_datetime = document.createElement('div')
    let item_date = document.createElement('span')
    let item_time = document.createElement('span')

    item_datetime.append(item_date, item_time)
    item_datebox.append(item_isDone, item_datetime)
    item_top.append(item_title, item_pen, item_del)
    item_box.append(item_top, item_hr, item_description, item_hrr, item_datebox)
    list_box.append(item_box)

    item_box.classList.add('box')
    item_top.classList.add('item_top')
    item_del.classList.add('delete')
    item_description.classList.add('description')
    item_datebox.classList.add('date_box')
    item_datetime.classList.add('date_time')
    item_pen.classList.add('pencil')

    item_title.innerHTML = item.task_title
    item_description.innerHTML = item.task_description
    item_isDone.innerHTML = item.task_type
    item_date.innerHTML = item.date
    item_time.innerHTML = item.time

    if(item_isDone.innerHTML == 'Не выполнено') {
      item_isDone.style.color = 'red'
    } else {
      item_isDone.style.color = 'green'
    }

    item_pen.onclick = () => {
      bg_modal.classList.remove('hide')
      modal_add.classList.add('hide')
      change_btn.classList.remove('hide')
      
      let inps = form.querySelectorAll('input')
      inps.forEach(inp => {
        inp.value = item.task_title
      })
    }

    item_del.onclick = () => {
      fetch(base_url + "/users/" + item.id, {
        method: "delete",
      }).then((res) => {
        if (res.status == 200 || res.status == 201) {
          item_box.remove()
        }
      })
    }
  }
}