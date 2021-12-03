import * as React from "react";
import { Link as GatsbyLink } from "gatsby";
import isAbsoluteURL from "is-absolute-url";
import * as styles from "./link.module.css";

export function LinkContainer({ children, className, ...rest }) {
  return children ? (
    <div className={`${styles.linkContainer} ${className}`} {...rest}>
      {children}
    </div>
  ) : null;
}

export default function Link({ href, text, children }) {
  if (isAbsoluteURL(href)) {
    return (
      <a className={styles.link} href={href}>
        {text || children}
      </a>
    );
  }

  return (
    <GatsbyLink className={styles.link} to={href}>
      {text || children}
    </GatsbyLink>
  );
}
