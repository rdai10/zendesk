# Category Pages

Liferay Help Center is using the [multiple templates](https://support.zendesk.com/hc/en-us/articles/360001948367) feature for articles.

## How this is being used
Each **Category Page** is a landing page to highlight a product. Plus the addition of a **Documentation** product page to feature specific documentations.

Content creators can go to a category page and select *edit category* > *template* to choose the corresponding template. 

** Note a category with no section created will not display for the end user.

## Types of Category Pages
There are three types of category pagse. Category page without tabs, category page with tabs, and default category.

### Category Page Without Tabs
This is a simple landing page template that lists all the notable information relating to the product as cards (e.g. Documentation, Compatibility Matrix). The user can click on the card that interest them and be taken to an article with more information. 

### Category Page With tabs
This type of landing page is similiar to **Cateogry Page Without Tabs** however there is more content to be displayed. The additional content is grouped into tabs. When the user clicks on a tab, more information will display on the right side as cards.

### Default Category Page
The default Category Page template is a simple two column page that lists all the sections under the cateogry as well as all the articles for each section. 

## Access
User access is determined by the user tags ([read more](./permissions.md)). On any **Category Page** using cards to display information, a content creater can determine the visibility of each tab by setting the `tabAccess` property for the tab to "all", "kb", or "nonkb".

### All
This setting will allow tab to be viewed by all users, regardless of their role.

### KB
This setting will allow a tab to be viewed by only users with the **kb user tag**.

### NonKB
This setting will allow a tab to be viewed by any user without the **kb user tag**.