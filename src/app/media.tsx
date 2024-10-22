'use client';

import { createMedia } from '@artsy/fresnel';
import { BREAKPOINTS } from '../constants';

const ExampleAppMedia = createMedia({
  breakpoints: BREAKPOINTS,
});

// Make styles for injection into the header of the page
export const mediaStyles = ExampleAppMedia.createMediaStyle();

export const { Media, MediaContextProvider } = ExampleAppMedia;
