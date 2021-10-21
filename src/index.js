import "./styles.css";

const deleteRow = (button, listId) => {
  document.getElementById(listId).removeChild(button.parentNode);
};

// 未完了リストから削除
const deleteRowFromIncompleteList = (button) => {
  deleteRow(button, "incomplete-list");
};

// 完了リストから削除
const deleteRowFromCompleteList = (button) => {
  deleteRow(button, "complete-list");
};

// 完了リストに追加
const addRowToCompleteList = (text) => {
  // div生成
  const div = document.createElement("div");
  div.className = "list-row";
  // li生成
  const li = document.createElement("li");
  li.innerText = text;

  div.appendChild(li);
  div.appendChild(
    createButton("戻す", (button) => {
      addRowToIncompleteList(
        button.parentNode.getElementsByTagName("li")[0].innerText
      );
      deleteRowFromCompleteList(button);
    })
  );
  document.getElementById("complete-list").appendChild(div);
};

// 未完了リストに追加
const addRowToIncompleteList = (text) => {
  // div生成
  const div = document.createElement("div");
  div.className = "list-row";

  // li生成
  const li = document.createElement("li");
  li.innerText = text;

  // divの子要素に各要素を設定
  div.appendChild(li);

  // 完了ボタン
  div.appendChild(
    createButton("完了", (button) => {
      addRowToCompleteList(
        button.parentNode.getElementsByTagName("li")[0].innerText
      );
      deleteRowFromIncompleteList(button);
    })
  );
  // 削除ボタン
  div.appendChild(
    createButton("削除", (button) => {
      deleteRowFromIncompleteList(button);
    })
  );
  document.getElementById("incomplete-list").appendChild(div);
};

const createButton = (title, onClick) => {
  const button = document.createElement("button");
  button.innerText = title;
  button.addEventListener("click", () => {
    onClick(button);
  });
  return button;
};

const onClickAdd = () => {
  // テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";
  addRowToIncompleteList(inputText);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
