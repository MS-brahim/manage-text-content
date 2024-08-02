import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; 

const QuillEditor = ({ onChange }) => {
  const quillRef = useRef(null);
  const editorRef = useRef(null); 

  useEffect(() => {
    if (editorRef.current) return; 

    const quill = new Quill(quillRef.current, {
      theme: 'snow',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],
          ['image'],
          [{ header: [1, 2, false] }],
          [{ color: [] }, { background: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
        ],
      },
    });

    editorRef.current = quill;

    quill.on('text-change', () => {
      const content = quill.root.innerHTML;
      onChange(content);
    });
  }, [onChange]);

  return <div ref={quillRef} style={{ minHeight: '300px' }} />;
};

export default QuillEditor;
