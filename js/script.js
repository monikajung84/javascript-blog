"use strict";
//const
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML)
}
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
const optCloudClassCount = 5;
const optCloudClassPrefix = 'tag-size-';
const optAuthorsListSelector = '.authors.list a';
const optCloudAuthorCount = 5;
const optCloudAuthorPrefix = 'author-size-';

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
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
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
function calculateTagsParams(tags){
  const params = {
    max: 0,
    min: 999999
  };

  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
     if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
}
function calculateTagClass (count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1);
  return  optCloudClassPrefix + classNumber;
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
    for (let tag of articleTagsArray) {
      const linkHTMLData = {tag: tag, title: tag};
      const linkHTML = templates.tagLink(linkHTMLData);
      html = html + linkHTML;
      /*[NEW] check if this link is not already in allTags*/
      if(!allTags.hasOwnProperty(tag)){
        /*[NEW] add generated code to allTags array*/
        allTags[tag] = 1;
      }else{
        allTags[tag]++;
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
  const allTagsData = {tags:[]};
  /*[NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags){
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams: ', tagsParams);
    const className = calculateTagClass(allTags[tag], tagsParams);
    console.log("class",className);
    const tagLinkHTML = '<li class="' + className +  '"><a href="'+tag+'">'+tag+'</a></li>';
    console.log('tagLinkHTML: ', tagLinkHTML);
    /*[NEW] generate code of a link and add it to allTagsHTML */
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log('allTagsData : ', allTagsData);
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

function calculateAuthorParams(artilceAuthors){
  const params = {
    max: 0,
    min: 999999
  };
  for (let artilceAuthor in artilceAuthors){
    console.log(artilceAuthor + ' is used ' + artilceAuthors[artilceAuthor] + ' times');
    if(artilceAuthors[artilceAuthor] > params.max){
      params.max = artilceAuthors[artilceAuthor];
    }
    if(artilceAuthors[artilceAuthor] < params.min){
      params.min = artilceAuthors[artilceAuthor];
    }
  }
  return params;
}
function calculateAuthorClass (count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const authorNumber = Math.floor( percentage * (optCloudAuthorCount - 1) + 1);
  return  optCloudAuthorPrefix + authorNumber;
}

function generateAuthor() {
  let allAuthors = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /*find tags wrapper*/
    const authorInArticle = article.querySelector(optArticleAuthorSelector);
    let html = "";
    const artilceAuthor = article.getAttribute("data-author", authorInArticle);
    //for (let articleAuthors of articles){
      const linkHTMLData = {tag: artilceAuthor, title: artilceAuthor};
      const linkHTML = templates.authorLink(linkHTMLData);
      html = html + linkHTML;
      if(!allAuthors.hasOwnProperty(artilceAuthor)){
        allAuthors[artilceAuthor] = 1;
      }else{
        allAuthors[artilceAuthor] ++;
      }
    //}
 
    authorInArticle.innerHTML = html;
  }
  const authorList = document.querySelector('.authors');
  let allAuthorsHTML = '';
  for (let artilceAuthor in allAuthors){
    const authorParams = calculateAuthorParams(allAuthors);
    console.log('authorParams: ', allAuthors);
    const className = calculateAuthorClass(allAuthors[artilceAuthor], authorParams);
    console.log("class",className);
    const authorLinkHTML ='<li class="' + className +  '"><a href="'+ artilceAuthor+ '">'+ artilceAuthor +'</a></li>';
    console.log('tagLinkHTML: ', authorLinkHTML);
    allAuthorsHTML += authorLinkHTML;
  }
  authorList.innerHTML = allAuthorsHTML;
  addClickListenerToAuthor();
}

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const author = clickedElement.getAttribute("href");
  const authorSelector = author.replace("#tag-", "");
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
  const postToAuthors = document.querySelectorAll('p.post-author a');
  const linkToAuthors = document.querySelectorAll(optAuthorsListSelector);
  for (let postToAuthor of postToAuthors){
    postToAuthor.addEventListener("click", authorClickHandler);
    for (let linkToAuthor of linkToAuthors) {
      linkToAuthor.addEventListener("click", authorClickHandler);
    }
  }
}

function init() {
  generateTitleLinks();

  generateTags();

  generateAuthor();
}
init();