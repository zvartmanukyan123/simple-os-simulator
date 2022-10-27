const files = [
    {name: 'file1', content: 'hello'},
    {name: 'file2', content: 'How are you?'},
    {name: 'file3', content: 'the weather is not good!'}
];

const processes = [
    {name: 'processA', pid: 0},
    {name: 'processB', pid: 1}
];

class SimpleOS {
    openedFiles = new Map();
    constructor(cursor = 0, pid, fd) {
        this.cursor = cursor; 
        this.pid = pid;
        this.fd = fd;
    }

  open(pid, fileName) {
    const foundFile = files.find(f => f.name === fileName);
    const fd = pid + fileName;
    const value = {...foundFile, cursor: 0};
    this.openedFiles.set(fd, value);
    return fd;
  };

  read(fd, count) {
    const currentFile = (this.openedFiles.get(fd));
    const updatedCursor = currentFile.cursor + count;
    const content = currentFile.content.slice(currentFile.cursor, updatedCursor);
    const value = {...currentFile, cursor: updatedCursor}
    this.openedFiles.set(fd, value);
    return content;
  }

  write(fd, content) {
    const currentFile = (this.openedFiles.get(fd));
    const value = {...currentFile, content, cursor: 0};
    this.openedFiles.set(fd, value);
  }

 seek(fd, position) {
    const currentFile = (this.openedFiles.get(fd));
    const value = {...currentFile, cursor: position}
    this.openedFiles.set(fd, value);
  }
  
  close(fd) {
    this.openedFiles.delete(fd);
  }

}
