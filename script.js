const lnb = document.querySelector('.lnb');
const toggleLNB = document.getElementById('toggleLNB');
const lnbMenuList = document.getElementById('lnbMenuList')
const gnbLinks = document.querySelectorAll('.gnb a');
const contents = document.querySelector('.content');

const lnbMenu = {
  'AMENU' : ['AMENU_1', 'AMENU_2', 'AMENU_3', 'AMENU_4', 'AMENU_5'],
  'BMENU' : ['BMENU_1', 'BMENU_2', 'BMENU_3'],
  'CMENU' : ['CMENU_1', 'CMENU_2'],
  'DMENU' : ['DMENU_1', 'DMENU_2', 'DMENU_3', 'DMENU_4'],
  'EMENU' : ['EMENU_1']
}

function createLnb(gnbKey) {
  lnbMenuList.innerHTML = "";
  lnbMenu[gnbKey].forEach(menu => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = '#';
    a.innerHTML = `<span>${menu}</span>`;
    a.dataset.gnb = gnbKey;
    li.appendChild(a);
    lnbMenuList.appendChild(li);
  })

  const lnbLinks = document.querySelectorAll('.lnb a');

  lnbLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        lnbLinks.forEach(a => a.classList.remove('active'));
        link.classList.add('active');
        updateContent(link.dataset.gnb + " - " + link.textContent);
      });
  });
}

createLnb("AMENU"); //초기 LNB 내용

toggleLNB.addEventListener('click', () => {
    lnb.classList.toggle('collapsed');
    if(lnb.classList.contains('collapsed')) {
      toggleLNB.innerHTML = '>>'
    } else {
      toggleLNB.innerHTML = '<<'
    }
});

gnbLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      gnbLinks.forEach(a => a.classList.remove('active'));
      link.classList.add('active');
       updateContent(link.dataset.lnb)
      createLnb(link.dataset.lnb);
    });
});

function updateContent(gnbText) {
    gnbLinks.forEach(link => {
        if (link.dataset.lnb === gnbText.split(' - ')[0]) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    contents.innerHTML = `<h1>${gnbText} 콘텐츠 영역</h1><p>${gnbText} 관련 콘텐츠가 표시됩니다.</p>`
}