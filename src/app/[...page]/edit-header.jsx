// this file is used to load the header section in builder 

import { BuilderComponent } from '@builder.io/react';

// import where your custom components are registered
import Header from '../../components/Header';

// This page is purely for using the Builder.io editor to edit symbols
export default function EditHeader() {
  return <BuilderComponent model="header" />
}