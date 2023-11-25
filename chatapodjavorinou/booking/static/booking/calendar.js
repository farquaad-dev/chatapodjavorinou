const target = document.querySelector('#calendar');
const btn_prev = document.querySelector('#calendar-prev');
const btn_next = document.querySelector('#calendar-next');

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

const Calendar = (year, month) => {
    const cnt = new Date(year, month+1, 0).getDate();
    const start = new Date(year, month, 1).getDay();

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

        days.push(obj);
    }

    return `
        <div class="flex flex-col">
            <div class="text-center pb-4 text-xl">${months[month]} ${year}</div>
            <div class="grid grid-cols-7 text-center text-neutral-600 py-2">
                ${weekdays.map((v) => `<span>${v}</span>`).join('')}
            </div>
            <div class="grid grid-cols-7">
                ${days.map(d => `
                    <div class="flex items-center justify-center aspect-square rounded-full ${d.occupied ? 'text-neutral-300 cursor-not-allowed' : 'hover:bg-red-600 hover:text-white cursor-pointer'}" ${d.day === 1 ? `style="grid-column-start: ${start}"` : ''}>
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
}

redraw();
