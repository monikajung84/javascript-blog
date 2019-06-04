'use strict';
function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);
    /*remove class 'active' from all article links */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }
    /*add class 'active' to the clicked link*/
    clickedElement.classList.add('active');
    console.log('clickedElement (with plus): ' + clickedElement);

    /*remove class 'active from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');
    for (let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

    /*get 'href' attribute from the clicked link */
    const articleAtribute = clickedElement.getAttribute("href"); //odczytywanie atrybutu elementu//
    console.log(articleAtribute);

    /*find the correct article using the selector (value of 'href' attribute)*/
    const idArticle = document.querySelector(articleAtribute); //znajdowanie elementu za pomocą selektora css//
    console.log(idArticle);
    

    /*add class 'active' to the correct article*/
    idArticle.classList.add('active');
}


const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
function generateTitleLinks (){
    /*remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    console.log(titleList);
        titleList.innerHTML = ''; //usuwanie zawartośći  listy linków //
    let html = '';
    /*for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles){
        console.log(articles);
    
        /*get the article id */
        const articleId = article.getAttribute("id");
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
        console.log(html);
    }
    titleList.innerHTML = html;

}
generateTitleLinks();
const links = document.querySelectorAll('.titles a');
for (let link of links){
    link.addEventListener('click', titleClickHandler);
    console.log(links);
}