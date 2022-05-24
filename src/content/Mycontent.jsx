import React, { useEffect, useMemo, useRef, useState } from 'react';
import Chats from './Chats';

export default function Mycontent({ chatBox, origBox, myBox }) {
  const $area_header = useMemo(() => document.querySelector('.area_header'), []);
  const $target = useMemo(() => document.querySelector('.myBox'), []);
  const myHr = useRef();
  let resize = false;

  const $chatToggleButton = document.createElement('button');
  $chatToggleButton.innerHTML = '모아보기';
  $chatToggleButton.classList.add('chat-toggle-btn');
  $area_header.appendChild($chatToggleButton);

  useEffect(() => {
    myBox.style.height = '200px';
    origBox.style.top = '250px';
    myHr.current.style.top = '300px';
    $chatToggleButton.addEventListener('click', () => {
      if ($target.style.display === 'none') {
        $target.style.display = 'inline';
        origBox.style.top = parseInt(myBox.style.height) + 50 + 'px';
      } else {
        $target.style.display = 'none';
        origBox.style.top = 40 + 'px';
      }
    });
    myHr.current.addEventListener('mousedown', (e) => {
      resize = true;
    });
    chatBox.addEventListener('mouseup', (e) => {
      resize = false;
    });
    chatBox.addEventListener('mousemove', (e) => {
      if (!resize) return;
      const mouseY = e.clientY - 100;
      myHr.current.style.top = mouseY + 100 + 'px';
      myBox.style.height = mouseY + 'px';
      origBox.style.top = mouseY + 50 + 'px';
    });
  }, []);

  return (
    <>
      <Chats />
      <hr ref={myHr} className="sethr" />
    </>
  );
}