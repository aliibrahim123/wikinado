import make from './n_modules/@simplyjs/lib/cli/base.js';
import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import './n_modules/marked.js';

var struct = {};

var walk = async (path, obj) => {
	await Promise.all((await readdir('wikisrc/' + path, { withFileTypes: true })).map(async file => {
		if (file.isDirectory()) return walk(path + '/' + file.name, obj[file.name] = {});
		else await handleFile(path + '/' + file.name);
		obj[file.name.slice(0, -3)] = true;
	}))
}

var handleFile = async (path) => {
	console.log('started: ' + path);
	var content = await readFile('wikisrc/' + path, 'utf-8');
	await mkdir('wiki/' + path.split('/').slice(0, -1).join('/'), { recursive: true });
	var formated = marked.parse(content);
	var title = path.split('/').at(-1).slice(0, -3);
	var back = '../'.repeat(path.split('/').length -1);
	await writeFile('wiki/' + path.slice(0, -3) + '.html', `<!DOCTYPE html>
<title>wikinado: ${title}</title>
<script type=importmap>{"imports":{"simply/":"${back}n_modules/@simplyjs/lib/dist/"}}</script>

<script id=lib-dom-base type=module src='${back}n_modules/@simplyjs/lib/dist/dom/base.g.js'></script>
<script id=lib-dom-router type=module src='${back}n_modules/@simplyjs/lib/dist/dom/router.g.js'></script>

<script id=base type=module src='${back}base.js'></script>
<link preserve-on-route id=md-style rel=stylesheet href='${back}md-style.css'>
<div style = 'margin: 5px;background: rgba(0,0,0,0.03);padding: 10px;border: lightgray 2px solid;border-radius: 10px;box-shadow: #494949 0 0 17px 5px;' class=markdown-body>
<h1 style='text-align: center'>${title}</h1>
${formated}
`);
	console.log('finished: ' + path)
}

var cli = make('cli', '0.0.1');
cli.command('add')
	.argument('<path>', 'path name')
	.handle(async ({path}) => {
		var content = await readFile('inp.txt', 'utf-8');
		await mkdir('wikisrc/' + path.split('/').slice(0, -1).join('/'), { recursive: true })
		writeFile('wikisrc/' + path + '.md', content)
	});

cli.command('build')
	.option(['-l', '--log'], '', 'enable log')
	.handle(async () => {
		await walk('', struct);
		writeFile('struct.js', '//wiki structure\n\nglobalThis.wikiStruct = ' + JSON.stringify(struct))
	})

cli.parse();