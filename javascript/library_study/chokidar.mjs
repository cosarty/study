import chokidar from 'chokidar'



const watcher = chokidar.watch('file, dir, glob, or array', {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

watcher
  .on('add', path => console.log(`File ${path} has been added`))
  .on('change', path => console.log(`File ${path} has been changed`))
  .on('unlink', path => console.log(`File ${path} has been removed`))
  .on('addDir', path => console.log(`Directory ${path} has been added`))
  .on('unlinkDir', path => console.log(`Directory ${path} has been removed`))
  .on('error', error => console.log(`Watcher error: ${error}`))
  .on('ready', () => console.log('Initial scan complete. Ready for changes'))
  .on('all', (event, path) => console.log(event,path))
  .on('raw', (event, path, details) => {
    console.log('Raw event info:', event, path, details);
  });

