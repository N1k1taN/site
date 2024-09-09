let back=document.querySelector(".backgroundpage")
let callpage= document.querySelector(".callpage")
let call=document.querySelectorAll('.butcall')
let dropdown=document.querySelector('ul')
let dad=document.querySelectorAll('.dad')

let swiper = new Swiper("#Swipe", {
  slidesPerView:1,
    zoom: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    spaceBetween: 10, // Расстояние между слайдами
    breakpoints: {
      // Когда ширина экрана меньше или равна 768px
      1100: {
        slidesPerView: 3, // Показывать 1 слайд
      }
    }  
  });
console.log(call);


function openMenu() {
      back.style.display='flex'
        callpage.style.display='flex'
}


  back.addEventListener('click', (event) => {
    if (!callpage.contains(event.target)) {
      back.style.display = 'none';
      callpage.style.display = 'none';
    }
  })

for(const button of call){
    button.addEventListener('click',function () {
            back.style.display='flex'
        callpage.style.display='flex'
    })
    
}

console.log(dropdown);


for(const child of dropdown.children){
    dropdown.addEventListener('click',function () {
        
       child.classList.toggle('toggleli')
    })
    document.addEventListener('touchstart',function (event){
        const targetElement = event.target;

        if (targetElement.classList.contains('dad')){;
         event.stopPropagation()
        return}
        if (targetElement.classList.contains('dropdown')){;
            event.stopPropagation()
           return}
        child.classList.remove('toggleli')
    })
}

let acc = document.getElementsByClassName("helpinfo");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
      panel.style.borderBottom  ="none"
      
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
          panel.style.borderBottom  ="3px solid #4b5320"
    } 
  });
}

