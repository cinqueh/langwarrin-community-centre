// this file is used to load the footer section in builder 

import { BuilderComponent } from '@builder.io/react';

// import where your custom components are registered
import Footer from '../../components/Header';

// This page is purely for using the Builder.io editor to edit symbols
export default function EditFooter() {
  return <BuilderComponent model="footer" />
}