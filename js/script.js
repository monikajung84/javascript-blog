'use strict';
//const
const linksActive = '.titles a.active';
const articlesActive = '.posts article.active';
const atributeArticle = 'href';
const idArticles = 'id';
const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optLinks = '.titles a';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);
  /*remove class 'active' from all article links */
  const activeLinks = document.querySelectorAll(linksActive);
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /*add class 'active' to the clicked link*/
  clickedElement.classList.add('active');
  console.log('clickedElement (with plus): ' + clickedElement);

  /*remove class 'active from all articles */
  const activeArticles = document.querySelectorAll(articlesActive);
  for (let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /*get 'href' attribute from the clicked link */
  const articleAtribute = clickedElement.getAttribute(atributeArticle); //reading the element's attribute
  console.log(articleAtribute);

  /*find the correct article using the selector (value of 'href' attribute)*/
  const idArticle = document.querySelector(articleAtribute); //find an element using the css selector
  console.log(idArticle);

  /*add class 'active' to the correct article*/
  idArticle.classList.add('active');
}

function generateTitleLinks (){
  /*remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  console.log(titleList);
  titleList.innerHTML = ''; //delete content the links list
  let html = '';
  /*for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles){
    console.log(articles);

    /*get the article id */
    const articleId = article.getAttribute(idArticles);
    console.log(articleId);

    /*find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerText;
    console.log(articleTitle);

    /*get the title from the title element */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /*create HTML of the link */
    /*titleList.insertAdjacentHTML("beforebegin", linkHTML);*/
    /*insert link into titleList */
    html = html + linkHTML;
    console.log(html);
  }
  titleList.innerHTML = html;

}
function listenToArticleLinks (){
  const links = document.querySelectorAll(optLinks);
  for (let link of links){
    link.addEventListener('click', titleClickHandler);
    console.log(links);
  }
}
function init (){
  generateTitleLinks();
  listenToArticleLinks();

}
init();
