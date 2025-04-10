
const all_tags = {};
const versions = {};

const get_data = ( name = "default" ) => {
  if (!versions[name]) {
    versions[name] = {data : [] }
  }
  return versions[name].data
}

const add_book = (book_num, text, tags, version_info = { name : "default" }) => {

  const data = get_data( version_info.name )

  if(!data[book_num-1]) {
    data[book_num-1] = {text : []};
  }
  if(text) {
    data[book_num-1].text = text;
  }

  if (tags) {
    data[book_num-1].tags = tags ;

    tags.forEach((tag_list, index) => {
      tag_list.forEach((tag) => {
        if(!all_tags[tag]) {
          all_tags[tag] = [];
        }
        all_tags[tag].push({book :book_num, chapter:index+1});
      })
    } )
  }
}

export const InitData = async () => {
  console.log("init data")
  {
    const modulesContext = import.meta.glob('./data/glong/*.js');
    for (const path in modulesContext) {
      modulesContext[path]().then((module) => {
        add_book(module.book, module.data, null);
      });
    }
  }
  // {
  //   const modulesContext = import.meta.glob('./data/glong_bak/*.js');
  //   for (const path in modulesContext) {
  //     modulesContext[path]().then((module) => {
  //       add_book(module.book, module.data, null, { name : "glong"  });
  //     });
  //   }
  // }
  // {
  //   const modulesContext = import.meta.glob('./data/tags/*.js');
  //   for (const path in modulesContext) {
  //     modulesContext[path]().then((module) => {
  //       add_book(module.book, null, module.tags);
  //     });
  //   }
  // }
}


// export const fbt = (tag_text) => {
//       return {data: all_tags[tag_text] };
// }
export const fetchByTag = async (tag_text) => {
  return new Promise((resolve) => {
    console.log(all_tags[tag_text]);
    resolve({
      // data: [{book:1,chapter:1},{book:1,chapter:2}],
      data: all_tags[tag_text],
    });
  });
}

export const fetchTags = () => {
  return new Promise((resolve) => {
    resolve({
      data: Object.keys(all_tags),
    });
  });
}
export const fetchMeta = () => {

  const data = get_data();

  console.log(data)
  return new Promise((resolve) => {
    // resolve({
    //   data: [ {len : 2}, {len : 3} ],
    // });
    // return

    const retval = {
      books : [],
    }

    data.forEach( (book) => {
      retval.books.push({len : book.text.length})
    })

    resolve({
      data: retval,
    });
  });
}

export const fetchChapterMeta = (book, chapter) => {

  const data = get_data();

  return new Promise((resolve) => {

    var prev = {
      book : book,
      chapter : chapter-1,
    }
    var next = {
      book : book,
      chapter : chapter+1,
    }

    if (next.chapter > data[book-1].text.length) {
      next.book = book+1;
      next.chapter = 1;
      if (next.book > data.length) {
        next = null;
      }
    }

    if (prev.chapter == 0) {
      prev.book = book-1;
      if(prev.book == 0) {
        prev = null;
      }
      else {
        prev.chapter = data[prev.book-1].text.length;
      }
    }

    resolve({
      data: { next : next, prev : prev},
    });
  });
};

export const fetchChapters = (list_of_bc) => {

  return new Promise((resolve) => {
    const retVal = [];
    list_of_bc.forEach(({book, chapter}) => {
      console.log(book);
      console.log(chapter);

     const text_ver = [];

      Object.keys(versions).forEach( ver  => {
        // console.log("ver", ver)
        const data = versions[ver].data;

        if (book > data.length) { return; }
        if (chapter > data[book-1].length) { return; }

        text_ver.push({ text : data[book-1].text[chapter-1] })
      })
      // console.log(text_ver)
      retVal.push({ 
        book: book, 
        chapter: chapter, 
        versions : text_ver,
        tags: [],
      })
    });

    console.log(retVal);

    resolve({data : retVal})
  })
};
