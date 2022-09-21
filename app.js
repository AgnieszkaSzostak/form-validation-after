// czekam na wczytanie kodu HTML
document.addEventListener('DOMContentLoaded', init);

function init() {
    
    
    const fields = [
        {
            name: 'firstName',
            label: 'Imię',
            required: true,
            pattern: '^[a-zA-Z –-]+$',
        },
        {
            name: 'lastName',
            label: 'Nazwisko',
            required: true,
            pattern: '^[a-zA-Z –-]+$',
        },
        { name: 'street', label: 'Ulica', required: true },
        {
            name: 'houseNumber',
            label: 'Numer budynku',
            type: 'number',
            required: true,
        },
        { name: 'flatNumber', label: 'Numer mieszkania', type: 'number' },
        {
            name: 'zip',
            label: 'Kod pocztowy',
            pattern: '^[0-9]{2}-[0-9]{3}$',
            required: true,
        },
        {
            name: 'city',
            label: 'Miasto',
            required: true,
            pattern: '^[a-zA-Z –-]+$',
        },
        { name: 'voivodeship', label: 'Województwo', required: true },
        {
            name: 'mobileNumber',
            label: 'Numer telefonu komórkowego',
            type: 'number',
            pattern: '^[1-9]{9}$',
            required: true,
        },
    ];
    // sprawdzam, czy formularz został wyszukany i dopiero przypisuję nasłuchiwanie zdarzenia submit
    // ZADANIE DODATKOWE: wygeneruj formularz HTML na podstawie kodu tablicy obiektów: fields
    const form = document.createElement('form');
    form.setAttribute('action', '');
    form.setAttribute('method', 'post');
    form.setAttribute('novalidate', '');
    
 
    fields.forEach(function (field) {
        const {name, label, required = false, type = 'text', pattern = null} = field;

        const labelEl = document.createElement('label');
        labelEl.innerText = label;
        // utwórz element <input>
        // dodaj do <input> atrybuty z odpowiednimi wartościami (reszta właściwości obiektu)
        const inputEl = document.createElement('input');
        inputEl.setAttribute('name', name);
        inputEl.setAttribute('required', required);
        inputEl.setAttribute('type', type);
        inputEl.setAttribute('pattern', pattern);
        labelEl.appendChild(inputEl);
        const divEl = document.createElement('div');
        divEl.appendChild(labelEl);
        form.appendChild(divEl);
    });
    
    const submitButton = document.createElement('button');
    const divEl = document.createElement('div');
    submitButton.setAttribute('type', 'submit');
    submitButton.innerText = 'Wyślij';
    divEl.appendChild(submitButton);
    form.appendChild(divEl);
    const body = document.querySelector('body');
    const script = document.querySelector('script');
    body.insertBefore(form, script);
    const uList = document.createElement('ul');
    body.insertBefore(uList, form);
    form.addEventListener('submit', handleSubmit);
    
    function handleSubmit(e) {
        e.preventDefault();
        
        const errors = [];
        fields.forEach(function (field) {
            const {name, label, required = false, type = 'text', pattern = null} = field;

            const value = form.elements[name].value;

            if (required) {
                if (value.length === 0) {
                    errors.push('Dane w polu ' + label + ' są wymagane.');
                }
            }

            if (type === 'number') {
                if (Number.isNaN(Number(value))) {
                    errors.push(
                        'Dane w polu ' + label + ' muszą być liczbą.'
                    );
                }
            }

            if (pattern) {
                const reg = new RegExp(pattern);
                if (!reg.test(value)) {
                    errors.push(
                        'Dane w polu ' +
                            label +
                            ' zawierają niedozwolone znaki lub nie są zgodne z przyjętym w Polsce wzorem.'
                    );
                }
            }
        });

        uList.innerHTML = '';
        if (errors.length === 0) {
            alert('Dane zostały wypełnione prawidłowo!');
            fields.forEach(function (el) {
                form[el.name].value = '';
            });
        } else {
            errors.forEach(function (text) {
                const liEl = document.createElement('li');
                liEl.innerText = text;
                uList.appendChild(liEl);
            });
        }
    }
}

