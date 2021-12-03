import * as React from "react";
import { graphql } from "gatsby";
import * as Components from "../components";
import * as styles from "../components/base.module.css";
import Head from "../components/base/head";
import Layout from "../components/base/layout";
import DevDebug from "../components/base/dev-debug";

export default function LandingPage(props) {
  const { sections } = props.data.page;

  return (
    <Layout>
      <div className={styles.root}>
        <Head {...props.data.page} />
        {sections.map((section) => {
          const Component = Components[section.component] || DevDebug;
          return Component ? <Component key={section.id} {...section} /> : null;
        })}
      </div>
    </Layout>
  );
}

export const query = graphql`
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
`;
