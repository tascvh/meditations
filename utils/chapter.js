
export const parseChapterString = (chapter_string) => {
  return { 
    book : chapter_string.split("-")[0] ,
    chapter : chapter_string.split("-")[1] ,
  }
} 

export const parseChapterListString = (chapter_list) => {
  return chapter_list.split(',').map(verse => {
    return parseChapterString(verse);
  })
} 

export const getChapterLink = (book, chapter) => { 
  return "/meditations-" + book + "-" + chapter
} 
