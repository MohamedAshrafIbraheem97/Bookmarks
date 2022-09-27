const bookmarkName = document.querySelector("#bookmark-name");
const bookmarkUrl = document.querySelector("#bookmark-url");
const submitBtn = document.querySelector('input[type="button"]');
const visitBtn = document.querySelector("#visitBtn");
const deleteBtn = document.getElementById("deleteBtn");

const myBookmarks = document.querySelector(".my-bookmarks");

let bookmarksList = [];

submitBtn.addEventListener("click", createBookmark);

function createBookmark() {
  if (validateBookmarkName() === true && validateBookmarkURL() === true) {
    let bookmark = {
      BName: bookmarkName.value,
      BUrl: bookmarkUrl.value,
    };

    bookmarksList.push(bookmark);

    localStorage.setItem("BookmarksList", JSON.stringify(bookmarksList));

    retreiveData();
  }
}

function retreiveData() {
  bookmarksList = JSON.parse(localStorage.getItem("BookmarksList"));
  tempBookmark = ``;

  if (bookmarksList.length === 0) {
    myBookmarks.innerHTML = "<p>No bookmarks yet!</p>";
  } else {
    for (let item = 0; item < bookmarksList.length; item++) {
      tempBookmark += `
      <div class="row bookmark-item">
        <p class="six columns created-bookmark-name">${bookmarksList[item].BName}</p>
          <div class="six columns">
            <div class="row">
              <a
                href="${bookmarksList[item].BUrl}"
                class="six columns button button-primary"
                id="visitBtn"
                target="_blank"
                >Visit</a
              >
              <button class="six columns danger" id="deleteBtn"
               onclick="deleteBookmark(${item})"
                >Delete</button
              >
          </div>
        </div>
    </div>
    
    `;
    }

    myBookmarks.innerHTML = tempBookmark;
  }
}

retreiveData();

function deleteBookmark(index) {
  bookmarksList.splice(index, 1);
  localStorage.setItem("BookmarksList", JSON.stringify(bookmarksList));
  retreiveData();
}

function validateBookmarkName() {
  let regex = /^[A-Z][A-Za-z]{3,}/;

  if (regex.test(bookmarkName.value) !== true) {
    bookmarkName.classList.add("error");
    bookmarkName.placeholder = "Required start with a capital letter.";
    return false;
  } else {
    bookmarkName.classList.remove("error");
    return true;
  }
}

function validateBookmarkURL() {
  let regex = /\w{1,}@[a-z]{1,3}.[a-z]{2,3}/;

  if (regex.test(bookmarkUrl.value) !== true) {
    bookmarkUrl.classList.add("error");
    bookmarkUrl.placeholder = "example@example.com";
    return false;
  } else {
    bookmarkUrl.classList.remove("error");
    return true;
  }
}
