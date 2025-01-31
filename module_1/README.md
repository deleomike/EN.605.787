# Module 1 - Dev Env Setup and Introduction to HTML5

## Setup

#### Part 1

Install git, npm, chrome, etc

#### Part 2

Install Browser Sync

```
npm install -g browser-sync
```

Then run browser sync with any type of fie

```
cd test_site
```


```
browser-sync start --server --directory --files "*"
```

This will serve the files in the directory.

## Lecture 4

[Link to files](../course_materials/fullstack-course4/examples/Lecture04/)

```
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Coursera is Cool!</title>
</head>
<body>
Coursera is SO cool! I am learning so much!
</body>
</html>
```

Each HTML starts with the `<!doctype html>` notation. This is an older declaration to distinguish the type.

The `<html>` tag follows to indicate HTML content

The `<head>` tag contains items that describes the main content of the page
- Character Encodings
- Language
- Author's description of page
- Page title
- External resources for rendering

Contains metadata.

```
<meta charset="utf-8">
```

This is not explicitly needed.

`<title>` is in fact **needed**.

Following the head, is the `<body>` for the main html content of the page.

We're nesting one html inside another. You **have** to close the current tag before closing the parent tag

## Lecture 5 - Content Model

[Link to files](../course_materials/fullstack-course4/examples/Lecture05/)

- Block Level
  - Render to begin on a new line by default
  - May contain inline or other block level elements
  - **Roughly Flow Content**
- Inline
  - Render on the same level by default
  - May only contain other inline elements
  - **Roughly Phrasing Content**

Div stands for division
- Most basic block level
- Newlines after div tags make no difference
- Cannot have a div inside span `<span><div></div></span>`

Span stands for span
- Most generic inline

There are many kinds of content for html. In fact there is a [site](https://w3.org/TR/html5/dom.html#kinds-of-content) for it.

## Lecture 6

[Link to files](../course_materials/fullstack-course4/examples/Lecture06/)

Semantic Element: Tells you something/implies some meaning to the content

h1->h6 indicates the weight/importance

Only meant to convey structure of the page, nothing more. CSS will do the styling

`<header>` conveys some header information about the page like a nav or logo

A `<section` tag makes sense with an `<article>` tag inside of it. But that is not always the case.


`<footer>` includes the footer information.

They're all block level elements. You could just use `<div>` but its much more organized

## Lecture 7 - Lists

[Link to files](../course_materials/fullstack-course4/examples/Lecture07/)

Tabs and spaces are really just ignored by the browser.

To create an unordered list use the `<ul>` tag and put list items in '<li></li>'

To create an ordered list use the `<ol>` tag and put list items in '<li></li>'

To create a sublist, you can nest the `<ul>` inside


## Lecture 8 - Character Entity

[Link to files](../course_materials/fullstack-course4/examples/Lecture08/)

There are certain chars to escape

- <
  - Use &lt; instead
- >
  - Use &gt;
- &
  - &amp;

There are many more special characters.

For example, copyright

&copy;

You can do a non-breaking space to&nbsp;make sure text is not "new-lined"
- don't misuse this to make extra spaces
  - rather do a span with margin

You can use &quot; if quotes are not in an encoding

## Lecture 9 - Creating Links

[Link to files](../course_materials/fullstack-course4/examples/Lecture09/)

Internal Links `<a>`
- href: hypertext reference
  - Can be relative or an absolute url
- targt
  - `target="_blank"` you don't want this, it sends to a new window/tab. they won't come back

The a tag is both a flow content and phrasing content.
It can surround both divs and span content. That's because there are many times you'd want to click on many things.

## Lecture 10 - Displaying Images

[Link to files](../course_materials/fullstack-course4/examples/Lecture10/)

`<img src="" width="" height="">`