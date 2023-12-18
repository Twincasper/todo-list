import { defineConfig } from 'vite'

export default defineConfig({
  // GitHub Pages expects an index.html in the root directory
  // so just run npm build before pushing to GitHub and this will rebuild our assets to the root
  build: { outDir: '..' },
  // needed for github pages just put the repo name here
  // For example, my repo is located at https://github.com/benspector-mls/f23-2-3-0-todo-app-example
  // so I put:
  // base: '/f23-2-3-0-todo-app-example/'
  base: 'todo-list', 
});