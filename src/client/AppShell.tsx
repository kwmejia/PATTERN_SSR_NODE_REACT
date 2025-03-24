import React from "react";

interface Props {
  pageId: string;
  props?: Record<string, any>;
}

export const AppShell: React.FC<Props> = ({ pageId, props }) => {
  return (
    <html lang="es">
      <head>
        <title>Librería</title>
      </head>
      <body>
        <div id="client-root" ></div>
        <div id="alert-root"></div>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__SSR_PAGE__ = "${pageId}";
                     window.__INITIAL_PROPS__ = ${JSON.stringify(
                       props || {}
                     )};`,
          }}
        />

        <script type="module" src="/static/bundle.js"></script>
       
      </body>
    </html>
  );
};  
