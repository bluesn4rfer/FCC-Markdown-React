import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './style.css';

function App() {
	const [markdown, setMarkdown] = useState('# H1 Heading\r\n## H2 Sub Heading\r\n[LinkTitle](https://codepen.io)\r\nhere is `inline code`\r\n```javascript\r\nfunction codeBlock() {\r\n\r\n}\r\n```\r\n* Item 1\r\n* Item 2\r\n  * Item 2a\r\n  * Item 2b\r\n> Blockquote\r\n![Image text](https://blog.codepen.io/wp-content/uploads/2012/06/Button-Fill-Black-Large.png)\r\n**This is bold text**\r\n');

	const [offset, setOffset] = useState(400);
	const [minOffset, setMinOffset] = useState(100);
	const [maxOffset, setMaxOffset] = useState(1024);

	document.addEventListener("mouseup", function() {
		console.log('App.js document mouse up event invoked');
		document.removeEventListener("mousemove", resizePanel);
	});

	useEffect(() => {
                let preview = document.getElementById('preview');
                let preview_mobile = document.getElementById('preview_mobile');
                if(preview && preview_mobile){
                        if(markdown){
                                console.log('useEffect() parsing markdown');
                                console.log('useEffect() markdown: '+JSON.stringify(markdown));
                                marked.setOptions({
                                	breaks: true,
                                });
                                preview.innerHTML = marked.parse(markdown);
                                preview_mobile.innerHTML = marked.parse(markdown);
                        }
                        else{
                                preview.innerHTML = '';
                                preview_mobile.innerHTML = '';
                        }
                }
	});

	const resizeHandle = () => {
		console.log('App.js handle mousedown event invoked');
		document.addEventListener("mousemove", resizePanel);
	}

	const resizePanel = (event) => {
		console.log('App.js resizePanel invoked');

    		var new_offset = event.pageX;

    		new_offset = new_offset < minOffset ? minOffset : new_offset;
    		new_offset = new_offset > maxOffset ? maxOffset : new_offset;
		console.log("App.js resizePanel new_offset: " + new_offset);
		setOffset(new_offset);
	}

	const updatePreview = (event) => {
		setMarkdown(event.target.value);
	};

	const panelLeft = {
		width: offset
	}

	const panelRight = {
		marginLeft: offset
	}

  return (
    	<div className="w-100 h-100 p-0 m-0">
		<div id="code" style={panelLeft} className="d-none d-md-block float-md-start h-100 p-1 overflow-none bg-dark text-white"><textarea id="editor" className="bg-dark text-white w-100 h-100 border-0" value={markdown} onChange={updatePreview} /></div>
		<div id="code_mobile" style={panelLeft} className="d-block d-md-none w-100 h-100 p-1 overflow-none bg-dark text-white"><textarea id="editor" className="bg-dark text-white w-100 h-100 border-0" value={markdown} onChange={updatePreview} /></div>
		<div id="handle" className="float-md-start bg-secondary" onMouseDown={resizeHandle}></div>
		<div id="preview" style={panelRight} className="d-none d-md-block h-100 overflow-auto"></div>
		<div id="preview_mobile" className="d-block d-md-none w-100 overflow-auto"></div>
    	</div>
  );
}

export default App;
