# Module 2

## Power of CSS

On the web, content is king. HTML describes the structure.

CSS describes the style of the content. How users absorb and relate to the content is important.

Example Website on how important CSS is.

[CSS Zen Garden](https://csszengarden.com)

## Anatomy of a CSS Rule

[Link to Lecture 12 code](../course_materials/fullstack-course4/examples/Lecture12/)


A CSS rule consists of a `selector` in this case `p` (paragraph tag, and this rule applies to all paragraph tags). The selector is followed by open and closed curly braces.

Inside the braces are `Declaration`'s which are pairs of a `Property` and a `Value`. A property name is predefined, and for each one there is a set of predefined values (or numerical). A semicolon is not required but is highly recommended.
```css
p {
    color: blue;
}
```

Zero or more declarations are allowed. We're setting the color, size, and width.

```css
p {
    color: blue;
    font-size: 20px;
    width: 200px;
}
```

A collection of these styles are a `Stylesheet`, but you can have none.

```css
p {
    color: blue;
    font-size: 20px;
    width: 200px;
}

h1 {
    ...
}
```

CSS can exist in a `<style></style>` tag.

Every browser comes with default styles that it applies to html elements such as the header styles. So it is up to you to explicitly declare how those styles appear.

## Element, Class and ID Selectors

[Link to Lecture 13 code](../course_materials/fullstack-course4/examples/Lecture13/)

CSS selectors are used to determine which HTML element or set of elements to apply the declarations to.

The browser browses the Document Object Model (DOM) to find which declarations apply to which elements.

A lot of Javascript libraries piggyback on the browser's selector API to attach data and changes to elements.

#### Element 

Selects only the element

```css
p {
    color: blue;
    font-size: 20px;
    width: 200px;
}
```

This selects only the paragraph element.

And all paragraph elements will be blue

```html
<p>...</p>
<p>...</p>
```

#### Class

Used by specifying a dot with the name of the class. We are creating a `blue` css class.

```css
.blue {
    color: blue;
}
```

If we want to apply it, we have to specify it as a class

```html
<p class="blue">...</p>
<p>...</p>
<div class="blue">...</div>
```

In this case, the first paragraph tag, and the div's texts are now blue. The second one is not affected.

#### ID

The way you specify this selector, by specifying the ID of the element preceded by a hash.

```css
#name {
    color: blue;
}
```

In this case, only the elements with id of `name` will be selected, and that is the div in this case.

```html
<p>...</p>
<div id="name">...</div>
```

#### Grouping Selectors

You can specify multiple selectors for one set of declarations.
```css
div, .blue {
    color: blue;
}
```

Now every div and the class `blue` set the color to blue

```html
<p class="blue">...</p>
<p>...</p>
<div>...</div>
```

## Combining Selectors

[Link to Lecture 14 code](../course_materials/fullstack-course4/examples/Lecture14/)

Combining selectors is a precise technique to help target specific kinds of elements

#### Element with Class Selector

Here we define a selector `p.big` that will select every paragraph element with a `big` class.

Note that there is no space or comma.
```css
p.big {
    font-size: 20px;
}
```

Now, this selector will only apply to the `p` class not the div. This technique is commonly used when you have a selector for many kinds of elements, but you want it to change slightly for a specific class of that type.

```html
<p class="big">...</p>
<div class="big">...</div>
```

#### Child Selector

We are trying to select any `p` element that is a direct child of an `article` element.
> Read from right to left

```css
article > p {
    color: blue;
}
```

```html
<article>
    <p>...</p> <!--Applies here-->
</article>
...
<p>...</p><!--Does not apply here-->
<article>
    <div>
        <p>...</p> <!--Does not apply here-->
    </div>
</article>
```

#### Descendant Selector

Every `p` that is inside (at any level) of `article`
> Read from right to left

```css
article p {
    color: blue;
}
```

```html
<article>
    <p>...</p> <!--Applies here-->
</article>
...
<p>...</p><!--Does not apply here-->
<article>
    <div>
        <p>...</p> <!--Applies here-->
    </div>
</article>
```

All these combinations are not limited to element selectors

Every `p` element descendant of a `colored` class is blue.

```css
.colored p {
    color: blue;
}
```

Every `colored` class that is a direct child of an `article`

```css
article > .colored {
    color: blue;
}
```

Didnt cover
- Adjacent sibling selector `selector + selector`
- General sibling selector `selector ~ selector`

## Pseudo-Class Selectors


Pseudo class selectors address structures that can be targetted by regular selectors or by user interaction of the page.

Specify your selector you know about followed by a pseudoclass name
```css
selector:pseudo-class{
    ...
}
```

We're going to cover five.
- `:link`
- `:visited`
- `:hover`
- `:active`
- `:nth-child(...)`


[Link to Lecture 15 code](../course_materials/fullstack-course4/examples/Lecture15/)
- contains context on no lsit

```css
/* any list element in the header */
header li {
    list-style: none;
}

/* Make `a` show as a link, and if it is visited */
a:link, a:visited {
    text-decoration: none;
    background-color: green;
    border: 1px solid blue;
    color: black;
    display: block; /* block elements try to fill out the line */
    width: 200px; /* constrain block to 200px */
    text-align: center;
    margin-bottom: 1px;
}

/* We want to show if the link is being clicked but not released, or if it is being hovered */
a:hover, a:active {
    background-color: red;
    color: purple;
}

/* Selecting only the third list element */
header li:nth-child(3) {
    font-size: 24px;
}

/* Want every other div in the section to be grey */
section div:nth-child(odd) {
    background-color: gray;
}

/* If I want the 4th element to have a different hover behavior */
section div:nth-child(4):hover {
    background-color: green;
    cursor: pointer;
}
```

Make sure your selector is readable, it can contribute to tech debt.

## Style Placement

Where you place your styles determine reuse and overriding

[Link to Lecture 16 code](../course_materials/fullstack-course4/examples/Lecture16/)

- inline styling `<p style=""></p>
  - Least reusable
- Local CSS `<link rel="stylesheet" href="style.css">`
  - Inside the head
  - External CSS Most Preferred

## Conflict Resolution

[Link to Lecture 17 code](../course_materials/fullstack-course4/examples/Lecture17/)

Cascading (The Cascade Algorithm) is a fundamental feature of CSS.

Some concepts on this
- Origin
  - When the same two declarations are in conflict (specified) for the same element
    - same properties are used on same target
    - Last declaration wins. HTML is processed sequentially top to bottom.
    - External CSS is declared at the spot where it is linked to
    - `color: blue;` and `color: red;`
- Merge
  - different properties are used on same target
      - Merge declarations to be both used
      - `color: blue;` and `font-size: 10px;
- Inheritence
  - DOM Tree: Body
    - Element
      - Element
        - Element
    - Element
    - Element
  - Children of element inherit a rule
- Specificity
  - Most Specific Selector Combination Wins
  - Specificity Score (Higher to Lower in weighting)
    - `< .... Style="">`
      - This is the most specific
    - ID
    - Class, pseudo-class, attribute
    - \# of elements
  - Examples
    - `<h2 style-"color: green;">`
      - score of 1 0 0 0
    - `div p {color: green;}`
      - score of 0 0 0 2
    - Which would win?
      - `div #myParag {color: blue;}`
        - 0 1 0 1
        - This would win
      - `div.big p {color: green;}`
        - 0 0 1 2
    - `p {color: green !important;}`
      - Specifying `!important` will override the specificity, but can be a maintenance nightmare

## Styling Text

[Link to Lecture 18](../course_materials/fullstack-course4/examples/Lecture18/)

[Commonly used font combinations](http://www.w3schools.com/cssref/css_websafe_fonts.asp)

You rely on the user's computer to have a font installed. You can specify multiple kinds of fonts, and usually want to have a fallback "serif"

For example
```css
p {
    font-family: "Times New Roman", Times, serif;
}
```

Pixels are considered an absolute unit. But they are relative to the device.

```css
.style {
    font-family: Arial, Helvetica, sans-serif;
    color: #0000ff; /*You want to use a hex color in production*/
    font-style: italic; /*do you want italic, bold, etc.*/
    font-weight: bold; /*Bold/weight */
    font-size: 24px; /*16px is the default often*/
    text-transform: capitalize; /*How your text looks*/
    text-align: center; /*Align text in its block level element*/
}
```

`2em` is a relative unit of measurement. Combining the 120% with 2em, will double the size of the regular text.

```html
<style>
body {
    font-size: 120%; /*You can set a percent for font size of its default 16*/
}
</style>

<!-- em is unit of measurement equivalent to the letter `m` in this particular font family we are using -->
<body>
Regular
<div style="font-size: 2em;">
    2em
    <div style="font-size: 2em;">
        4 em
        <div style="font-size: .5em;">
            2 em
        </div>
    </div>
</div>
</body>
```

Relative sizing does not have an overriding affect, it has a cumulative affect.

To increase all the font's size, you apply the percent to the most parent tag (body).

## The Box Model

[Link to Lecture 19](../course_materials/fullstack-course4/examples/Lecture19/)

In html every element is considered a box.

Each box consists of
- Padding
- Border
- Margin

These affect the actual width and height of the box.
<img src="https://miro.medium.com/v2/resize:fit:803/1*M1rrBjfUxoPNsda6s-V5MA.png">

Default browser style has a margin of 8px on the body.

`padding TOP RIGHT BOTTOM LEFT`
`padding ALL`
There are other shortcuts, and these also apply to `margin`

`border: WIDTH TYPE COLOR;`
There are other options ofcourse

Height if not specified will adjust to what it needs to fit. Same to width.

If specified, `width` will set the width of the inner content, but there will be more width/height from the padding, margin and border.

CSS3 fixes this, so by default the width is setting the content-box

`box-sizing: border-box`
- border-box
- content-box
- padding-box

With `border-box` the specified width is now guaranteed to be the width

You want to specify the border-box once, and not again. So you should put it in the body. but it is not a property that can be inherited.

There is a way to do this.
```css
* {
    box-sizing: border-box;
}
```

using the `*` selects every element and assigns the property. Which is different from inheriting

Does every browser support borderbox?

Horizontal margins are cumulative by default, and vertical margins are by greater-than. IF the margin specified is less than the other, then nothing will move (this definitely confused me in the past)

You could move the 0 margin/padding to the `*` selector to have default none margins, but its useful to know as a "css reset" on browser defaults

`overflow: hidden`
- auto (scrollbar)
- hidden
- visible
- ellipse
- scroll

Users hate having two scrollbars. One for the page, and one inside something

## The Background Property


[Link to Lecture 20](../course_materials/fullstack-course4/examples/Lecture20/)

The basic color background is
`background-color: blue;`

Or if you wanted a background image instead. The url must be relative to your css file (or technically the way your css file is served in the browser)
`background-image: url("")`

You can also set no repeating on the image, which will just set it at the top left
`background-repeat: no-repeat;`

You can set the position of the image with `background-position` with top, right, left, bottom in singles or pairs.

Or you can just list all the properties as background
`background: url('yaakov.png') no-repeat right center;`
this however will override the background color if after.

## Positioning Elements by Floating

[Link to Lecture 21](../course_materials/fullstack-course4/examples/Lecture21/)

This is an essential skill. Most modern UI frameworks float elements.

This will make the element
- move to the right
- Other elements below will move up
- This element was moved out of the document flow
`float: right;`

The margins never collapse for floating elements.

Floating causes the parent div to appear to collapse...so the parent collapses in height. So we need to tell the browser that it should resume document flow

```css
section {
    /* Nothing should be allowed to floating to the left of this */
    clear: left;
}
```

This can also apply to floating elements to interupt the flow.

We can also set `clear: both;` to clear both sides

You can use floating to make columns (ref the code file for this).

Set 
```css
* {
    box-sizing: border-box;
}

p {
    width: 50%;
    float: left;
    padding: 10px
}
```

## Relative and Absolute Element Positioning


[Link to Lecture 22](../course_materials/fullstack-course4/examples/Lecture22/)


Static positioning
- is normal document flow, default
- position offsets are ignored

Relative Positioning
- Element is positioned relative to its position in normal doc flow
- positioning css props are top, bottom, left right
- They become the boundaries that you offset the element
- **not** taken out of document flow
  - Its spot is reserved


```css
p {
    position: relative;
    /* from top 50px */
    top: 50px;
    /* from left 50px */
    left: 50px;
}
```

You can also use negative relative values


Absolute positioning
- all offsets are relative to the position of the nearest ancestor which has its positioning set on it, other than static
- by default, html is the only element that has non-static positioning
- taken out of doc flow

if the container is offset, then everything is offset in it. So you make a highly specific layout in a container and reuse it. However it **needs** and absolute or relative parent to do this. You can just set the parent to be relative if you want normal behavior
```css
/* #1 */
p {
    /* taken out of flow, element #2 is under #1 */
    position: absolute;
    bottom: 10px;
    right: 10px;
}
```

## Media Queries

[Link to Lecture 23](../course_materials/fullstack-course4/examples/Lecture23/)

Media Queries allow you to group styles together and target devices based on specific criteria.

Media Query Syntax

Starts with `@media` and then is followed by a media feature which resolves to true or false `(max-width: 767px)`. If it resolves to true, then the style inside applies
```css
@media (max-width: 767px) {
    p {
        color: blue;
    }
}
```

There are a lot of media queries

`@media (max-width: 767px) {...}`
`@media (min-width: 767px) {...}`
`@media (orientation: portrait) {...}`
`@media screen {...}`
`@media print {...}`

They can also be combined

`@media (max-width: 991px) and (min-width: 768px) {...}`

A comma can be used as an OR

`@media (max-width: 767px) , (min-width: 992px) {...}`

You should start with your baseline styles, and then work down from simple queries to more specific ones. Be careful not to overlap ranges.

In the example, large devices are 1200px.

`CMD+I` on chrome to show pixel count

## Responsive Design

[Link to Lecture 24](../course_materials/fullstack-course4/examples/Lecture24/)

Responsive design is a response to the number of mobile devices. You need to support all devices.

What is a responsive website
- Site designed to adapt its layout to the viewing environment by using fluid proportion-based grids, flexible images, and CSS3 media queries
- Water becomes the container it is put into, the content should be like water.
- Site's layout adapts to the size of the device
- Content verbosity or its visual delivery may change

You could have a server side technology determine a mobile version of the site or the desktop version. There is a high risk of feature diversion between apps.


12 column grid responsive layout because of the factors of 12

Use large to describe the behavior for large devices, medium for medium devices. At different sizes those styles may or not exist.