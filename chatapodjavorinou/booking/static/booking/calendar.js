const target = document.querySelector('#calendar');
const btn_prev = document.querySelector('#calendar-prev');
const btn_next = document.querySelector('#calendar-next');

const reservations = JSON.parse(document.querySelector('#json-reservations').textContent);
const weekdays = JSON.parse(document.querySelector('#json-weekdays').textContent);
const months = JSON.parse(document.querySelector('#json-months').textContent);

let showMonth = new Date().getMonth();
let showYear = new Date().getFullYear();

let Calendar = (year, month) => {
    const cnt = new Date(year, month, 0).getDate();
    const start = new Date(year, month, 1).getDay();

    return `
        <div class="flex flex-col">
            <div class="text-center pb-4 text-xl">${months[month]} 2023</div>
            <div class="grid grid-cols-7 text-center text-neutral-600 py-2">
                ${weekdays.map((v) => `<span>${v}</span>`).join('')}
            </div>
            <div class="grid grid-cols-7">
                ${[...Array(cnt).keys()].map(i => `
                    <div class="flex items-center justify-center aspect-square hover:bg-red-600 hover:text-white rounded-full" ${i === 0 ? `style="grid-column-start: ${start}"` : ''}>
                        <span>${i+1}</span>
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

let redraw = () => {
    const nextMonth = (showMonth + 1 > 11) ? 0 : showMonth + 1;
    const nextYear = (showMonth + 1 > 11) ? showYear + 1 : showYear;
    target.innerHTML = Calendar(showYear, showMonth) + Calendar(nextYear, nextMonth);
}

redraw();
