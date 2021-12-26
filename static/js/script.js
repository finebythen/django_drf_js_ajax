"use strict"

document.addEventListener('DOMContentLoaded', e => {
    // declare and initiate variables
    let url_basic = 'http://127.0.0.1:8000/';
    let update_id_manufacturer;
    let update_id_car;
    let tblbody_manufacturer = document.getElementById('tblbody-manufacturer');
    let tblbody_car = document.getElementById('tblbody-car');
    let btn_create_manufacturer = document.getElementById('btn-create-manufacturer');
    let btn_update_manufacturer = document.getElementById('btn-update-manufacturer');
    let btn_create_car = document.getElementById('btn-create-car');
    let btn_update_car = document.getElementById('btn-update-car');
    let select_manufacturer_main = document.getElementById('select-car-manufacturer');
    let select_manufacturer_modal = document.getElementById('select-update-car-manufacturer');

    // functions
    const reset_table_body = tblbody => {
        while (tblbody.hasChildNodes()) {
            tblbody.removeChild(tblbody.firstChild);
        };
    };

    const get_list_manufactuer = tblbody => {
        let url = `${url_basic}api/list/manufacturer/`;

        fetch(url)
        .then(response => response.json())
        .then(function(data) {
            let list = data;
            let fragment = document.createDocumentFragment();  // create fragment
            for (let i=0; i < list.length; i++) {  // iterate and add data to fragment
                // create sub-elements of table-body
                let tr = document.createElement('tr');
                let td_id = document.createElement('td');
                let td_name = document.createElement('td');
                let td_year = document.createElement('td');
                let td_btn_update = document.createElement('td');
                let td_btn_delete = document.createElement('td');
                let btn_update = document.createElement('button');
                let btn_update_sign = document.createElement('i');
                let btn_delete = document.createElement('button');
                let btn_delete_sign = document.createElement('i');

                // add attributes and text contents to elements
                td_id.textContent = `${list[i].id}`;
                td_name.textContent = `${list[i].name}`;
                td_year.textContent = `${list[i].founding_year}`;

                btn_update.setAttribute('class', 'btn btn-warning btn-sm btn-update-manufacturer');
                btn_update.setAttribute('id', `update-manufacturer-${list[i].id}`);
                btn_update.setAttribute('type', 'submit');
                btn_update.setAttribute('value', list[i].id);

                btn_update.setAttribute('data-bs-toggle', 'modal');
                btn_update.setAttribute('data-bs-target', '#manufacturerModal');

                btn_update_sign.setAttribute('class', 'bi bi-filter-circle');

                btn_delete.setAttribute('class', 'btn btn-danger btn-sm btn-delete-manufacturer');
                btn_delete.setAttribute('id', `delete-manufacturer-${list[i].id}`);
                btn_delete.setAttribute('type', 'submit');
                btn_delete.setAttribute('value', list[i].id);
                btn_delete_sign.setAttribute('class', 'bi bi-dash-circle');

                // create buttons
                btn_update.appendChild(btn_update_sign);
                td_btn_update.appendChild(btn_update);

                btn_delete.appendChild(btn_delete_sign);
                td_btn_delete.appendChild(btn_delete);

                // create table row
                tr.appendChild(td_id);
                tr.appendChild(td_name);
                tr.appendChild(td_year);
                tr.appendChild(td_btn_update);
                tr.appendChild(td_btn_delete);

                // append row to fragment
                fragment.append(tr);
            };
            // append fragment to table > tbody
            tblbody.append(fragment);

            // add eventlistener to buttons
            for (let i in list) {
                let btn = document.getElementsByClassName('btn-update-manufacturer')[i];
                btn.addEventListener('click', e => {
                    e.preventDefault();
                    set_updated_manufacturer(btn.value);
                });
            };
            for (let i in list) {
                let btn = document.getElementsByClassName('btn-delete-manufacturer')[i];
                btn.addEventListener('click', e => {
                    e.preventDefault();
                    delete_manufacturer(parseInt(btn.value));
                });
            };
        })
    };

    const get_list_car = tblbody => {
        let url = `${url_basic}api/list/car/`;

        fetch(url)
        .then(response => response.json())
        .then(function(data) {
            let list = data;

            let fragment = document.createDocumentFragment();
            for (let i=0; i < list.length; i++) {
                let tr = document.createElement('tr');
                let td_id = document.createElement('td');
                let td_name = document.createElement('td');
                let td_manufacturer = document.createElement('td');
                let td_btn_update = document.createElement('td');
                let td_btn_delete = document.createElement('td');
                let btn_update = document.createElement('button');
                let btn_delete = document.createElement('button');
                let btn_update_sign = document.createElement('i');
                let btn_delete_sign = document.createElement('i');

                td_id.textContent = list[i].id;
                td_name.textContent = list[i].name;
                td_manufacturer.textContent = list[i].manufacturer__name;

                btn_update.setAttribute('class', 'btn btn-warning btn-sm btn-update-car');
                btn_update.setAttribute('id', `btn-update-car-${list[i].id}`);
                btn_update.setAttribute('type', 'submit');
                btn_update.setAttribute('value', list[i].id);
                btn_update.setAttribute('data-bs-toggle', 'modal');
                btn_update.setAttribute('data-bs-target', '#carModal');

                btn_delete.setAttribute('class', 'btn btn-danger btn-sm btn-delete-car');
                btn_delete.setAttribute('id', `btn-delete-car-${list[i].id}`);
                btn_delete.setAttribute('type', 'submit');
                btn_delete.setAttribute('value', list[i].id);
                
                btn_update_sign.setAttribute('class', 'bi bi-filter-circle');
                btn_update.appendChild(btn_update_sign);

                btn_delete_sign.setAttribute('class', 'bi bi-dash-circle');
                btn_delete.appendChild(btn_delete_sign);

                td_btn_update.appendChild(btn_update);
                td_btn_delete.appendChild(btn_delete);

                tr.appendChild(td_id);
                tr.appendChild(td_name);
                tr.appendChild(td_manufacturer);
                tr.appendChild(td_btn_update);
                tr.appendChild(td_btn_delete);

                fragment.append(tr);
            };
            tblbody.append(fragment);

            for (let i in list) {
                let btn = document.getElementsByClassName('btn-update-car')[i];
                btn.addEventListener('click', e => {
                    e.preventDefault();
                    fill_manufacturer_select(select_manufacturer_modal);
                    set_updated_car(list[i].id);
                });
            };
            for (let i in list) {
                let btn = document.getElementsByClassName('btn-delete-car')[i];
                btn.addEventListener('click', e => {
                    delete_car(parseInt(btn.value));
                });
            };
        })
    };

    const fill_manufacturer_select = slct => {
        let url = `${url_basic}api/list/manufacturer/`;

        while (slct.hasChildNodes()) {
            slct.removeChild(slct.firstChild);
        };

        fetch(url)
        .then(response => response.json())
        .then(function(data) {
            let list = data;
            let fragment = document.createDocumentFragment();

            for (let i=0; i < list.length; i++) {
                const option = document.createElement('option');
                option.textContent = list[i].name;
                option.setAttribute('value', list[i].id);
                fragment.append(option);
            };

            slct.append(fragment);
        });
    };

    const create_manufacturer = () => {
        let url = `${url_basic}api/create/manufacturer/`;
        let csrftoken = getCookie('csrftoken');
        let form_manufacturer = document.getElementById('form-create-manufacturer');
        let manufacturer_name = document.getElementById('manufacturer-name').value;
        let manufacturer_year = parseInt(document.getElementById('manufacturer-year').value);

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                'name': manufacturer_name,
                'founding_year': manufacturer_year
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success: ', data);
        })
        .then(function() {
            form_manufacturer.reset();
            reset_table_body(tblbody_manufacturer);
            get_list_manufactuer(tblbody_manufacturer);
            fill_manufacturer_select(select_manufacturer_main);
        })
        .catch((error) => {
            console.log('Error: ', error);
        });
    };

    const create_car = () => {
        let url = `${url_basic}api/create/car/`;
        let csrftoken = getCookie('csrftoken');
        let form_car = document.getElementById('form-create-car');
        let car_name = document.getElementById('car-name').value;
        let car_manufacturer = parseInt(document.getElementById('select-car-manufacturer').value);

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                'name': car_name,
                'manufacturer': car_manufacturer
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success: ', data)
        })
        .then(function() {
            form_car.reset();
            reset_table_body(tblbody_car);
            get_list_car(tblbody_car);
        })
        .catch((error) => {
            console.log('Error: ', error)
        });
    };

    const set_updated_manufacturer = pk => {
        let url = `${url_basic}api/detail/manufacturer/${pk}/`;

        fetch(url)
        .then(response => response.json())
        .then(function(data) {
            document.getElementById('manufacturerModalLabel').innerText = `${data.name} (Gründungsjahr: ${data.founding_year})`;
            document.getElementById('input-update-manufacturer-name').value = data.name
            document.getElementById('input-update-manufacturer-year').value = data.founding_year
            update_id_manufacturer = parseInt(data.id);
        })
        .catch((error) => {
            console.log('Error: ', error);
        })
    };

    const set_updated_car = pk => {
        let url = `${url_basic}api/detail/car/${pk}/`;

        fetch(url)
        .then(response => response.json())
        .then(function(data) {
            document.getElementById('carModalLabel').innerText = `${data.name} (Hersteller: ${data.manufacturer__name})`;
            document.getElementById('input-update-car-name').value = data.name;
            document.getElementById('select-update-car-manufacturer').value = `${data.manufacturer}`;
            update_id_car = parseInt(data.id);
        })
        .catch((error) => {
            console.log('Error: ', error);
        });
    };

    const update_manufacturer = pk => {
        let url = `${url_basic}api/update/manufacturer/${pk}/`;
        let csrftoken = getCookie('csrftoken');
        let form = document.getElementById('form-update-manufacturer');
        let input_name = document.getElementById('input-update-manufacturer-name').value;
        let input_year = document.getElementById('input-update-manufacturer-year').value;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                'name': input_name,
                'founding_year': input_year
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success: ', data)
        })
        .then(function() {
            form.reset();
            $("#manufacturerModal").modal("hide");
            reset_table_body(tblbody_manufacturer);
            reset_table_body(tblbody_car);
            get_list_manufactuer(tblbody_manufacturer);
            get_list_car(tblbody_car);
            fill_manufacturer_select(select_manufacturer_main);
        })
        .catch((error) => {
            console.log('Error: ', error);
        });
    };

    const update_car = pk => {
        let url = `${url_basic}api/update/car/${pk}/`;
        let csrftoken = getCookie('csrftoken');
        let form = document.getElementById('form-update-car');
        let input_car = document.getElementById('input-update-car-name');
        let select_car = document.getElementById('select-update-car-manufacturer');

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                'name': input_car.value,
                'manufacturer': select_car.value
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success: ', data);
        })
        .then(function() {
            form.reset();
            $("#carModal").modal("hide");
            reset_table_body(tblbody_car);
            get_list_car(tblbody_car);
        })
        .catch((error) => {
            console.log('Errors: ', error)
        });
    };

    const delete_manufacturer = pk => {
        let url = `${url_basic}api/delete/manufacturer/${pk}/`;
        let csrftoken = getCookie('csrftoken');

        fetch(url, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': csrftoken,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log('API Delete: ', response)
            reset_table_body(tblbody_manufacturer);
            reset_table_body(tblbody_car);
            get_list_manufactuer(tblbody_manufacturer);
            get_list_car(tblbody_car);
            fill_manufacturer_select(select_manufacturer_main);
        })
    };

    const delete_car = pk => {
        let url = `${url_basic}api/delete/car/${pk}/`;
        let csrftoken = getCookie('csrftoken');

        fetch(url, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': csrftoken,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log('API Delete: ', response);
            reset_table_body(tblbody_car);
            get_list_car(tblbody_car);
        });
    };

    const getCookie = name => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };

    // call initial functions
    get_list_manufactuer(tblbody_manufacturer);
    get_list_car(tblbody_car);
    fill_manufacturer_select(select_manufacturer_main);

    // add eventlisteners
    btn_create_manufacturer.addEventListener('click', e => {
        e.preventDefault();
        create_manufacturer();
    });
    btn_update_manufacturer.addEventListener('click', e => {
        e.preventDefault();
        if (update_id_manufacturer !== null) {
            update_manufacturer(update_id_manufacturer);
            update_id_manufacturer = null;
        };
    });
    btn_create_car.addEventListener('click', e => {
        e.preventDefault();
        create_car();
    });
    btn_update_car.addEventListener('click', e => {
        e.preventDefault();
        if (update_id_car !== null) {
            update_car(update_id_car);
            update_id_car = null;
        }
    });
});
