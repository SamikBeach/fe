'use client';

import React from 'react';
import { mediaStyles } from './media';

function RootHead() {
  return (
    <head>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-S1HH7N1W2K"
      ></script>
      {/* <script >
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-S1HH7N1W2K');
      </script> */}
      <style
        key="fresnel-css"
        dangerouslySetInnerHTML={{ __html: mediaStyles }}
        type="text/css"
      />
    </head>
  );
}

export default RootHead;
