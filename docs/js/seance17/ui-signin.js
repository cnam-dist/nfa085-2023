$(document).ready(function() {
    $('.tabular.menu .item').tab();
    $('.ui.checkbox').checkbox();
    $('[name=mp]').change(function(evt) {
        $('.ui.form').form('remove field', 'carte').form('add rule', 'carte', 'creditCard[' + evt.target.value + ']');
    })
    $('.ui.dropdown')
        .dropdown({
            allowAdditions: true,
            hideAdditions: false,
            className: {
                addition: 'stuck addition'
            }
        })
    ;
    // Activer la validation du formulaire
    $('#testForm').form({
        inline: true,
        on: 'blur',
        fields: {
            nom: {
                identifier: 'nom',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Veuillez entrer un nom.'
                    }
                ]
            },
            prenom: {
                identifier: 'prenom',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Veuillez entrer un prénom.'
                    }
                ]
            },
            email: {
                identifier: 'email',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Veuillez entrer une adresse email.'
                    },
                    {
                        type: 'email',
                        prompt: 'Veuillez entrer une adresse email valide.'
                    }
                ]
            },
            motdepasse: {
                identifier: 'motdepasse',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Veuillez entrer un mot de passe.'
                    },
                    {
                        type: 'minLength[6]',
                        prompt: 'Le mot de passe doit avoir au moins 6 caractères.'
                    },
                    {
                        type: 'regExp[/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[0-9]).{6,}$/]',
                        prompt: 'Le mot de passe doit avoir au moins 1 chiffre, 1 majuscule, un caractère spécial et une minuscule.'
                    }
                ]
            },
            confirmationMotdepasse: {
                identifier: 'confirmationMotdepasse',
                rules: [
                    {
                        type: 'match[motdepasse]',
                        prompt: 'Les mots de passe ne correspondent pas.'
                    }
                ]
            },
            connuPar: {
                identifier  : 'connuPar',
                rules: [
                    {
                        type   : 'minCount[1]',
                        prompt : 'Sélectionnez ou ajoutez une option.'
                    }
                ]
            },
            conditions: {
                identifier: 'conditions',
                rules: [
                    {
                        type: 'checked',
                        prompt: 'Vous devez accepter les conditions d\'utilisation.'
                    }
                ]
            },
            age : {
                identifier: 'age',
                rules: [
                    {
                        type: 'integer[1..120]',
                        prompt: 'Veuillez entrer un âge valide.'
                    }
                ]
            }
        }
    });
});