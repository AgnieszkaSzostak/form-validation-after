// czekam na wczytanie kodu HTML
document.addEventListener('DOMContentLoaded', init);

function init() {
    const formEl = document.querySelector('form');
    const ulEl = document.querySelector('ul');

    // sprawdzam, czy formularz został wyszukany i dopiero przypisuję nasłuchiwanie zdarzenia submit
    if (formEl) {
        formEl.addEventListener('submit', handleSubmit);
    }

    function handleSubmit(e) {
        // blokuję automatyczne wysłanie formularza
        e.preventDefault();

        const errors = [];

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
            // {
            //     name: 'mobileNumber',
            //     label: 'Numer telefonu komórkowego',
            //     type: 'number',
            //     pattern: '^[1-9]{9}$',
            //     required: true,
            // },
        ];

        fields.forEach(function (field) {
            // wykorzystuję właściwość obiektu o nazwie name, by pobrać wartość konkretnego elementu formularza
            const value = formEl.elements[field.name].value;

            if (field.required) {
                if (value.length === 0) {
                    errors.push('Dane w polu ' + field.label + ' są wymagane.');
                }
            }

            if (field.type === 'number') {
                if (Number.isNaN(Number(value))) {
                    errors.push(
                        'Dane w polu ' + field.label + ' muszą być liczbą.'
                    );
                }
            }

            if (field.pattern) {
                const reg = new RegExp(field.pattern);
                if (!reg.test(value)) {
                    errors.push(
                        'Dane w polu ' +
                            field.label +
                            ' zawierają niedozwolone znaki lub nie są zgodne z przyjętym w Polsce wzorem.'
                    );
                }
            }
        });

        // czyszczę listę błędów
        ulEl.innerHTML = '';
        if (errors.length === 0) {
            alert('Dane zostały wypełnione prawidłowo!');

            // czyszczę pola po prawidłowym wypełnieniu formularza
            fields.forEach(function (el) {
                formEl[el.name].value = '';
            });
        } else {
            errors.forEach(function (text) {
                const liEl = document.createElement('li');
                liEl.innerText = text;

                ulEl.appendChild(liEl);
            });
        }
    }
}

// ZADANIE DODATKOWE: wygeneruj formularz HTML na podstawie kodu tablicy obiektów: fields

// utwórz element <form>
// ustaw na nim nasłuchiwanie na zdarzenie submit i dodaj funkcję, która to zdarzenie obsłuży (możesz wykorzystać naszą funkcję handleSubmit)
fields.forEach(function (field) {
    // Dla każdego elementu tablicy (field):
    // utwórz element <label>
    // dodaj do <label> innerText z właściwości name
    // utwórz element <input>
    // dodaj do <input> atrybuty z odpowiednimi wartościami (reszta właściwości obiektu)
    // dodaj <input> do jego rodzica: <label>
    // nieobowiązkowo: stwórz <div> i wstaw tam <label> jako dziecko
    // dodaj <div> lub <label> (zależy, na co się zdecydowałeś) do rodzica: <form>
});
// dodaj element <form> do drzewa DOM
