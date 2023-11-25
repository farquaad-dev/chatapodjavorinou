const target = document.querySelector('#calendar');
const btn_prev = document.querySelector('#calendar-prev');
const btn_next = document.querySelector('#calendar-next');
const form_date_start = document.querySelector('#id_date_start');
const form_date_end = document.querySelector('#id_date_end');

const dateTimeReviver = (key, value) => {
    if (typeof value === 'string') {
        let d = new Date(value);
        d.setHours(0, 0, 0, 0);
        return d;
    }
    return value;
}

const reservations = JSON.parse(document.querySelector('#json-reservations').textContent, dateTimeReviver);
const weekdays = JSON.parse(document.querySelector('#json-weekdays').textContent);
const months = JSON.parse(document.querySelector('#json-months').textContent);

let showMonth = new Date().getMonth();
let showYear = new Date().getFullYear();

const dateOrNull = (val) => {
    if (!val || val === '') return null;
    const d = new Date(val);
    if (isNaN(d)) return null;
    d.setHours(0, 0, 0, 0);
    return d;
}

let dateRange = {
    _start: dateOrNull(form_date_start.value),
    _end: dateOrNull(form_date_end.value),
    _hoverEnd: null,

    get start() {
        return this._start;
    },
    set start(date) {
        if (date <= new Date()) return;

        this._start = date;
        form_date_start.value = date ? `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}` : '';
        updateHighlight();
    },

    get end() {
        return this._end;
    },
    set end(date) {
        let col = false;
        for (const reservation of reservations) {
            if (this.start < reservation.from && date >= reservation.from) {
                col = true;
                break;
            }
        }

        if (col) {
            this._start = date;
        } else {
            this._end = date;
        }

        form_date_end.value = date ? `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}` : '';
        updateHighlight();
    },

    get hoverEnd() {
        return this._hoverEnd;
    },
    set hoverEnd(date) {
        for (const reservation of reservations) {
            if (this.start < reservation.from && date >= reservation.from) {
                return;
            }
        }

        this._hoverEnd = date;
        updateHighlight();
    },
}

const handleClick = (date) => {
    if (!dateRange.start) {
        dateRange.start = date;
        return;
    }
    if (date < dateRange.start && !dateRange.end) {
        dateRange.start = date;
        dateRange.end = null;
        return;
    }
    if (!dateRange.end) {
        dateRange.end = date;
        return;
    }

    // reset selection
    dateRange.start = date;
    dateRange.end = null;
}

const handleHover = (date) => {
    if (!dateRange.start) return;
    dateRange.hoverEnd = date;
}

const updateHighlight = () => {
    if (!dateRange.start) return;

    let end = dateRange.end ? dateRange.end : dateRange._hoverEnd;
    if (!end || end < dateRange.start) {
        end = dateRange.start;
    }

    for (let element of target.querySelectorAll('.calendar-day')) {
        const d = new Date(Number(element.dataset.date));

        if (dateRange.start <= d && d <= end) {
            element.classList.add('bg-brown', 'bg-brown-light', 'text-white');
            element.classList.remove(dateRange.end ? 'bg-brown-light' : 'bg-brown');
        } else {
            element.classList.remove('bg-brown-light', 'bg-brown', 'text-white');
        }

        if (d.valueOf() === dateRange.start.valueOf()) {
            element.classList.add('rounded-l-full');
        } else {
            element.classList.remove('rounded-l-full');
        }

        if (d.valueOf() === end.valueOf()) {
            element.classList.add('rounded-r-full');
        } else {
            element.classList.remove('rounded-r-full');
        }
    }
}

const Calendar = (year, month) => {
    const cnt = new Date(year, month+1, 0).getDate();
    const start = new Date(year, month, 1).getDay();
    const today = new Date();

    let days = [];
    let resI = 0;
    for (let d = 1; d <= cnt; d++) {
        let cd = new Date(year, month, d);
        let obj = {
            date: cd,
            day: d,
            occupied: false,
        }

        while (resI < reservations.length && reservations[resI].to < cd) {
            resI++;
        }

        if (reservations[resI] && reservations[resI].from <= cd && cd <= reservations[resI].to) {
            obj.occupied = true;
        }

        if (cd < today) {
            obj.occupied = true;
        }

        days.push(obj);
    }

    return `
        <div class="flex flex-col">
            <div class="text-center pb-4 text-xl">${months[month]} ${year}</div>
            <div class="grid grid-cols-7 text-center text-neutral-600 py-2">
                ${weekdays.map((v) => `<span>${v}</span>`).join('')}
            </div>
            <div class="grid grid-cols-7 gap-y-1">
                ${days.map(d => `
                    <div data-date="${d.date.valueOf()}" class="calendar-day flex items-center justify-center aspect-square ${d.occupied ? 'text-neutral-300 cursor-not-allowed' : 'cursor-pointer'}" ${d.day === 1 ? `style="grid-column-start: ${start}"` : ''}>
                        <span>${d.day}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `
}

btn_prev.onclick = () => {
    showMonth--;
    if (showMonth < 0) {
        showMonth = 11;
        showYear--;
    }

    redraw();
}

btn_next.onclick = () => {
    showMonth++;
    if (showMonth > 11) {
        showMonth = 0;
        showYear++;
    }

    redraw();
}

const redraw = () => {
    const nextMonth = (showMonth + 1 > 11) ? 0 : showMonth + 1;
    const nextYear = (showMonth + 1 > 11) ? showYear + 1 : showYear;
    target.innerHTML = Calendar(showYear, showMonth) + Calendar(nextYear, nextMonth);

    for (const day of target.querySelectorAll('.calendar-day')) {
        const d = new Date(Number(day.dataset.date));
        day.onclick = () => handleClick(d);
        day.onmouseover = () => handleHover(d);
    }

    updateHighlight();
}

redraw();
