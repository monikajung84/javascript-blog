'use strict';
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

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  //console.log('Link was clicked!');
  //console.log(event);
  /*remove class 'active' from all article links */
  const activeLinks = document.querySelectorAll(linksActive);
  for(let activeLink of activeLinks){
    activeLink.classList.remove(active);
  }
  /*add class 'active' to the clicked link*/
  clickedElement.classList.add(active);
  console.log('clickedElement (with plus): ' + clickedElement);

  /*remove class 'active from all articles */
  const activeArticles = document.querySelectorAll(articlesActive);
  for (let activeArticle of activeArticles){
    activeArticle.classList.remove(active);
  }

  /*get 'href' attribute from the clicked link */
  const articleAtribute = clickedElement.getAttribute(atributeArticle); //reading the element's attribute
  console.log(articleAtribute);

  /*find the correct article using the selector (value of 'href' attribute)*/
  const idArticle = document.querySelector(articleAtribute); //find an element using the css selector
  console.log(idArticle);

  /*add class 'active' to the correct article*/
  idArticle.classList.add(active);
}

function generateTitleLinks (customSelector = ''){
  /*remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  console.log(titleList);
  titleList.innerHTML = ''; //delete content the links list
  let html = '';
  /*for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for (let article of articles){
    article.classList.remove(active);
    console.log(articles);
    /*get the article id */
    const articleId = article.getAttribute(idArticles);
    console.log(articleId);

    /*find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);

    /*get the title from the title element */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /*create HTML of the link */
    /*titleList.insertAdjacentHTML("beforebegin", linkHTML);*/
    /*insert link into titleList */
    html = html + linkHTML;
    //console.log(html);
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
function generatTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles){
    console.log(articles);
    /* find tags wrapper */
    const titleList = article.querySelector(optArticleTagsSelector);
    console.log(titleList);
    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute(tagsArticle);
    console.log(articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray){
      console.log(tag);
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"> <span>' + tag + ' </span></a></li>';
      console.log(linkHTML);
      /* add generated code to html variable */
      html = html + linkHTML;
      console.log(html);
    }
    /* END LOOP: for each tag */
    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;
  }
  /* END LOOP: for every article: */
}
function tagClickHandler (event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute(atributeArticle);
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);
  /* find all tag links with class active */
  const tagLinkActives = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(tagLinkActives);
  /* START LOOP: for each active tag link */
  for (let tagLinkActive of tagLinkActives){
  /* remove class active */
    tagLinkActive.classList.remove(active);
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const allTagsWithHrefs = document.querySelectorAll('a[href="' + href + '"]');
 
  /* START LOOP: for each found tag link */
  for (let allTagsWithHref of allTagsWithHrefs){
    /* add class active */
    allTagsWithHref.classList.add(active);
  }
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
  console.log(generateTitleLinks);
}

function addClickListenersToTags(){
  /* find all links to tags */
  const linkToTags = document.querySelectorAll(optAtributeTags);
  const linkToPostTags = document.querySelectorAll('.post-tags .list a');
  console.log(linkToTags);
   /* START LOOP: for each link */
  for (let linkToTag of linkToTags){
    /* add tagClickHandler as event listener for that link */
    linkToTag.addEventListener('click', tagClickHandler);
    for (let linkToPostTag of linkToPostTags){
      linkToPostTag.addEventListener('click', tagClickHandler);
    }
    console.log(linkToTag);
  }
  /* END LOOP: for each link */
  
}


function init (){
  generateTitleLinks();
  listenToArticleLinks();
  generatTags();
  addClickListenersToTags();
}
init();

