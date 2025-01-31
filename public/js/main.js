import { testUrl, postNovelUrl } from './modules/url.js';

const urlSubmitButton = document.querySelector('.submit');
const url = document.getElementById('url');
const ficInformations = document.getElementById('fic-informations');
const urlError = document.getElementById('error-url');

urlSubmitButton.addEventListener('click', async (e) => {
  e.preventDefault();
  let current = 0;
  if (url.value == '') return;
  if (!testUrl(url.value)) {
    urlError.textContent = 'please enter a valid ScribbleHub link!';
  } else {
    if (urlError.textContent != '') urlError.textContent = '';
    if (ficInformations.childNodes.length != 0) {
      ficInformations.innerHTML = '';
    }
    buildFicInformationLayout();
    const response = await postNovelUrl(url, current);
    if (response.status == 'Error') {
      console.log('Error : ', response.Error);
      location.replace('/error');
      return;
    }
    const progressBar = document.getElementById('progress-bar');
    const small = document.getElementById('small');
    progressBar.setAttribute('aria-valuenow', '100');
    progressBar.style.width = `100%`;
    if (small.style.color == 'black') {
      small.style.color = '#fff';
    }
    small.textContent = '100% - Finished';

    const pdfLink = document.createElement('div');
    pdfLink.id = 'pdf-link';
    ficInformations.appendChild(pdfLink);
    const pdftitle = document.createElement('p');
    pdftitle.className = 'fic-informations-head';
    pdftitle.textContent = 'pdf Link : ';
    const pdfImage = document.createElement('img');
    pdfImage.id = 'pdf-image';
    pdfImage.src = '../images/15399621-pdf-file-download-icon-vector-illustration.webp';
    const link = document.createElement('a');
    link.href = response.link;
    link.setAttribute('download', '');
    link.appendChild(pdfImage);
    pdfLink.appendChild(pdftitle);
    pdftitle.appendChild(link);
    const pdfLinkReminder = document.createElement('span');
    pdfLinkReminder.textContent = ' This link will be available only for the next hour';
    pdftitle.appendChild(pdfLinkReminder);

    console.log(response);
  }
});

const buildFicInformationLayout = () => {
  const ficName = document.createElement('div');
  ficName.className = 'fic-informations-head';
  ficName.textContent = 'Fiction Name : ';
  ficInformations.appendChild(ficName);
  const name = document.createElement('span');
  name.id = 'name';
  name.textContent = '';
  ficName.appendChild(name);

  const ficAuthor = document.createElement('div');
  ficAuthor.className = 'fic-informations-head';
  ficAuthor.textContent = 'Fiction Author : ';
  ficInformations.appendChild(ficAuthor);
  const author = document.createElement('span');
  author.id = 'author';
  author.textContent = '';
  ficAuthor.appendChild(author);

  const ficUpdate = document.createElement('div');
  ficUpdate.className = 'fic-informations-head';
  ficUpdate.textContent = 'Last Updated : ';
  ficInformations.appendChild(ficUpdate);
  const update = document.createElement('span');
  update.id = 'update';
  update.textContent = '';
  ficUpdate.appendChild(update);

  const ficNumberOfChapter = document.createElement('div');
  ficNumberOfChapter.className = 'fic-informations-head';
  ficNumberOfChapter.textContent = 'Number of Chapter : ';
  ficInformations.appendChild(ficNumberOfChapter);
  const numberOfChapter = document.createElement('span');
  numberOfChapter.id = 'number-of-chapter';
  numberOfChapter.textContent = 0;
  ficNumberOfChapter.appendChild(numberOfChapter);

  const progress = document.createElement('div');
  progress.className = 'progress';
  ficInformations.appendChild(progress);
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  progressBar.id = 'progress-bar';
  progressBar.setAttribute('role', 'progressbar');
  progressBar.setAttribute('aria-valuemin', '0');
  progressBar.setAttribute('aria-valuemax', '100');
  progressBar.setAttribute('aria-valuenow', '0');
  progressBar.style.width = '0%';
  progress.appendChild(progressBar);

  const small = document.createElement('small');
  small.className = 'justify-content-center d-flex position-absolute w-100';
  small.id = 'small';
  small.style.color = 'black';
  small.textContent = '0%';
  progressBar.appendChild(small);
};
