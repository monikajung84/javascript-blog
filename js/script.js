"use strict";
//const
const linksActive = '.titles a.active';
const articlesActive = '.posts article.active';
const atributeArticle = 'href';
const active = 'active';
const idArticles = 'id';
const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optLinks = '.titles a';
const optArticleTagsSelector = '.post-tags .list';
const tagsArticle = 'data-tags';
const optAtributeTags = '.tags a';
const optAtributePostTags = '.post-tags .list a';
const optArticleAuthorSelector = 'p.post-author';
const optTagsListSelector = '.tags.list';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const activeLinks = document.querySelectorAll(linksActive);
  for (let activeLink of activeLinks) {
    activeLink.classList.remove(active);
  }
  clickedElement.classList.add(active);
  console.log("clickedElement (with plus): " + clickedElement);
  removeActiveArticle();
  const articleAtribute = clickedElement.getAttribute(atributeArticle);
  const idArticle = document.querySelector(articleAtribute);
  idArticle.classList.add(active);
}

function removeActiveArticle(){
  const activeArticles = document.querySelectorAll(articlesActive);
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove(active);
  }
}
function generateTitleLinks(customSelector = "") {
  console.log("customerSelector" + customSelector);
  const titleList = document.querySelector(optTitleListSelector);
  console.log(titleList);
  titleList.innerHTML = "";
  let html = "";
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for (let article of articles) {
    article.classList.remove(active);
    const articleId = article.getAttribute(idArticles);
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + "</span></a></li>";
    /*create HTML of the link */
    /*titleList.insertAdjacentHTML("beforebegin", linkHTML);*/
    /*insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  listenToArticleLinks();
}
function listenToArticleLinks() {
  const links = document.querySelectorAll(optLinks);
  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}
function generateTags() {
  /*[NEW] create a new variable allTags with an empty array*/
  let allTags={};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const titleList = article.querySelector(optArticleTagsSelector);
    let html = "";
    const articleTags = article.getAttribute(tagsArticle);

    const articleTagsArray = articleTags.split(" ");
    for (let articleTags of articleTagsArray) {
      const linkHTML = '<li><a href="#tag-' + articleTags + '"> <span>' + articleTags + " </span></a></li>";
      html = html + linkHTML;
      /*[NEW] check if this link is not already in allTags*/
      if(!allTags.hasOwnProperty(articleTags)){
        /*[NEW] add generated code to allTags array*/
        allTags[articleTags] = 1;
      }else{
        allTags[articleTags]++;
      }
    }
    titleList.innerHTML = html;
  }
  /* END LOOP: for every article: */
  /*[NEW] find list of tags in right column*/
  const tagList = document.querySelector('.tags');
  /*[NEW] add html from allTags to tagList*/
  //tagList.innerHTML = allTags.join('');
  console.log('allTags: ', allTags);
  /* [NEW] create variable for all links HTML code*/
  let allTagsHTML = '';
  /*[NEW] START LOOP: for each tag in allTags: */
  for (let articleTags in allTags){
    /*[NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += articleTags + '(' + allTags[articleTags] + ')';
  }
  tagList.innerHTML = allTagsHTML;
  addClickListenersToTags();
}
function tagClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute(atributeArticle);
  const tag = href.replace("#tag-", "");
  const tagLinkActives = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(tagLinkActives);
  for (let tagLinkActive of tagLinkActives) {
    tagLinkActive.classList.remove(active);
  }
  const allTagsWithHrefs = document.querySelectorAll('a[href="' + href + '"]');
  for (let allTagsWithHref of allTagsWithHrefs) {
    allTagsWithHref.classList.add(active);
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags() {
  const linkToTags = document.querySelectorAll(optAtributeTags);
  const linkToPostTags = document.querySelectorAll(optAtributePostTags);
  console.log(linkToTags);
  for (let linkToTag of linkToTags) {
    linkToTag.addEventListener("click", tagClickHandler);
    for (let linkToPostTag of linkToPostTags) {
      linkToPostTag.addEventListener("click", tagClickHandler);
    }
  }
}

function generateAuthor() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /*find tags wrapper*/
    const authorInArticle = article.querySelector(optArticleAuthorSelector);
    let html = "";
    const articleAuthors = article.getAttribute("data-author", authorInArticle);
    const linkHTML = '<a  href="#author-' + articleAuthors + '">' + articleAuthors + "</a>";
    html = html + linkHTML;
    authorInArticle.innerHTML = html;
  }
  addClickListenerToAuthor();
}

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const author = clickedElement.querySelector("a").getAttribute("href");
  const authorSelector = author.replace("#author-", "");
  console.log(authorSelector);
  removeActiveArticle();
  const allTagsWithHrefs = document.querySelectorAll('article[data-author="' + authorSelector + '"]');
 
  for (let allTagsWithHref of allTagsWithHrefs) {
    /* add class active */
    allTagsWithHref.classList.add(active);
  }
  generateTitleLinks('[data-author="' + authorSelector + '"');
}

function addClickListenerToAuthor() {
  const linkToAuthors = document.querySelectorAll(optArticleAuthorSelector);
  for (let linkToAuthor of linkToAuthors) {
    linkToAuthor.addEventListener("click", authorClickHandler);
  }
}

function init() {
  generateTitleLinks();

  generateTags();

  generateAuthor();
}
init();
