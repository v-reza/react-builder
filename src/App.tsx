import React from 'react';
import logo from './logo.svg';
import JSZip from 'jszip';
import { saveAs } from "file-saver"

function App() {
  const zip = new JSZip()

  const onDownload = () => {
    const folderOne = zip.folder("folderOne");
    const folderTwo = zip.folder("folderTwo");
    folderOne?.file("fileOne.js", `function helloWorld () {
      console.log("Hello World Folder One");
    }`);
    folderOne?.folder("folderOneOne")?.file("fileOneOne.txt", "Hello World Folder One One");
    folderTwo?.file("fileTwo.txt", "Hello World Folder Two");
    zip.generateAsync({type:"blob"})
    .then(function(content) {
        // see FileSaver.js
        saveAs(content, "example.zip");
    });
  }

  return (
   <div>
      <button onClick={onDownload}>Download</button>
   </div>
  );
}

export default App;
