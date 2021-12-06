# gatsby-theme-landing-page

A Contentful-backed dynamic landing page theme for Gatsby

## Usage

Install the theme in your Gatsby site.

```sh
npm install gatsby-theme-landing-page
```

Add the theme to your `gatsby-config.js`.

```js
// gatsby-config.js
require("dotenv").config();

module.exports = {
  plugins: [
    {
      resolve: "gatsby-theme-landing-page",
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN,
        environment: process.env.CONTENTFUL_ENVIRONMENT_ID || "master",
      },
    },
  ],
};
```

Create a `.env` file with your Contentful space ID and API keys.

```sh
# .env
CONTENTFUL_SPACE_ID="<SPACE_ID>"
CONTENTFUL_DELIVERY_ACCESS_TOKEN="<ACCESS_TOKEN>"
```

<!-- TODO: update these instructions once the JSON file is created -->

Upload the `data/sample-data.json` to your Contentful space to set up the content model. Then, create your first landing page in Contentful.

## Customizing typography, colors, and layout

To customize the built-in components' typography, colors, and layout, shadow the `variables.module.css` file by creating a file in your site with this path:

```sh
src/gatsby-theme-landing-page/styles/variables.module.css
```

The components use CSS Modules with CSS custom properties that can be customized.

```css
/* example src/gatsby-theme-landing-page/styles/variables.module.css */
.root {
  /* typography */
  --font: "Inter", sans-serif;
  --font-heading: "Poppins", sans-serif;
  --line-height: 1.5;
  --font-size-1: 12px;
  --font-size-2: 14px;
  --font-size-3: 16px;
  --font-size-4: 24px;
  --font-size-5: 32px;
  --font-size-6: 48px;
  --letter-spacing-caps: 0.03em;
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-bold: 700;
  /* colors */
  --text-color: black;
  --text-color-secondary: #555;
  --background-color: white;
  --link-color: #07c;
  --link-hover-color: #05a;
  --primary-color: #08d;
  --secondary-color: #70c;
  --button-color: white;
  --button-background-color: #07c;
  --button-hover-color: #05a;
  --button-secondary-color: #07c;
  --button-secondary-background-color: white;
  --button-secondary-hover-color: rgb(215, 232, 250);
  /* layout */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 32px;
  --space-5: 64px;
  --space-6: 128px;
  --max-width: 1024px;
  --max-width-narrow: 768px;
  --border-radius: 4px;
  /* shadows */
  --box-shadow-raised: 0px 1px 2px rgba(46, 41, 51, 0.08), 0px 2px 4px rgba(71, 63, 79, 0.08);
  --box-shadow-floating: 0px 2px 4px rgba(46, 41, 51, 0.08), 0px 4px 8px rgba(71, 63, 79, 0.16);
}
```

**Note:** when shadowing files, you may need to clear cache by running `gatsby clean` and restart your Gatsby development server to see new shadow files.

These custom properties are scoped to the pages created by the theme and should not leak out to existing pages on your site.
To reuse the same CSS custom properties across your site, add a file similar to the one above to your site with a selector on an HTML element that will wrap the theme, such as your site's layout component.

To completely ignore the default CSS custom properties defined in the theme, add a blank CSS rule with the `.root` selector to your shadowed file.

```css
/* example src/gatsby-theme-landing-page/styles/variables.module.css */
/* this will disable all built-in custom properties */
.root {
}
```

## Customizing section components

To customize any of the built-in section components, add components to your site's `src/gatsby-theme-landing-page/sections` directory. For example, to create a custom Hero section component, create a file at the following path:

```sh
src/gatsby-theme-landing-page/sections/hero.js
```

```js
// example src/gatsby-theme-landing-page/sections/hero.js
import * as React from "react";
import { Link } from "gatsby";
import { MarkdownText } from "gatsby-theme-landing-page";

export default function MyHero(props) {
  return (
    <section>
      <h1>{props.heading}</h1>
      <h2>{props.secondaryHeading}</h2>
      {props.content.map((item) => (
        <div key={item.id}>
          <MarkdownText {...item.primaryText} />
          <MarkdownText {...item.secondaryText} />
          <div>
            {item.links.map((link) => (
              <Link key={link.id} to={link.href}>
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
```

### GraphQL page query

Each page in the theme uses the following query for data. Use this as a reference for the props passed into each section component.

```graphql
query ($id: String!) {
  page: contentfulLandingPage(id: { eq: $id }) {
    title
    description
    image {
      gatsbyImageData(layout: CONSTRAINED)
    }
    sections {
      id
      component
      heading
      secondaryHeading
      content {
        id
        primaryText {
          childMarkdownRemark {
            html
          }
        }
        secondaryText {
          childMarkdownRemark {
            html
          }
        }
        image {
          gatsbyImageData(layout: CONSTRAINED)
        }
        links {
          id
          href
          text
        }
      }
    }
  }
}
```

## Customizing buttons, links, and other components

To custom any of the built-in components used within sections, including headings, links, and buttons, add components to your site's `src/gatsby-theme-landing-page/components` directory.
For example, to create a custom Button component, create a file at the following path:

```sh
src/gatsby-theme-landing-page/components/button.js
```

```js
// example src/gatsby-theme-landing-page/components/button.js
import * as React from "react";
import { Link } from "gatsby";

export default function Button(props) {
  return <Link to={props.href}>{props.text}</Link>;
}
```

## Adding custom section components

To add custom section components or to override the built-in sections, you can shadow the main section component `index.js` file by creating a file at the following path:

```sh
src/gatsby-theme-landing/page/components/index.js
```

```js
// example src/gatsby-theme-landing/page/components/index.js
export {
  Hero,
  Features,
  Copy,
  CallToAction,
  Benefits,
  Testimonials,
  NewsletterForm, // example custom section component
} from "../../components/custom-landing-page-components";
```

When adding new custom components, be sure to update your Contentful space's content model to reflect these changes by ensuring the LandingPageSection's _Component_ filed validation includes all possible options.

<!-- TODO add screenshot -->

## Using other styling libraries

If you'd like to use another styling library instead of CSS Modules, shadow the components as shown above and ensure your site is configured to use whatever styling solution you choose.
Be sure to shadow `src/gatsby-theme-landing-page/styles/variables.module.css` with a blank CSS rule as well to disable the top-level styles of the landing pages created by the theme.

<!-- TODO add Emotion/etc. example -->
<!-- TODO consider simpler way to disable default styles -->
