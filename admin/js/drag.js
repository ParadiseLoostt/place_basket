const DRAGZONE = document.querySelector('.dragZone');
// разрешенные типы загрузки файлов
const IMAGES = ['png','jpg','jpeg','webp','svg'];
const OTHER = ['zip','rar','7z'];
const MAP = {
    zip:'fa-solid fa-file-zipper',
    default:'fa-solid fa-file'
}
const MAXSIZE = 20 *(1024**2) // bytes
const PREVIEW = document.querySelector('.dragZone__preview');
let data = new FormData();

DRAGZONE.addEventListener('dragenter',Event=>{
    Event.preventDefault();
    console.log('dragenter');
});

DRAGZONE.addEventListener('dragleave',Event=>{
    Event.preventDefault();
    console.log('dragleave');
});

DRAGZONE.addEventListener('dragover',Event=>{
    Event.preventDefault();
    console.log('dragover');
});

DRAGZONE.addEventListener('drop',Event=>{
    Event.preventDefault();
    let files = Event.dataTransfer.files;
    // если файлы есть
    if (files)
    {
        // очистка
        PREVIEW.innerHTML = '';
        let idx = 0;
        // перебор файла
        for (let file of files)
        {
            // let getType = file.name.split('.').at(-1);
            let getType = file.name.split('.').pop()

            // для изображений
            if (IMAGES.includes(getType) && file.size <= MAXSIZE)
            {
                // генерируем ссылку для изображения 
                let url = URL.createObjectURL(file);
                PREVIEW.insertAdjacentHTML('afterbegin',`
                <div class="dragZone__img">
                    <img src="${url}">
                    <i data-index="${idx}" class="close fa-solid fa-circle-xmark fa-2xs"></i>
                </div>`);
                data.append(idx,file);
            }

            if (OTHER.includes(getType) && file.size <= MAXSIZE)
            {
                let url = (MAP[getType])? MAP[getType]: MAP.default;
                PREVIEW.insertAdjacentHTML('afterbegin',`
                <div class="dragZone__img">
                    <i class="${url}"></i>
                    <i data-index="${idx}" class="close fa-solid fa-circle-xmark fa-2xs"></i>
                </div>`);
                data.append(idx,file);
            }

            idx++;
        }
    }
});


PREVIEW.addEventListener('click',Event=>{

    let elem = Event.target;
    if (elem.classList.contains('close'))
    {
        // получаем id
        let id = elem.getAttribute('data-index');
        // удаляем элемент визуально
        elem.parentNode.remove();
        // удаляем с объекта
        data.delete(id);

        for(let [key,value] of data)
        {
            console.log(key,value);
        }
    }
})

function uploadImages()
{
    console.log('upload images to server');
}

