import { Headline, buttonClass } from "boxykit/react";
import { CSS_FILE_NAME, CSS_FILE_SIZE, CSS_FILE_URL } from "../config/css-file";
import { NPM_URL, REPO_URL } from "../config/site";
import { CopyCssButton } from "./copy-css-button";
import { ModeOnly } from "./mode-only";

/**
 * Getting started, laid out like an example: the name and what it is for on the left, against the line;
 * install and import in the panel. The code follows the React/CSS switch at the side.
 */
export function Intro() {
  return (
    <section id="start" className="docs-example docs-intro" aria-label="Getting started">
      <div className="docs-example-head">
        <p className="docs-about">Install it from npm:</p>
        <pre className="docs-code">npm install boxykit</pre>
        <ModeOnly mode="react">
          <p className="docs-about">Import the CSS once, at the root of the app, and use anything on this page:</p>
          <pre className="docs-code">{`import "boxykit/css";
import { Button } from "boxykit/react";

<Button>Save</Button>`}</pre>
        </ModeOnly>
        <ModeOnly mode="css">
          <p className="docs-about">Import the CSS once and write the classes of anything on this page:</p>
          <pre className="docs-code">{`import "boxykit/css";

<button class="boxy-button
  boxy-button-accent">Save</button>`}</pre>
        </ModeOnly>
        <p className="docs-about">No React? Pick CSS at the side.</p>
        <p className="docs-about">No npm either? Download the whole kit as one file and link it, or copy it into your own:</p>
        <div className="docs-actions">
          <a className={buttonClass({ look: "outline", size: "tiny" })} href={CSS_FILE_URL} download={CSS_FILE_NAME}>
            Download CSS · {CSS_FILE_SIZE}
          </a>
          <CopyCssButton url={CSS_FILE_URL} />
        </div>
        <pre className="docs-code">{`<link rel="stylesheet"
  href="${CSS_FILE_NAME}">`}</pre>
      </div>
      <div className="docs-preview">
        <Headline ghost="· personal UI lib">Boxykit</Headline>
        <p className="docs-lead">Desktop-first UI kit I use for my personal projects, so I don’t have to invent it every time.</p>
        <div className="docs-actions">
          <a className={buttonClass({ look: "dark", size: "tiny" })} href={REPO_URL}>
            GitHub
          </a>
          <a className={buttonClass({ look: "dark", size: "tiny" })} href={NPM_URL}>
            npm
          </a>
        </div>
      </div>
    </section>
  );
}
