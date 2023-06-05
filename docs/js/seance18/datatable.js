const table = document.querySelector('table');
const hiddenFields = document.querySelector('#hiddenFields');

let loadedData=[];
let columns=[];
let activeDataName='users';
function loadData(type){
    const url='https://jsonplaceholder.typicode.com/'+type;

    fetch(url)
        .then(response => response.json())
        .then(data=> {
            loadedData = data
            displayData(loadedData);
        })
}

function displayData(data){
    const thead = table.querySelector('thead');
    const tbody = table.querySelector('tbody');
    columns = getColumnsFromData(data);
    const cols = columns.map((v) => ({value: v,text: v,name: v}));
    $(hiddenFields).dropdown('change values',cols);
    const tr = document.createElement('tr');
    columns.forEach(column => {
        const th = document.createElement('th');
        const ck=document.createElement('div');
        ck.classList.add('ui','checkbox');
        const input=document.createElement('input');
        input.setAttribute('type','checkbox');
        input.setAttribute('name','field');
        input.setAttribute('value',column);
        input.setAttribute('checked','checked');
        input.classList.add('_toHide');
        const label=document.createElement('label');
        label.innerText=column;
        ck.appendChild(input);
        ck.appendChild(label);
        th.appendChild(ck);
        tr.appendChild(th);
        thead.appendChild(tr);
    });

    data.forEach(object => {
        const tr = document.createElement('tr');
        columns.forEach(column => {
            const td = document.createElement('td');
            td.innerText = object[column];
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

function getColumnsFromData(objects){
    let columns = [];
    if(objects.length>0){
        for(let column in objects[0]){
            columns.push(column);
        }
    }
    return columns;
}

function hideField(field){
    const index = columns.indexOf(field);
    const ths = table.querySelectorAll('thead th');
    ths[index].style.display='none';
    const tds = table.querySelectorAll('tbody td:nth-child('+(index+1)+')');
    tds.forEach(td => td.style.display='none');
}

function showField(field){
    const index = columns.indexOf(field);
    const ths = table.querySelectorAll('thead th');
    ths[index].style.display='table-cell';
    const tds = table.querySelectorAll('tbody td:nth-child('+(index+1)+')');
    tds.forEach(td => td.style.display='table-cell');
}

$(document).ready(function () {
    $('.ui.dropdown').dropdown();

    $(document).on('click','._toHide',function () {
        const field = $(this).val();
        $(hiddenFields).dropdown('set selected',field);
    });

    $('#menu-options').dropdown({
        onChange: function (value, text, $selectedItem) {
            if($selectedItem.hasClass('color')){
                table.classList.remove('red','orange','yellow','green','teal','blue','violet','purple','pink','brown','grey','black');
                table.classList.add(value);
                $('.color').children('i').hide();
            }
            if($selectedItem.children('i').is(':visible')){
                $selectedItem.children('i').hide();
                $selectedItem.removeClass('active');
                table.classList.remove(value);
            }else{
                $selectedItem.children('i').show();
                $selectedItem.addClass('active');
                table.classList.add(value);
            }
        }
    });

    $('#data').change(function () {
        table.querySelector('thead').innerHTML='';
        table.querySelector('tbody').innerHTML='';
        loadData($(this).val());
    });

    $(hiddenFields).dropdown({
        onAdd: function (value, text, $selectedItem) {
            hideField(text);
        },
        onRemove: function (value, text, $selectedItem) {
            showField(text);
        }
    });

    loadData('users');
});
