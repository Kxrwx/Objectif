document.getElementById('bouton').addEventListener('click', function () {
    var aside = document.getElementById('aside');
    if (aside.style.display === 'none') {
        aside.style.display = 'flex'; // Affiche l'aside
    } else {
        aside.style.display = 'none'; // Cache l'aside
    }
});




document.getElementById('filtre').addEventListener('click', function () {
    var PopUpFil = document.getElementById('PopUpFil');
    var BackFil = document.getElementById('BackFil');
    if (PopUpFil.style.display === 'none') {
        PopUpFil.style.display = 'flex'
        BackFil.style.display = 'block'
    } else {
        PopUpFil.style.display = 'none'
        BackFil.style.display = 'none'
    }
});

document.getElementById('CancelFil').addEventListener('click', function () {
    var PopUpFil = document.getElementById('PopUpFil');
    var BackFil = document.getElementById('BackFil');
    if (PopUpFil.style.display === 'flex') {
        PopUpFil.style.display = 'none'
        BackFil.style.display = 'none'
    } else {
        PopUpFil.style.display = 'flex'
        BackFil.style.display = 'flex'
    }
});



// Compteur global pour les ID des boîtes
let boxCounter = 0;

// Fonction pour afficher le pop-up d'édition avec les informations de la boîte sélectionnée
function showPopUp(box) {
    var BackDet = document.getElementById('BackDet');
    var PopUpDet = document.getElementById('PopUpDet');

    // Remplir le formulaire avec les informations de la boîte sélectionnée
    document.getElementById('editTitle').value = box.querySelector('.title').textContent;
    document.getElementById('editDesc').value = box.querySelector('.description').textContent;
    document.getElementById('editStart').value = box.querySelector('.start').textContent;
    document.getElementById('editEnd').value = box.querySelector('.end').textContent;

    // Extraire uniquement l'URL de l'image de background-image
    const backgroundImage = box.querySelector('.right').style.backgroundImage;
    const imageUrl = backgroundImage.match(/url\(["']?([^"']*)["']?\)/)[1];
    document.getElementById('editImage').value = imageUrl;

    BackDet.style.display = 'flex';
    PopUpDet.style.display = 'flex';

    // Marquer la box sélectionnée
    document.querySelectorAll('.box').forEach(b => b.classList.remove('selected'));
    box.classList.add('selected');
}

// Ajouter un événement de soumission au formulaire pour sauvegarder les modifications
document.getElementById('editForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Sauvegarder les modifications
    var editedTitle = document.getElementById('editTitle').value;
    var editedDesc = document.getElementById('editDesc').value;
    var editedStart = document.getElementById('editStart').value;
    var editedEnd = document.getElementById('editEnd').value;
    var editedImage = document.getElementById('editImage').value;

    // Vérifier la longueur de la description
    if (editedDesc.length > 600) {
        alert('La description ne doit pas dépasser 600 caractères.');
        return; // Empêcher la sauvegarde si la description dépasse 600 caractères
    }

    var selectedBox = document.querySelector('.box.selected');
    if (selectedBox) {
        selectedBox.querySelector('.title').textContent = editedTitle;
        selectedBox.querySelector('.description').textContent = editedDesc;
        selectedBox.querySelector('.start').textContent = editedStart;
        selectedBox.querySelector('.end').textContent = editedEnd;

        // Mettre à jour le texte "Date de début" et "Date de fin" dans la boîte
        selectedBox.querySelector('.start').innerHTML = `Date de début: <br>${editedStart}`;
        selectedBox.querySelector('.end').innerHTML = `Date de fin: <br>${editedEnd}`;

        if (editedImage) {
            selectedBox.querySelector('.right').style.backgroundImage = `linear-gradient(to left, rgba(0, 0, 0, 0.5), #4A4A4A), url('${editedImage}')`;
        } else {
            selectedBox.querySelector('.right').style.backgroundImage = "linear-gradient(to left, rgba(0, 0, 0, 0.5), #4A4A4A), url('https://cdn.mos.cms.futurecdn.net/dP3N4qnEZ4tCTCLq59iysd.jpg')";
        }
    }

    // Fermer le pop-up d'édition
    document.getElementById('BackDet').style.display = 'none';
    document.getElementById('PopUpDet').style.display = 'none';
});


// Ajouter un événement de clic au bouton "Annuler" pour fermer le pop-up d'édition
document.getElementById('CancelDet').addEventListener('click', function (event) {
    event.preventDefault(); // Empêcher la soumission du formulaire par défaut (si le bouton est dans un formulaire)

    var BackDet = document.getElementById('BackDet');
    var PopUpDet = document.getElementById('PopUpDet');

    // Masquer simplement le pop-up d'édition
    BackDet.style.display = 'none';
    PopUpDet.style.display = 'none';
});

// Fonction pour ouvrir le gestionnaire de fichiers lorsque la div est cliquée
function openFileChooser() {
    document.getElementById('fileInput').click();
}

// Événement capturant la sélection de fichier
document.getElementById('fileInput').addEventListener('change', function () {
    var fileListContainer = document.getElementById('fileList');

    // Pour chaque fichier sélectionné, créer une nouvelle div pour le représenter
    for (var i = 0; i < this.files.length; i++) {
        var file = this.files[i];
        var fileDiv = document.createElement('div');
        fileDiv.classList.add('fileDiv');
        fileDiv.textContent = file.name;
        fileDiv.setAttribute('data-file', file.name); // Ajoutez d'autres attributs ou données si nécessaire

        // Ajoutez un événement pour ouvrir ce fichier (exemple)
        fileDiv.addEventListener('click', function () {
            alert('Ouverture du fichier : ' + this.getAttribute('data-file'));
            // Ajoutez ici le code pour ouvrir le fichier, par exemple afficher son contenu
        });

        fileListContainer.appendChild(fileDiv);
    }

    // Réinitialiser le champ d'upload de fichier (facultatif)
    this.value = '';
});

// Gestion de l'ajout d'une nouvelle boîte
document.getElementById('Add').addEventListener('click', function () {
    var PopUp = document.getElementById('PopUp');
    var Back = document.getElementById('Back');
    if (PopUp.style.display === 'none') {
        PopUp.style.display = 'flex';
        Back.style.display = 'flex'; // Afficher également le fond
    } else {
        PopUp.style.display = 'none';
        Back.style.display = 'none'; // Cacher le fond
    }
});

// Gestion de l'annulation dans le formulaire d'ajout
document.getElementById('Cancel').addEventListener('click', function () {
    var PopUp = document.getElementById('PopUp');
    var Back = document.getElementById('Back');
    if (PopUp.style.display === 'flex') {
        PopUp.style.display = 'none';
        Back.style.display = 'none'; // Cacher le fond
    } else {
        PopUp.style.display = 'flex';
        Back.style.display = 'flex'; // Afficher le fond
    }
});

// Ajouter une nouvelle boîte
document.getElementById('Add2').addEventListener('click', function () {
    var PopUp = document.getElementById('PopUp');
    var Back = document.getElementById('Back');

    // Récupérer les valeurs des champs d'entrée
    var nom = document.querySelector('#PopUp input[placeholder="Nom"]').value;
    var descriptionInput = document.querySelector('#PopUp input[placeholder="Description"]');
    var description = descriptionInput.value;
    var dateDebut = document.querySelector('#PopUp input[type="date"]').value;
    var dateFin = document.querySelector('#PopUp input[type="date"]').value;
    var imageUrl = document.querySelector('#PopUp input[placeholder="Image URL"]').value;

    // Vérifier si la description dépasse 600 caractères
    if (description.length > 100) {
        alert('La description ne doit pas dépasser 600 caractères.');
        descriptionInput.value = ""; // Effacer le champ de description
        return; // Ne pas ajouter la boîte si la description dépasse 600 caractères
    }

    // Créer une nouvelle boîte avec les valeurs des champs d'entrée
    var newBox = document.createElement('div');
    newBox.classList.add('box');
    newBox.id = `box-${++boxCounter}`; // Ajouter un ID unique
    newBox.innerHTML = `
        <div class="titre">
            <h1 class="title">${nom}</h1>
            <i class="fa-regular fa-star"></i>
        </div>
        <div class="all">
            <div class="left">
                <p class="description">${description}</p>
            </div>
            <div class="trait"></div>
            <div class="right" style="background-image: linear-gradient(to left, rgba(0, 0, 0, 0.5), #4A4A4A), url('${imageUrl || 'https://cdn.mos.cms.futurecdn.net/dP3N4qnEZ4tCTCLq59iysd.jpg'}')">
                <div>
                    <h1 class="start">Date de début: <br>${dateDebut}</h1>
                    <h1 class="end">Date de fin: <br>${dateFin}</h1>
                </div>
            </div>
        </div>
    `;

    // Ajouter un événement de clic pour afficher le pop-up de modification
    newBox.addEventListener('click', function () {
        showPopUp(newBox);
    });

    // Ajouter la nouvelle boîte à votre conteneur de boîtes
    document.querySelector('article').appendChild(newBox);

    // Fermer la fenêtre contextuelle après avoir ajouté une nouvelle boîte
    PopUp.style.display = 'none';
    Back.style.display = 'none'; // Cacher le fond

    // Réinitialiser les valeurs des champs d'entrée
    document.querySelector('#PopUp input[placeholder="Nom"]').value = "";
    descriptionInput.value = "";
    document.querySelector('#PopUp input[type="date"]').value = "";
    document.querySelector('#PopUp input[placeholder="Image URL"]').value = "";
});
















function sortBoxes(sortType) {
    var boxes = document.querySelectorAll('article .box');
    var boxesArray = Array.from(boxes);

    switch (sortType) {
        case 'title-asc':
            boxesArray.sort(compareTitleAscending);
            break;
        case 'title-desc':
            boxesArray.sort(compareTitleDescending);
            break;
        case 'start-date-asc':
            boxesArray.sort(compareStartDateAscending);
            break;
        case 'start-date-desc':
            boxesArray.sort(compareStartDateDescending);
            break;
        case 'end-date-asc':
            boxesArray.sort(compareEndDateAscending);
            break;
        case 'end-date-desc':
            boxesArray.sort(compareEndDateDescending);
            break;
        default:
            // Ne rien faire si le type de tri n'est pas reconnu
            return;
    }

    // Réinsérer les boîtes triées dans l'ordre
    var article = document.querySelector('article');
    article.innerHTML = ''; // Vider le conteneur actuel

    boxesArray.forEach(function (box) {
        article.appendChild(box);
    });
}

// Fonctions de comparaison pour différents types de tri
function compareTitleAscending(boxA, boxB) {
    var titleA = boxA.querySelector('.title').textContent.toLowerCase();
    var titleB = boxB.querySelector('.title').textContent.toLowerCase();
    if (titleA < titleB) return -1;
    if (titleA > titleB) return 1;
    return 0;
}

function compareTitleDescending(boxA, boxB) {
    var titleA = boxA.querySelector('.title').textContent.toLowerCase();
    var titleB = boxB.querySelector('.title').textContent.toLowerCase();
    if (titleA > titleB) return -1;
    if (titleA < titleB) return 1;
    return 0;
}

function compareStartDateAscending(boxA, boxB) {
    var dateA = new Date(boxA.querySelector('.start').textContent.replace('Date de début: ', ''));
    var dateB = new Date(boxB.querySelector('.start').textContent.replace('Date de début: ', ''));
    return dateA - dateB;
}

function compareStartDateDescending(boxA, boxB) {
    var dateA = new Date(boxA.querySelector('.start').textContent.replace('Date de début: ', ''));
    var dateB = new Date(boxB.querySelector('.start').textContent.replace('Date de début: ', ''));
    return dateB - dateA;
}

function compareEndDateAscending(boxA, boxB) {
    var dateA = new Date(boxA.querySelector('.end').textContent.replace('Date de fin: ', ''));
    var dateB = new Date(boxB.querySelector('.end').textContent.replace('Date de fin: ', ''));
    return dateA - dateB;
}

function compareEndDateDescending(boxA, boxB) {
    var dateA = new Date(boxA.querySelector('.end').textContent.replace('Date de fin: ', ''));
    var dateB = new Date(boxB.querySelector('.end').textContent.replace('Date de fin: ', ''));
    return dateB - dateA;
}

// Fonction pour fermer le pop-up
function closePopup() {
    // Remplacez le sélecteur avec l'ID de votre pop-up
    var popup = document.getElementById('PopUpFil');
    if (popup) {
        popup.style.display = 'none';
    }
}







document.addEventListener('DOMContentLoaded', function () {
    var input = document.querySelector('.container1 input');
    var searchButton = document.querySelector('.container1 button');

    // Ajout d'un écouteur d'événement sur le bouton de recherche
    searchButton.addEventListener('click', function () {
        var searchTerm = input.value.trim().toLowerCase(); // Obtient le terme de recherche en minuscules

        // Sélectionne toutes les boîtes
        var boxes = document.querySelectorAll('article .box');

        // Parcours de toutes les boîtes pour les filtrer en fonction du terme de recherche
        boxes.forEach(function (box) {
            var titleElement = box.querySelector('.title');
            var titleText = titleElement.textContent.toLowerCase();

            // Vérifie si le terme de recherche est inclus dans le texte du titre de la boîte
            if (titleText.includes(searchTerm)) {
                box.style.display = 'block'; // Affiche la boîte si elle correspond
            } else {
                box.style.display = 'none'; // Cache la boîte si elle ne correspond pas
            }
        });
    });
});
