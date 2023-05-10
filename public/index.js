
//---- ADD EVENT-----



function openModal(date) {
  var modal = document.getElementById("modal");
  modal.style.display = "block";
  submitFormAddEvent(date)
}

function closeModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "none";
}

// send form data to back



var mainLink = 'http://localhost:3000'

function submitFormAddEvent(date) {

  const addEventForm = document.getElementById('eventForm');
  addEventForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('user-name').value;
    const phone = document.getElementById('user-phone').value;
    const info = document.getElementById('user-info').value;

    const data = { name, phone, info, date };

    fetch(`${mainLink}/api/create-schedule/add-event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(response => {
        if (response.ok) {
          closeModal()
          window.location.href = `${mainLink}/api/create-schedule/all`
        }
      })
      .catch(error => {
        console.error('Сталася помилка при відправці запиту:', error);
        // Виконайте необхідну обробку помилки
      });
  })
}

//----------------DELETE-----

function showDeleteModal(date) {
  var modal = document.getElementById('deleteModal');
  modal.style.display = 'block';
  deleteEvent(date)
}

function closeDeleteModule() {
  var modal = document.getElementById('deleteModal');
  modal.style.display = 'none';
}

function deleteEvent(date) {

  const delDiv = document.getElementById('submit-delete');
  delDiv.addEventListener('submit', (event) => {
    event.preventDefault();
    fetch(`${mainLink}/api/create-schedule/delete-event`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ date: date })
    })
      .then(response => response.json())
      .then(response => {
        if (response.ok) {
          closeDeleteModule();
          window.location.href = `${mainLink}/api/create-schedule/all`
        }
      })
      .catch(error => {
        console.error('Сталася помилка при відправці запиту:', error);
      });
  })



  // Perform the delete operation

}

window.onclick = function (event) {
  var modal = document.getElementById('deleteModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};




//-----------CONFIGURE DAY-----------

function openConfigureModal(current_date) {
  var modal = document.getElementById('configureModal');
  modal.style.display = 'block';
  fillFormAndSendConfigure(current_date)
}

function closeConfigureModal() {
  var modal = document.getElementById('configureModal');
  modal.style.display = 'none';
}

function fillFormAndSendConfigure(current_date) {

  const configureForm = document.getElementById('configureForm');
  configureForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const startHour = document.getElementById('startHour').value;
    const endHour = document.getElementById('endHour').value;
    let interval = {}
    interval.hour = document.getElementById('hours').value;
    interval.min = document.getElementById('minutes').value;
    // Відправити дані на бекенд для обробки
    fetch(`${mainLink}/api/create-schedule/configure-day`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startHour,
        endHour,
        interval,
        current_date
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.ok) {
          closeConfigureModal()
          window.location.href = `${mainLink}/api/create-schedule/all`
        }

      })
      .catch((error) => {
        console.error('Помилка при відправленні даних на бекенд:', error);
      });
  });

}


