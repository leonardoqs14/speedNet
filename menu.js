let btnMenu = document.getElementById('btn-menu')
let menu = document.getElementById('menu-mobile')
let overlay = document.getElementById('overlay-menu')

btnMenu.addEventListener('click', ()=>{
    menu.classList.add('abrir-menu')
})

menu.addEventListener('click', ()=>{
    menu.classList.remove('abrir-menu')
})
menu.addEventListener('click', ()=>{
    menu.classList.remove('abrir-menu')
})


// função para o acordion

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
   
    this.classList.toggle("active");

    
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}


// função para o formulario no whatsapp
        function enviarWhats (event){

            event.preventDefault()



            const nome = document.getElementById('nome').value //capturando o que digitou no nome
            const mensagem = document.getElementById('mensagem').value //capturando o que digitou na mensagem
            const telefone = '5561991043595' //pegando o telefone na qual recebrá todas as mensagens 

            const texto = `Olá! Me chamo ${nome}, ${mensagem}` // Criando o formato para ser enviado no whatsapp
            const msgFormatada = encodeURIComponent(texto)//Corrigir os espaços para ser enviado via whatsapp

            const url = `https://api.whatsapp.com/send?phone=${telefone}&text=${msgFormatada}`

            window.open(url,'_blank') //abrir a url no navegador em uma nova aba
            }


// função para o slide da secao topoDeSite

const sliderTrack = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".slide");
let index = 0;
let slideCount = slides.length;

// Clona todos os slides e adiciona ao final
slides.forEach(slide => {
  const clone = slide.cloneNode(true);
  sliderTrack.appendChild(clone);
});

function moveToSlide(i) {
  sliderTrack.style.transition = "transform 0.5s ease-in-out";
  sliderTrack.style.transform = `translateX(-${i * 100}%)`;
}

function nextSlide() {
  index++;
  moveToSlide(index);

  // Quando chegar no último clone, reseta para o primeiro original
  if (index === slideCount) {
    setTimeout(() => {
      sliderTrack.style.transition = "none"; // remove animação
      sliderTrack.style.transform = "translateX(0)"; // volta para o início
      index = 0;
    }, 500); // tempo igual ao da transição
  }
}

setInterval(nextSlide, 5000);


// Botao whatsapp

    (function() {
        var options = {
            "base": {
                "selectedChannels": ["whatsapp"],
                "config": null
            },
            "customize": {
                "buttonColor": "#4dc247",
                "buttonImage": null,
                "buttonStyle": "classic",
                "buttonText": "Contact Us",
                "closeText": "Close",
                "animationEnabled": true,
                "animationType": "moveIn",
                "borderEnabled": false,
                "notificationEnabled": true,
                "backgroundStyle": "solid",
                "buttonSize": 60,
                "shadow": 0.4,
                "position": "right",
                "shiftX": 0,
                "shiftY": 0,
                "showMode": "all",
                "showOn": "",
                "dontShowOn": ""
            },
            "boost": {
                "greetingEnabled": true,
                "displayFrequency": "every_3_hours",
                "greetingDelay": 3,
                "startChatText": "Falar com Atendente",
                "greetingMessage": "Olá 👋 Como podemos ajudar? Envie-nos uma mensagem agora mesmo para obter assistência.",
                "mirrorEnabled": false,
                "avatarImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAEwWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDI1LTEyLTA4PC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPmQxODY4ZDRjLTFiYjEtNGI4ZS1hZjdiLWI0NDA3OTk5YmYxYjwvQXR0cmliOkV4dElkPgogICAgIDxBdHRyaWI6RmJJZD41MjUyNjU5MTQxNzk1ODA8L0F0dHJpYjpGYklkPgogICAgIDxBdHRyaWI6VG91Y2hUeXBlPjI8L0F0dHJpYjpUb3VjaFR5cGU+CiAgICA8L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvQXR0cmliOkFkcz4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJz4KICA8ZGM6dGl0bGU+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5EZXNpZ24gc2VtIG5vbWUgLSA0PC9yZGY6bGk+CiAgIDwvcmRmOkFsdD4KICA8L2RjOnRpdGxlPgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlv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",
                "agentName": "Atendente",
                "agentPosition": "Suporte",
                "callToAction": "Fale Conosco",
                "googleAnalyticsEnabled": false,
                "websiteUrl": ""
            },
            "apps": {
                "whatsapp": {
                    "numbers": ["+5561991043595"],
                    "globalConfig": {
                        "buttonColor": "#4dc247",
                        "hoverText": "WhatsApp",
                        "buttonImage": "",
                        "formTitle": "Start a conversation",
                        "popupSubtitle": "Click one of our members below to chat"
                    },
                    "agentConfigs": [{
                        "agentName": "",
                        "agentPosition": "",
                        "preFilledMessage": "Olá, gostaria de falar com atendente.",
                        "agentAvatar": ""
                    }]
                }
            },
            "displayRules": {
                "showMode": "all",
                "include": [],
                "exclude": []
            },
            "meta": {
                "version": 1
            }
        };
        window.ButtonKitWidgetOptions = window.ButtonKitWidgetOptions || [];
        window.ButtonKitWidgetOptions.push(options);
        var script = document.createElement('script');
        script.src = "https://waplus.oss-us-west-1.aliyuncs.com/mix_deck/widget-loader.min.js";
        script.async = true;
        script.defer = true;
        script.setAttribute('data-buttonkit', 'widget-loader');
        var firstScript = document.getElementsByTagName('script')[0];
        if (firstScript && firstScript.parentNode) {
            firstScript.parentNode.insertBefore(script, firstScript);
        } else if (document.head) {
            document.head.appendChild(script);
        }
    }
    )();
