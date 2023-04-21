$('.ui.sidebar')
    .sidebar({
        context: $('.bottom.segment')
    })
    .sidebar('setting', 'transition', 'overlay')
    .sidebar('attach events', '._menu')
;

$('[data-ajax]').click(function(e){
    e.preventDefault();
    $('[data-ajax]').removeClass('active');
    $('#list').empty();
    const elm= $(this).attr('data-ajax');
    let items=extractItemByTitle(data,elm);
    generateList(items, 'list');
    let imgSrc=findImageFromParent(data,elm);
    $('._response .header img').attr('src', imgSrc);
    $('._response h2.header div.content').text(elm);
    $('._'+elm.toLowerCase()).addClass('active');
    $('._response').show();
    $('._main').hide();
});

$('.sidebar a').click(function(e){
    e.preventDefault();
    $('.ui.sidebar').sidebar('toggle');
});

document.body.addEventListener('click', function(e){
    if(e.target.classList.contains('_back')){
        e.preventDefault();
        $('._response').hide();
        $('._main').show();
        $('[data-ajax]').removeClass('active');
    }
});

const generateList = (data, containerId) => {
    const container = document.getElementById(containerId);
    data.forEach((item,index) => {
        let isFolder = item.children && item.children.length > 0;

        const listItem = document.createElement('div');
        listItem.classList.add('item');

        const icon = document.createElement('i');
        icon.classList.add('icon', isFolder ? 'folder' : 'file');

        const content = document.createElement('div');
        content.classList.add('content');

        const title = document.createElement(isFolder?'div':'a');
        title.classList.add('header');
        title.textContent = item.name;

        const description = document.createElement('div');
        description.classList.add('description');
        description.textContent = item.description;

        content.appendChild(title);
        content.appendChild(description);
        listItem.appendChild(icon);
        listItem.appendChild(content);
        container.appendChild(listItem);

        if (isFolder) {
            const sublist = document.createElement('div');
            const sublistId = `sublist-${containerId}-${index}`;
            sublist.id = sublistId;
            sublist.classList.add('list','ui');
            listItem.appendChild(sublist);
            generateList(item.children, sublist.id);
        }
    });
};
function extractItemByTitle(data, name) {
    let extractedItem = [];

    const extractItem = (items) => {
        items.forEach(item => {
            if (item.name === name) {
                extractedItem = item.children || [];
                return;
            }
            if (item.children && item.children.length > 0) {
                extractItem(item.children);
            }
        });
    };

    extractItem(data);

    return extractedItem;
}


function findImageFromParent(data, title){
    let foundItem = null;
    let foundImage=null;
    // Fonction récursive pour parcourir les objets du tableau
    const findItem = (items) => {
        items.forEach(item => {
            if(foundItem===null) {
                if (item.image) {
                    foundImage = item.image;
                }
                if (item.name === title) {
                    foundItem = item;
                    return;
                }
            }
            if (item.children && item.children.length > 0 && foundItem === null) {
                findItem(item.children);
            }
        });
    };

    findItem(data);

    return foundImage;
}


const data = [
    {
        name: 'Client-serveur',
        description: 'Client/serveur',
        image: 'https://img.freepik.com/free-vector/www-concept-illustration_114360-2143.jpg?w=826&t=st=1681735982~exp=1681736582~hmac=40cf55413fc3916a6b607eecc0814c6c76e42abe1965d86d0c7a4c5d221d5ef5',
        children: [
            {
                name: 'Séance 2',
                description: 'Architecture client/serveur',
            },
            {
                name: 'Séance 3',
                description: 'Culture Web',
            }
        ]
    },
    {
        name: 'Javascript',
        description: 'Javascript',
        image:'https://img.freepik.com/free-vector/javascript-abstract-concept-illustration_335657-3702.jpg?w=826&t=st=1681736408~exp=1681737008~hmac=e67312f3a8d886c3ed98424c3b843ef847cf826922cebc86746e70c575db3f46',
        children: [
            {
                name: 'Séance 8',
                description: 'Programmation côté client',
                children: [
                    {
                        name: 'Exercices',
                        description: 'Exercices de manipulation du DOM',
                        children: [
                            {
                                name: 'Background-color.html',
                                description: 'Changement de la couleur de fond'
                            },
                            {
                                name: 'Add-select.html',
                                description: 'Ajouter un élément à une liste HTML sur click'
                            },
                            {
                                name: 'Addition.html',
                                description: 'Calculer la somme de deux nombres'
                            },
                            {
                                name: 'Images.html',
                                description: 'Chargement d\'une image sur click'
                            },
                            {
                                name: 'Alert-mouse-over.html',
                                description: 'Afficher une alerte sur mouseover'
                            },
                            {
                                name: 'Horloge.html',
                                description: 'Afficher l\'heure courante'
                            },
                            {
                                name: 'Delete-conf.htm',
                                description: 'Afficher une alerte de confirmation avant de supprimer un élément'
                            },
                            {
                                name: 'Toggle-check.html',
                                description: 'Afficher un message si la case est cochée'
                            },
                            {
                                name: 'Form-contact.html',
                                description: 'Formulaire de contact'
                            }
                        ]
                    },
                    {
                        name: 'Styles',
                        description: "Interfaces de modification des styles d'écriture'"
                    },
                    {
                        name: 'Todo Liste',
                        description: 'Gestion de liste de tâches',
                    },
                    {
                        name: 'Mentions légales V4',
                        description: 'Requêtes Ajax HTTP'
                    },

                ]
            },
            {
                name: 'Séance 9',
                description: 'Echange de données, formulaires et validation',
                children:[
                    {
                        name: 'contact.html',
                        description: 'Formulaire de contact, validation HTML5'
                    },
                    {
                        name: 'signin.html',
                        description: 'Formulaire de création de compte, validation JS'
                    }
                ]
            }
        ]
    }

];